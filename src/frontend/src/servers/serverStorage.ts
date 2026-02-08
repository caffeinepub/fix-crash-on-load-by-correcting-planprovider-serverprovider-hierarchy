import { MinecraftServer } from './serverTypes';

const SERVERS_STORAGE_KEY = 'auracloud_servers';

export function getServersForUser(email: string): MinecraftServer[] {
  try {
    const data = localStorage.getItem(SERVERS_STORAGE_KEY);
    const allServers: MinecraftServer[] = data ? JSON.parse(data) : [];
    
    // Normalize servers to ensure backwards compatibility
    return allServers
      .filter(s => 
        s.owner === email || s.sharedAccess.some(a => a.email === email)
      )
      .map(s => ({
        ...s,
        ownedPaidPlugins: s.ownedPaidPlugins || []
      }));
  } catch {
    return [];
  }
}

export function saveServer(server: MinecraftServer): void {
  try {
    const data = localStorage.getItem(SERVERS_STORAGE_KEY);
    const allServers: MinecraftServer[] = data ? JSON.parse(data) : [];
    const index = allServers.findIndex(s => s.id === server.id);
    
    if (index >= 0) {
      allServers[index] = server;
    } else {
      allServers.push(server);
    }
    
    localStorage.setItem(SERVERS_STORAGE_KEY, JSON.stringify(allServers));
  } catch (error) {
    console.error('Failed to save server:', error);
  }
}

export function deleteServer(serverId: string): void {
  try {
    const data = localStorage.getItem(SERVERS_STORAGE_KEY);
    const allServers: MinecraftServer[] = data ? JSON.parse(data) : [];
    const filtered = allServers.filter(s => s.id !== serverId);
    localStorage.setItem(SERVERS_STORAGE_KEY, JSON.stringify(filtered));
  } catch (error) {
    console.error('Failed to delete server:', error);
  }
}
