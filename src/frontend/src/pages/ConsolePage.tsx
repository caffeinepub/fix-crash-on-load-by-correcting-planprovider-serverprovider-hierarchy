import { useParams } from '@tanstack/react-router';
import { useServers } from '../servers/ServerContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Play, Square } from 'lucide-react';
import { useEffect, useRef } from 'react';

export default function ConsolePage() {
  const { serverId } = useParams({ from: '/servers/$serverId/console' });
  const { servers, startServer, stopServer, canPerformAction } = useServers();
  const server = servers.find(s => s.id === serverId);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [server?.consoleLog]);
  
  if (!server) {
    return <div className="p-6">Server not found</div>;
  }
  
  const canStart = canPerformAction(serverId, 'start');
  const canStop = canPerformAction(serverId, 'stop');
  
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Console</h1>
          <p className="text-gray-400">{server.name}</p>
        </div>
        <div className="flex items-center gap-4">
          <Badge variant={server.status === 'Online' ? 'default' : 'secondary'} className="text-lg px-4 py-2">
            {server.status}
          </Badge>
          {server.status === 'Offline' && canStart && (
            <Button onClick={() => startServer(serverId)} className="bg-green-600 hover:bg-green-700">
              <Play className="w-4 h-4 mr-2" />
              Start Server
            </Button>
          )}
          {server.status === 'Online' && canStop && (
            <Button onClick={() => stopServer(serverId)} variant="destructive">
              <Square className="w-4 h-4 mr-2" />
              Stop Server
            </Button>
          )}
          {!canStart && server.status === 'Offline' && (
            <Badge variant="outline">No permission to start</Badge>
          )}
        </div>
      </div>
      
      <Card className="border-yellow-500/20">
        <CardHeader>
          <CardTitle>Server Console</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[600px] w-full rounded bg-black p-4 font-mono text-sm" ref={scrollRef}>
            {server.consoleLog.length === 0 ? (
              <div className="text-gray-500">Console is empty. Start the server to see logs.</div>
            ) : (
              <div className="space-y-1">
                {server.consoleLog.map((entry, i) => (
                  <div key={i} className={
                    entry.type === 'error' ? 'text-red-400' :
                    entry.type === 'warning' ? 'text-yellow-400' :
                    entry.type === 'player' ? 'text-green-400' :
                    'text-gray-300'
                  }>
                    [{new Date(entry.timestamp).toLocaleTimeString()}] {entry.message}
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
