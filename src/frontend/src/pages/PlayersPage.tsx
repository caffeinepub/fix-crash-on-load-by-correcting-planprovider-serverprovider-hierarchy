import { useParams } from '@tanstack/react-router';
import { useServers } from '../servers/ServerContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Users } from 'lucide-react';

export default function PlayersPage() {
  const { serverId } = useParams({ from: '/servers/$serverId/players' });
  const { servers } = useServers();
  const server = servers.find(s => s.id === serverId);
  
  if (!server) {
    return <div className="p-6">Server not found</div>;
  }
  
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Players</h1>
        <p className="text-gray-400">{server.name}</p>
      </div>
      
      <Card className="border-yellow-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Online Players ({server.onlinePlayers.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {server.status !== 'Online' ? (
            <div className="text-center py-8 text-gray-500">
              Server must be online to see players
            </div>
          ) : server.onlinePlayers.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No players online
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Player Name</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead>Ping</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {server.onlinePlayers.map(player => (
                  <TableRow key={player.name}>
                    <TableCell className="font-medium">{player.name}</TableCell>
                    <TableCell>{new Date(player.joinedAt).toLocaleTimeString()}</TableCell>
                    <TableCell>{player.ping}ms</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
