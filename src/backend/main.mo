import Map "mo:core/Map";
import List "mo:core/List";
import Array "mo:core/Array";
import Text "mo:core/Text";
import Time "mo:core/Time";
import Nat "mo:core/Nat";
import Iter "mo:core/Iter";
import Order "mo:core/Order";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";
import Storage "blob-storage/Storage";
import MixinStorage "blob-storage/Mixin";

actor {
  type Project = {
    id : Text;
    name : Text;
    description : Text;
    repoUrl : Text;
    categories : [Text];
    logo : ?Storage.ExternalBlob;
    createdAt : Time.Time;
    lastUpdated : Time.Time;
    contributors : [Contributor];
    tags : [Text];
    downloads : Nat;
  };

  type Contributor = {
    name : Text;
    role : Text;
    contributions : Text;
  };

  public type UserProfile = {
    name : Text;
    email : Text;
  };

  module Projects {
    public func compare(project1 : Project, project2 : Project) : Order.Order {
      Text.compare(project1.name, project2.name);
    };
  };

  // Persistent storage
  let projects = Map.empty<Text, Project>();
  let accessCount = Map.empty<Text, Nat>();
  let repoStars = Map.empty<Text, Nat>();
  let repoForks = Map.empty<Text, Nat>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  // Initialize access control
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  include MixinStorage();

  // User profile management
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Project management
  public shared ({ caller }) func createProject(project : Project) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can create projects");
    };
    projects.add(project.id, project);
    accessCount.add(project.id, 0);
    repoStars.add(project.id, 0);
    repoForks.add(project.id, 0);
  };

  public query ({ caller }) func getProject(id : Text) : async Project {
    // Public read access - no authorization check needed
    switch (projects.get(id)) {
      case (null) { Runtime.trap("404: Project not found") };
      case (?project) { project };
    };
  };

  public query ({ caller }) func getAllProjects() : async [Project] {
    // Public read access - no authorization check needed
    projects.values().toArray().sort();
  };

  public query ({ caller }) func searchProjectsByCategory(category : Text) : async [Project] {
    // Public read access - no authorization check needed
    let filtered = List.empty<Project>();
    projects.values().forEach(
      func(project) {
        for (cat in project.categories.values()) {
          if (Text.equal(category, cat)) {
            filtered.add(project);
            return;
          };
        };
      }
    );
    filtered.toArray().sort();
  };

  public query ({ caller }) func searchProjectsByTag(tag : Text) : async [Project] {
    // Public read access - no authorization check needed
    let filtered = List.empty<Project>();
    projects.values().forEach(
      func(project) {
        for (t in project.tags.values()) {
          if (Text.equal(tag, t)) {
            filtered.add(project);
            return;
          };
        };
      }
    );
    filtered.toArray().sort();
  };

  public shared ({ caller }) func incrementAccessCount(projectId : Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can increment access count");
    };
    switch (accessCount.get(projectId)) {
      case (null) { accessCount.add(projectId, 1) };
      case (?count) {
        accessCount.add(projectId, count + 1);
      };
    };
  };

  public shared ({ caller }) func updateRepoStars(projectId : Text, stars : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update repository metrics");
    };
    repoStars.add(projectId, stars);
  };

  public shared ({ caller }) func updateRepoForks(projectId : Text, forks : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update repository metrics");
    };
    repoForks.add(projectId, forks);
  };

  public query ({ caller }) func getProjectsSnapshot() : async {
    evolution : {
      added : [Project];
      removed : [Text];
    };
  } {
    // Public read access - no authorization check needed
    {
      evolution = {
        added = projects.values().toArray().sort();
        removed = [];
      };
    };
  };
};
