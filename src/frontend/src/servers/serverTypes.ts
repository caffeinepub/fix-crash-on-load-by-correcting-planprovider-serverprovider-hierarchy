export type ServerStatus = 'Offline' | 'Starting' | 'Online' | 'Stopping';

export interface MinecraftServer {
  id: string;
  name: string;
  domain: string;
  domainSuffix: string;
  owner: string;
  status: ServerStatus;
  createdAt: number;
  ram: number;
  cpu: number;
  storage: number;
  planId: string;
  uptime: number;
  lastStarted?: number;
  logo?: string;
  title?: string;
  subtitle?: string;
  installedPlugins: string[];
  ownedPaidPlugins: string[];
  fileTree: FileNode;
  consoleLog: ConsoleEntry[];
  onlinePlayers: Player[];
  sharedAccess: SharedAccess[];
}

export interface FileNode {
  name: string;
  type: 'file' | 'folder';
  path: string;
  children?: FileNode[];
  size?: number;
  updatedAt: number;
}

export interface ConsoleEntry {
  timestamp: number;
  message: string;
  type: 'info' | 'warning' | 'error' | 'player';
}

export interface Player {
  name: string;
  joinedAt: number;
  ping: number;
}

export interface SharedAccess {
  email: string;
  permission: 'full' | 'start-only';
  grantedAt: number;
}
