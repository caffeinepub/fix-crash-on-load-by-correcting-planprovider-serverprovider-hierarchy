import { Link, useLocation } from '@tanstack/react-router';
import { Home, Terminal, Users, Puzzle, FolderOpen, Settings, Share2, CreditCard } from 'lucide-react';
import { useServers } from '../servers/ServerContext';
import { cn } from '@/lib/utils';

export default function LeftNav() {
  const location = useLocation();
  const { currentServer } = useServers();
  
  const navItems = [
    { path: '/', label: 'Dashboard', icon: Home },
    ...(currentServer ? [
      { path: `/servers/${currentServer.id}/console`, label: 'Console', icon: Terminal },
      { path: `/servers/${currentServer.id}/players`, label: 'Players', icon: Users },
      { path: `/servers/${currentServer.id}/plugins`, label: 'Plugins', icon: Puzzle },
      { path: `/servers/${currentServer.id}/files`, label: 'Files', icon: FolderOpen },
      { path: `/servers/${currentServer.id}/settings`, label: 'Settings', icon: Settings },
      { path: `/servers/${currentServer.id}/access`, label: 'Access', icon: Share2 }
    ] : []),
    { path: '/plans', label: 'Plans', icon: CreditCard }
  ];
  
  return (
    <aside className="w-64 bg-gradient-to-b from-purple-950/30 to-black border-r border-yellow-500/20 flex flex-col">
      <div className="p-4 border-b border-yellow-500/20">
        <img 
          src="/assets/generated/auracloud-wordmark.dim_512x192.png" 
          alt="Auracloud" 
          className="h-10"
        />
      </div>
      
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-lg transition-colors',
                isActive 
                  ? 'bg-yellow-500 text-black font-medium' 
                  : 'text-gray-300 hover:bg-purple-900/30 hover:text-white'
              )}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
      
      <div className="p-4 border-t border-yellow-500/20 text-xs text-gray-500 text-center">
        © 2026 Auracloud Hosting
      </div>
    </aside>
  );
}
