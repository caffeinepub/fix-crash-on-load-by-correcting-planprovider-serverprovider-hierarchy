export interface Plugin {
  id: string;
  name: string;
  version: string;
  author: string;
  description: string;
  category: string;
  downloads: number;
}

export const PLUGIN_CATALOG: Plugin[] = [
  { id: 'essentialsx', name: 'EssentialsX', version: '2.20.1', author: 'EssentialsX Team', description: 'Essential commands and features for your server', category: 'Admin Tools', downloads: 15000000 },
  { id: 'worldedit', name: 'WorldEdit', version: '7.2.15', author: 'sk89q', description: 'In-game world editor with powerful tools', category: 'Building', downloads: 12000000 },
  { id: 'vault', name: 'Vault', version: '1.7.3', author: 'MilkBowl', description: 'Economy and permissions API', category: 'Economy', downloads: 10000000 },
  { id: 'luckperms', name: 'LuckPerms', version: '5.4.102', author: 'Luck', description: 'Advanced permissions plugin', category: 'Admin Tools', downloads: 9000000 },
  { id: 'worldguard', name: 'WorldGuard', version: '7.0.9', author: 'sk89q', description: 'Protect regions and configure game rules', category: 'Protection', downloads: 8500000 },
  { id: 'multiverse', name: 'Multiverse-Core', version: '4.3.1', author: 'Multiverse Team', description: 'Manage multiple worlds', category: 'World Management', downloads: 7000000 },
  { id: 'coreprotect', name: 'CoreProtect', version: '21.3', author: 'Intelli', description: 'Fast block logging and rollback', category: 'Protection', downloads: 6500000 },
  { id: 'citizens', name: 'Citizens', version: '2.0.32', author: 'fullwall', description: 'Create NPCs with custom behaviors', category: 'NPCs', downloads: 6000000 },
  { id: 'mcmmo', name: 'mcMMO', version: '2.1.220', author: 'nossr50', description: 'RPG skills and leveling system', category: 'RPG', downloads: 5500000 },
  { id: 'clearlag', name: 'ClearLag', version: '3.2.2', author: 'bob7l', description: 'Reduce lag by clearing entities', category: 'Performance', downloads: 5000000 },
  { id: 'holographicdisplays', name: 'HolographicDisplays', version: '3.0.0', author: 'filoghost', description: 'Create floating holograms', category: 'Display', downloads: 4800000 },
  { id: 'shopkeepers', name: 'Shopkeepers', version: '2.17.0', author: 'blablubbabc', description: 'Create custom villager shops', category: 'Economy', downloads: 4500000 },
  { id: 'dynmap', name: 'Dynmap', version: '3.6', author: 'mikeprimm', description: 'Real-time web map of your server', category: 'Map', downloads: 4200000 },
  { id: 'griefprevention', name: 'GriefPrevention', version: '16.18', author: 'RoboMWM', description: 'Prevent griefing with land claims', category: 'Protection', downloads: 4000000 },
  { id: 'jobs', name: 'Jobs Reborn', version: '5.2.2.2', author: 'Zrips', description: 'Jobs and economy system', category: 'Economy', downloads: 3800000 },
  { id: 'chestshop', name: 'ChestShop', version: '3.12.2', author: 'Acrobot', description: 'Create chest-based shops', category: 'Economy', downloads: 3600000 },
  { id: 'plotsquared', name: 'PlotSquared', version: '6.11.1', author: 'IntellectualSites', description: 'Advanced plot management', category: 'World Management', downloads: 3400000 },
  { id: 'authme', name: 'AuthMe', version: '5.6.0', author: 'AuthMe Team', description: 'Authentication and registration', category: 'Security', downloads: 3200000 },
  { id: 'quickshop', name: 'QuickShop', version: '5.1.2.0', author: 'Ghost_chu', description: 'Easy chest shop creation', category: 'Economy', downloads: 3000000 },
  { id: 'discordsrv', name: 'DiscordSRV', version: '1.27.0', author: 'Scarsz', description: 'Link Minecraft with Discord', category: 'Chat', downloads: 2800000 },
  { id: 'mythicmobs', name: 'MythicMobs', version: '5.3.5', author: 'Xikage', description: 'Create custom mobs and bosses', category: 'Mobs', downloads: 2600000 },
  { id: 'slimefun', name: 'Slimefun', version: '4.9', author: 'TheBusyBiscuit', description: 'Tech and magic items', category: 'Gameplay', downloads: 2400000 },
  { id: 'customenchants', name: 'Advanced Enchantments', version: '8.7.3', author: 'N1cknamed', description: 'Custom enchantments', category: 'Gameplay', downloads: 2200000 },
  { id: 'auctionhouse', name: 'AuctionHouse', version: '3.5.3', author: 'Kiran Hart', description: 'Server-wide auction system', category: 'Economy', downloads: 2000000 },
  { id: 'cratesplus', name: 'CratesPlus', version: '4.5.0', author: 'Hazebyte', description: 'Customizable crate system', category: 'Rewards', downloads: 1800000 }
];

export function searchPlugins(query: string, category?: string): Plugin[] {
  let results = PLUGIN_CATALOG;
  
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

export function getPluginCategories(): string[] {
  const categories = new Set(PLUGIN_CATALOG.map(p => p.category));
  return ['All', ...Array.from(categories).sort()];
}
