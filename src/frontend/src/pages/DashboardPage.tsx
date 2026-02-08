import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useServers } from '../servers/ServerContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Server, Play, Square } from 'lucide-react';
import ServerCreateDialog from '../components/ServerCreateDialog';
import { renderMinecraftText } from '../formatting/mcFormat';

export default function DashboardPage() {
  const navigate = useNavigate();
  const { servers, selectServer, startServer, stopServer, canPerformAction } = useServers();
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  
  const handleSelectServer = (serverId: string) => {
    selectServer(serverId);
    navigate({ to: `/servers/${serverId}/console` });
  };
  
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-gray-400">Manage your Minecraft servers</p>
        </div>
        <Button onClick={() => setShowCreateDialog(true)} className="bg-yellow-500 hover:bg-yellow-600 text-black">
          <Plus className="w-4 h-4 mr-2" />
          Create Server
        </Button>
      </div>
      
      {servers.length === 0 ? (
        <Card className="border-yellow-500/20">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Server className="w-16 h-16 text-gray-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">No servers yet</h3>
            <p className="text-gray-400 mb-4">Create your first Minecraft server to get started</p>
            <Button onClick={() => setShowCreateDialog(true)} className="bg-yellow-500 hover:bg-yellow-600 text-black">
              <Plus className="w-4 h-4 mr-2" />
              Create Server
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {servers.map(server => (
            <Card key={server.id} className="border-yellow-500/20 hover:border-yellow-500/50 transition-colors cursor-pointer" onClick={() => handleSelectServer(server.id)}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    {server.logo && (
                      <img src={server.logo} alt="" className="w-12 h-12 rounded" />
                    )}
                    <div>
                      <CardTitle className="text-lg">
                        {server.title ? renderMinecraftText(server.title) : server.name}
                      </CardTitle>
                      <CardDescription>
                        {server.domain}{server.domainSuffix}
                      </CardDescription>
                    </div>
                  </div>
                  <Badge variant={server.status === 'Online' ? 'default' : 'secondary'}>
                    {server.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">RAM:</span>
                    <span>{server.ram} GB</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Players:</span>
                    <span>{server.onlinePlayers.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Uptime:</span>
                    <span>{Math.floor(server.uptime / 60)}m</span>
                  </div>
                </div>
                
                <div className="flex gap-2 mt-4" onClick={(e) => e.stopPropagation()}>
                  {server.status === 'Offline' && canPerformAction(server.id, 'start') && (
                    <Button size="sm" onClick={() => startServer(server.id)} className="flex-1 bg-green-600 hover:bg-green-700">
                      <Play className="w-4 h-4 mr-1" />
                      Start
                    </Button>
                  )}
                  {server.status === 'Online' && canPerformAction(server.id, 'stop') && (
                    <Button size="sm" onClick={() => stopServer(server.id)} className="flex-1 bg-red-600 hover:bg-red-700">
                      <Square className="w-4 h-4 mr-1" />
                      Stop
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      
      <ServerCreateDialog open={showCreateDialog} onOpenChange={setShowCreateDialog} />
    </div>
  );
}
