export interface PaidPlugin {
  id: string;
  name: string;
  version: string;
  author: string;
  description: string;
  category: string;
  price: number;
}

export const PAID_PLUGIN_CATALOG: PaidPlugin[] = [
  { id: 'premium-ranks', name: 'Premium Ranks', version: '3.5.0', author: 'RankMaster', description: 'Advanced rank system with custom permissions and prefixes', category: 'Admin Tools', price: 15.99 },
  { id: 'ultra-crates', name: 'Ultra Crates', version: '2.8.1', author: 'CrateKing', description: 'Professional crate system with animations and rewards', category: 'Rewards', price: 19.99 },
  { id: 'advanced-shops', name: 'Advanced Shops', version: '4.2.0', author: 'ShopPro', description: 'Complete shop solution with GUI and economy integration', category: 'Economy', price: 24.99 },
  { id: 'custom-enchants-pro', name: 'Custom Enchants Pro', version: '5.1.2', author: 'EnchantMaster', description: 'Over 100 custom enchantments with unique effects', category: 'Gameplay', price: 29.99 },
  { id: 'boss-battles', name: 'Epic Boss Battles', version: '3.0.5', author: 'BossCreator', description: 'Create custom boss fights with rewards and mechanics', category: 'Mobs', price: 34.99 },
  { id: 'auction-plus', name: 'Auction Plus', version: '2.4.3', author: 'AuctionPro', description: 'Advanced auction house with bidding and buyout', category: 'Economy', price: 17.99 },
  { id: 'particle-effects', name: 'Particle Effects Pro', version: '4.6.0', author: 'EffectStudio', description: 'Stunning particle effects and trails for players', category: 'Display', price: 12.99 },
  { id: 'custom-mobs', name: 'Custom Mobs Creator', version: '3.8.2', author: 'MobDesigner', description: 'Design and spawn custom mobs with unique abilities', category: 'Mobs', price: 27.99 },
  { id: 'quest-system', name: 'Quest System Pro', version: '5.2.1', author: 'QuestMaker', description: 'Complete quest and mission system with rewards', category: 'RPG', price: 32.99 },
  { id: 'anti-cheat-pro', name: 'Anti-Cheat Pro', version: '6.1.0', author: 'SecurityTeam', description: 'Advanced anti-cheat with machine learning detection', category: 'Security', price: 39.99 },
  { id: 'custom-items', name: 'Custom Items Studio', version: '4.3.5', author: 'ItemCrafter', description: 'Create custom items with special abilities and textures', category: 'Gameplay', price: 22.99 },
  { id: 'minigames-suite', name: 'Minigames Suite', version: '3.7.0', author: 'GameMaster', description: 'Collection of popular minigames ready to play', category: 'Gameplay', price: 44.99 },
  { id: 'advanced-warps', name: 'Advanced Warps', version: '2.9.3', author: 'WarpPro', description: 'Teleportation system with GUI and permissions', category: 'Admin Tools', price: 14.99 },
  { id: 'clan-system', name: 'Clan System Pro', version: '4.5.2', author: 'ClanBuilder', description: 'Complete clan system with wars and territories', category: 'Social', price: 28.99 },
  { id: 'custom-recipes', name: 'Custom Recipes Plus', version: '3.2.8', author: 'RecipeMaker', description: 'Add custom crafting recipes with GUI editor', category: 'Gameplay', price: 16.99 },
  { id: 'vote-rewards', name: 'Vote Rewards Pro', version: '5.0.4', author: 'VoteSystem', description: 'Reward players for voting with custom rewards', category: 'Rewards', price: 18.99 },
  { id: 'hologram-pro', name: 'Hologram Pro', version: '4.8.1', author: 'HoloCreator', description: 'Advanced hologram system with animations', category: 'Display', price: 21.99 },
  { id: 'pets-system', name: 'Pets System Pro', version: '3.6.7', author: 'PetMaster', description: 'Customizable pet system with abilities and leveling', category: 'Gameplay', price: 25.99 },
  { id: 'dungeons-creator', name: 'Dungeons Creator', version: '2.5.9', author: 'DungeonMaster', description: 'Create custom dungeons with loot and bosses', category: 'RPG', price: 36.99 },
  { id: 'economy-plus', name: 'Economy Plus', version: '5.3.2', author: 'EconPro', description: 'Advanced economy system with banks and loans', category: 'Economy', price: 23.99 },
  { id: 'custom-gui', name: 'Custom GUI Builder', version: '4.1.6', author: 'GUIDesigner', description: 'Create custom GUIs without coding', category: 'Admin Tools', price: 19.99 },
  { id: 'skills-system', name: 'Skills System Pro', version: '3.9.4', author: 'SkillMaster', description: 'RPG skills system with progression and abilities', category: 'RPG', price: 31.99 },
  { id: 'chat-pro', name: 'Chat Pro', version: '6.2.3', author: 'ChatMaster', description: 'Advanced chat system with channels and formatting', category: 'Chat', price: 15.99 },
  { id: 'land-claims', name: 'Land Claims Pro', version: '4.7.1', author: 'ClaimMaster', description: 'Advanced land claiming with protection', category: 'Protection', price: 26.99 },
  { id: 'cosmetics-pro', name: 'Cosmetics Pro', version: '3.4.8', author: 'CosmeticStudio', description: 'Player cosmetics with hats, wings, and effects', category: 'Display', price: 20.99 },
  { id: 'lottery-system', name: 'Lottery System', version: '2.8.5', author: 'LotteryPro', description: 'Automated lottery system with jackpots', category: 'Economy', price: 17.99 },
  { id: 'achievements-pro', name: 'Achievements Pro', version: '5.1.7', author: 'AchieveMaster', description: 'Custom achievements with rewards and tracking', category: 'Rewards', price: 22.99 },
  { id: 'teleport-pro', name: 'Teleport Pro', version: '4.6.2', author: 'TeleportMaster', description: 'Advanced teleportation with cooldowns and costs', category: 'Admin Tools', price: 16.99 },
  { id: 'custom-armor', name: 'Custom Armor Studio', version: '3.3.9', author: 'ArmorCrafter', description: 'Create custom armor with special abilities', category: 'Gameplay', price: 24.99 },
  { id: 'events-manager', name: 'Events Manager Pro', version: '4.9.1', author: 'EventMaster', description: 'Schedule and manage server events automatically', category: 'Admin Tools', price: 28.99 },
  { id: 'custom-weapons', name: 'Custom Weapons Pro', version: '5.2.6', author: 'WeaponSmith', description: 'Create custom weapons with unique abilities', category: 'Gameplay', price: 27.99 },
  { id: 'leaderboards-pro', name: 'Leaderboards Pro', version: '3.7.4', author: 'LeaderMaster', description: 'Dynamic leaderboards with holograms', category: 'Display', price: 18.99 },
  { id: 'custom-biomes', name: 'Custom Biomes', version: '2.6.8', author: 'BiomeCreator', description: 'Add custom biomes with unique generation', category: 'World Management', price: 33.99 },
  { id: 'player-stats', name: 'Player Stats Pro', version: '4.4.3', author: 'StatTracker', description: 'Track and display player statistics', category: 'Display', price: 19.99 },
  { id: 'custom-portals', name: 'Custom Portals', version: '3.8.7', author: 'PortalMaker', description: 'Create custom portals between worlds', category: 'World Management', price: 21.99 },
  { id: 'bounty-system', name: 'Bounty System Pro', version: '2.9.2', author: 'BountyHunter', description: 'Player bounty system with rewards', category: 'PvP', price: 23.99 },
  { id: 'custom-spawners', name: 'Custom Spawners', version: '4.2.5', author: 'SpawnerPro', description: 'Customizable mob spawners with upgrades', category: 'Mobs', price: 25.99 },
  { id: 'team-system', name: 'Team System Pro', version: '3.5.1', author: 'TeamBuilder', description: 'Advanced team system with chat and permissions', category: 'Social', price: 20.99 },
  { id: 'custom-drops', name: 'Custom Drops Pro', version: '5.0.9', author: 'DropMaster', description: 'Customize mob and block drops with conditions', category: 'Gameplay', price: 22.99 },
  { id: 'server-menu', name: 'Server Menu Pro', version: '4.7.6', author: 'MenuDesigner', description: 'Custom server menu with navigation', category: 'Admin Tools', price: 17.99 }
];

export function searchPaidPlugins(query: string, category?: string): PaidPlugin[] {
  let results = PAID_PLUGIN_CATALOG;
  
  if (category && category !== 'All') {
    results = results.filter(p => p.category === category);
  }
  
  if (query) {
    const lowerQuery = query.toLowerCase();
    results = results.filter(p =>
      p.name.toLowerCase().includes(lowerQuery) ||
      p.description.toLowerCase().includes(lowerQuery) ||
      p.author.toLowerCase().includes(lowerQuery)
    );
  }
  
  return results;
}

export function getPaidPluginCategories(): string[] {
  const categories = new Set(PAID_PLUGIN_CATALOG.map(p => p.category));
  return ['All', ...Array.from(categories).sort()];
}
