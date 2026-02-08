import { useParams } from '@tanstack/react-router';
import { useServers } from '../servers/ServerContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Play, Square, Settings, Users, FileText, Puzzle } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';
import { renderMinecraftText } from '../formatting/mcFormat';

export default function ServerDetailsPage() {
  const { serverId } = useParams({ from: '/servers/$serverId' });
  const navigate = useNavigate();
  const { servers, startServer, stopServer, canPerformAction } = useServers();
  
  const server = servers.find(s => s.id === serverId);
  
  if (!server) {
    return (
      <div className="p-6">
        <Card className="border-yellow-500/20">
          <CardContent className="py-12 text-center">
            <p className="text-gray-400">Server not found</p>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          {server.logo && (
            <img src={server.logo} alt="" className="w-16 h-16 rounded" />
          )}
          <div>
            <h1 className="text-3xl font-bold">
              {server.title ? renderMinecraftText(server.title) : server.name}
            </h1>
            <p className="text-gray-400">{server.domain}{server.domainSuffix}</p>
          </div>
        </div>
        <Badge variant={server.status === 'Online' ? 'default' : 'secondary'} className="text-lg px-4 py-2">
          {server.status}
        </Badge>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-yellow-500/20">
          <CardHeader>
            <CardTitle>RAM Usage</CardTitle>
            <CardDescription>Memory allocation</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{server.ram} GB</p>
          </CardContent>
        </Card>
        
        <Card className="border-yellow-500/20">
          <CardHeader>
            <CardTitle>Online Players</CardTitle>
            <CardDescription>Currently connected</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{server.onlinePlayers.length}</p>
          </CardContent>
        </Card>
        
        <Card className="border-yellow-500/20">
          <CardHeader>
            <CardTitle>Uptime</CardTitle>
            <CardDescription>Server runtime</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{Math.floor(server.uptime / 60)}m</p>
          </CardContent>
        </Card>
      </div>
      
      <Card className="border-yellow-500/20">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {server.status === 'Offline' && canPerformAction(server.id, 'start') && (
            <Button onClick={() => startServer(server.id)} className="bg-green-600 hover:bg-green-700">
              <Play className="w-4 h-4 mr-2" />
              Start Server
            </Button>
          )}
          {server.status === 'Online' && canPerformAction(server.id, 'stop') && (
            <Button onClick={() => stopServer(server.id)} className="bg-red-600 hover:bg-red-700">
              <Square className="w-4 h-4 mr-2" />
              Stop Server
            </Button>
          )}
          <Button variant="outline" onClick={() => navigate({ to: `/servers/${serverId}/console` })}>
            <FileText className="w-4 h-4 mr-2" />
            Console
          </Button>
          <Button variant="outline" onClick={() => navigate({ to: `/servers/${serverId}/players` })}>
            <Users className="w-4 h-4 mr-2" />
            Players
          </Button>
          <Button variant="outline" onClick={() => navigate({ to: `/servers/${serverId}/plugins` })}>
            <Puzzle className="w-4 h-4 mr-2" />
            Plugins
          </Button>
          {canPerformAction(server.id, 'settings') && (
            <Button variant="outline" onClick={() => navigate({ to: `/servers/${serverId}/settings` })}>
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
