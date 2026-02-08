import { useParams } from '@tanstack/react-router';
import { useServers } from '../servers/ServerContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ServerBrandingForm from '../components/ServerBrandingForm';

export default function SettingsPage() {
  const { serverId } = useParams({ from: '/servers/$serverId/settings' });
  const { servers, canPerformAction } = useServers();
  const server = servers.find(s => s.id === serverId);
  
  if (!server) {
    return <div className="p-6">Server not found</div>;
  }
  
  const canEditSettings = canPerformAction(serverId, 'settings');
  
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-gray-400">{server.name}</p>
      </div>
      
      {!canEditSettings ? (
        <Card className="border-yellow-500/20">
          <CardContent className="py-12 text-center">
            <p className="text-gray-400">You don't have permission to edit server settings</p>
          </CardContent>
        </Card>
      ) : (
        <ServerBrandingForm serverId={serverId} />
      )}
    </div>
  );
}
