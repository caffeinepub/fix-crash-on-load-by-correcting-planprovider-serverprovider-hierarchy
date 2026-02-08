import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export interface Contributor {
    contributions: string;
    name: string;
    role: string;
}
export type Time = bigint;
export interface Project {
    id: string;
    categories: Array<string>;
    logo?: ExternalBlob;
    name: string;
    createdAt: Time;
    tags: Array<string>;
    lastUpdated: Time;
    description: string;
    repoUrl: string;
    contributors: Array<Contributor>;
    downloads: bigint;
}
export interface UserProfile {
    name: string;
    email: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createProject(project: Project): Promise<void>;
    getAllProjects(): Promise<Array<Project>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getProject(id: string): Promise<Project>;
    getProjectsSnapshot(): Promise<{
        evolution: {
            added: Array<Project>;
            removed: Array<string>;
        };
    }>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    incrementAccessCount(projectId: string): Promise<void>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    searchProjectsByCategory(category: string): Promise<Array<Project>>;
    searchProjectsByTag(tag: string): Promise<Array<Project>>;
    updateRepoForks(projectId: string, forks: bigint): Promise<void>;
    updateRepoStars(projectId: string, stars: bigint): Promise<void>;
}
