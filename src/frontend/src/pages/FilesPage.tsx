import { useParams } from '@tanstack/react-router';
import { useServers } from '../servers/ServerContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import FileManager from '../components/FileManager';

export default function FilesPage() {
  const { serverId } = useParams({ from: '/servers/$serverId/files' });
  const { servers } = useServers();
  const server = servers.find(s => s.id === serverId);
  
  if (!server) {
    return <div className="p-6">Server not found</div>;
  }
  
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Files</h1>
        <p className="text-gray-400">{server.name}</p>
      </div>
      
      <Card className="border-yellow-500/20">
        <CardHeader>
          <CardTitle>File Manager</CardTitle>
        </CardHeader>
        <CardContent>
          <FileManager serverId={serverId} />
        </CardContent>
      </Card>
    </div>
  );
}
