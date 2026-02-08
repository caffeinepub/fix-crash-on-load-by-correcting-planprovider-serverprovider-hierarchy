import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { MinecraftServer, ServerStatus, ConsoleEntry, Player } from './serverTypes';
import { getServersForUser, saveServer } from './serverStorage';
import { useAuth } from '../auth/AuthContext';
import { usePlan } from '../plans/PlanContext';
import { generateConsoleLine, generatePlayerActivity } from '../sim/runtimeSimulator';
import { getDefaultFileTree } from '../files/fileSeed';

interface ServerContextValue {
  servers: MinecraftServer[];
  currentServer: MinecraftServer | null;
  selectServer: (serverId: string) => void;
  createServer: (name: string, domainSuffix: string) => void;
  startServer: (serverId: string) => void;
  stopServer: (serverId: string) => void;
  updateServer: (serverId: string, updates: Partial<MinecraftServer>) => void;
  canPerformAction: (serverId: string, action: 'start' | 'stop' | 'settings' | 'files' | 'plugins' | 'sharing') => boolean;
}

const ServerContext = createContext<ServerContextValue | undefined>(undefined);

export function ServerProvider({ children }: { children: ReactNode }) {
  const { session } = useAuth();
  const { currentPlan } = usePlan();
  const [servers, setServers] = useState<MinecraftServer[]>([]);
  const [currentServer, setCurrentServer] = useState<MinecraftServer | null>(null);
  
  useEffect(() => {
    if (session) {
      const userServers = getServersForUser(session.email);
      setServers(userServers);
    } else {
      setServers([]);
      setCurrentServer(null);
    }
  }, [session]);
  
  useEffect(() => {
    const intervals: NodeJS.Timeout[] = [];
    
    servers.forEach(server => {
      if (server.status === 'Online') {
        const interval = setInterval(() => {
          const updatedServer = { ...server };
          
          if (updatedServer.lastStarted) {
            updatedServer.uptime = Math.floor((Date.now() - updatedServer.lastStarted) / 1000);
          }
          
          const newLog = generateConsoleLine(updatedServer);
          if (newLog) {
            updatedServer.consoleLog = [...updatedServer.consoleLog.slice(-200), newLog];
          }
          
          const playerUpdate = generatePlayerActivity(updatedServer);
          if (playerUpdate) {
            updatedServer.onlinePlayers = playerUpdate.players;
            if (playerUpdate.logEntry) {
              updatedServer.consoleLog = [...updatedServer.consoleLog.slice(-200), playerUpdate.logEntry];
            }
          }
          
          if (currentPlan.id === 'free' && updatedServer.onlinePlayers.length === 0) {
            const inactiveTime = Date.now() - (updatedServer.lastStarted || Date.now());
            if (inactiveTime > 30 * 60 * 1000) {
              updatedServer.status = 'Offline';
              updatedServer.uptime = 0;
              updatedServer.consoleLog = [...updatedServer.consoleLog, {
                timestamp: Date.now(),
                message: '[Auracloud] Server stopped due to inactivity (Free plan)',
                type: 'warning'
              }];
            }
          }
          
          saveServer(updatedServer);
          setServers(prev => prev.map(s => s.id === updatedServer.id ? updatedServer : s));
          if (currentServer?.id === updatedServer.id) {
            setCurrentServer(updatedServer);
          }
        }, 2000);
        
        intervals.push(interval);
      }
    });
    
    return () => {
      intervals.forEach(clearInterval);
    };
  }, [servers, currentServer, currentPlan]);
  
  const selectServer = useCallback((serverId: string) => {
    const server = servers.find(s => s.id === serverId);
    setCurrentServer(server || null);
  }, [servers]);
  
  const createServer = useCallback((name: string, domainSuffix: string) => {
    if (!session) return;
    
    const newServer: MinecraftServer = {
      id: `srv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name,
      domain: name.toLowerCase().replace(/[^a-z0-9]/g, ''),
      domainSuffix,
      owner: session.email,
      status: 'Offline',
      createdAt: Date.now(),
      ram: currentPlan.id === 'free' ? 8 : currentPlan.ram,
      cpu: currentPlan.cpu,
      storage: currentPlan.storage,
      planId: currentPlan.id,
      uptime: 0,
      installedPlugins: [],
      ownedPaidPlugins: [],
      fileTree: getDefaultFileTree(),
      consoleLog: [],
      onlinePlayers: [],
      sharedAccess: []
    };
    
    saveServer(newServer);
    setServers(prev => [...prev, newServer]);
  }, [session, currentPlan]);
  
  const startServer = useCallback((serverId: string) => {
    const server = servers.find(s => s.id === serverId);
    if (!server || server.status !== 'Offline') return;
    
    const updatedServer = { ...server, status: 'Starting' as ServerStatus };
    saveServer(updatedServer);
    setServers(prev => prev.map(s => s.id === serverId ? updatedServer : s));
    
    setTimeout(() => {
      const onlineServer = {
        ...updatedServer,
        status: 'Online' as ServerStatus,
        lastStarted: Date.now(),
        uptime: 0,
        consoleLog: [
          ...updatedServer.consoleLog,
          { timestamp: Date.now(), message: '[Auracloud] Starting server...', type: 'info' as const },
          { timestamp: Date.now() + 500, message: '[Server] Loading properties', type: 'info' as const },
          { timestamp: Date.now() + 1000, message: '[Server] Preparing spawn area', type: 'info' as const },
          { timestamp: Date.now() + 1500, message: '[Server] Done! Server is now online', type: 'info' as const }
        ]
      };
      saveServer(onlineServer);
      setServers(prev => prev.map(s => s.id === serverId ? onlineServer : s));
      if (currentServer?.id === serverId) {
        setCurrentServer(onlineServer);
      }
    }, 3000);
  }, [servers, currentServer]);
  
  const stopServer = useCallback((serverId: string) => {
    const server = servers.find(s => s.id === serverId);
    if (!server || server.status !== 'Online') return;
    
    const updatedServer = {
      ...server,
      status: 'Stopping' as ServerStatus,
      consoleLog: [
        ...server.consoleLog,
        { timestamp: Date.now(), message: '[Auracloud] Stopping server...', type: 'warning' as const }
      ]
    };
    saveServer(updatedServer);
    setServers(prev => prev.map(s => s.id === serverId ? updatedServer : s));
    
    setTimeout(() => {
      const offlineServer = {
        ...updatedServer,
        status: 'Offline' as ServerStatus,
        uptime: 0,
        onlinePlayers: [],
        consoleLog: [
          ...updatedServer.consoleLog,
          { timestamp: Date.now(), message: '[Server] Server stopped', type: 'info' as const }
        ]
      };
      saveServer(offlineServer);
      setServers(prev => prev.map(s => s.id === serverId ? offlineServer : s));
      if (currentServer?.id === serverId) {
        setCurrentServer(offlineServer);
      }
    }, 2000);
  }, [servers, currentServer]);
  
  const updateServer = useCallback((serverId: string, updates: Partial<MinecraftServer>) => {
    const server = servers.find(s => s.id === serverId);
    if (!server) return;
    
    const updatedServer = { ...server, ...updates };
    saveServer(updatedServer);
    setServers(prev => prev.map(s => s.id === serverId ? updatedServer : s));
    if (currentServer?.id === serverId) {
      setCurrentServer(updatedServer);
    }
  }, [servers, currentServer]);
  
  const canPerformAction = useCallback((serverId: string, action: string) => {
    if (!session) return false;
    
    const server = servers.find(s => s.id === serverId);
    if (!server) return false;
    
    if (server.owner === session.email) return true;
    
    const access = server.sharedAccess.find(a => a.email === session.email);
    if (!access) return false;
    
    if (access.permission === 'full') return true;
    if (access.permission === 'start-only' && action === 'start') return true;
    
    return false;
  }, [session, servers]);
  
  return (
    <ServerContext.Provider value={{
      servers,
      currentServer,
      selectServer,
      createServer,
      startServer,
      stopServer,
      updateServer,
      canPerformAction
    }}>
      {children}
    </ServerContext.Provider>
  );
}

export function useServers() {
  const context = useContext(ServerContext);
  if (!context) {
    throw new Error('useServers must be used within ServerProvider');
  }
  return context;
}
