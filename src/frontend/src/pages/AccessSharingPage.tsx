import { useState } from 'react';
import { useParams } from '@tanstack/react-router';
import { useServers } from '../servers/ServerContext';
import { useAuth } from '../auth/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Trash2, UserPlus } from 'lucide-react';

export default function AccessSharingPage() {
  const { serverId } = useParams({ from: '/servers/$serverId/access' });
  const { session } = useAuth();
  const { servers, updateServer } = useServers();
  const server = servers.find(s => s.id === serverId);
  
  const [inviteEmail, setInviteEmail] = useState('');
  const [invitePermission, setInvitePermission] = useState<'full' | 'start-only'>('start-only');
  
  if (!server) {
    return <div className="p-6">Server not found</div>;
  }
  
  const isOwner = server.owner === session?.email;
  
  const handleInvite = () => {
    if (!inviteEmail || !isOwner) return;
    
    const newAccess = {
      email: inviteEmail.toLowerCase(),
      permission: invitePermission,
      grantedAt: Date.now()
    };
    
    updateServer(serverId, {
      sharedAccess: [...server.sharedAccess, newAccess]
    });
    
    setInviteEmail('');
  };
  
  const handleRevoke = (email: string) => {
    if (!isOwner) return;
    
    updateServer(serverId, {
      sharedAccess: server.sharedAccess.filter(a => a.email !== email)
    });
  };
  
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Access Sharing</h1>
        <p className="text-gray-400">{server.name}</p>
      </div>
      
      {!isOwner ? (
        <Card className="border-yellow-500/20">
          <CardContent className="py-12 text-center">
            <p className="text-gray-400">Only the server owner can manage access</p>
          </CardContent>
        </Card>
      ) : (
        <>
          <Card className="border-yellow-500/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserPlus className="w-5 h-5" />
                Invite User
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Gmail Address</Label>
                <Input
                  type="email"
                  placeholder="user@gmail.com"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Permission Level</Label>
                <Select value={invitePermission} onValueChange={(v: any) => setInvitePermission(v)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="start-only">Start Only</SelectItem>
                    <SelectItem value="full">Full Access</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-gray-500">
                  {invitePermission === 'start-only' 
                    ? 'User can only start the server' 
                    : 'User can manage all server settings'}
                </p>
              </div>
              
              <Button onClick={handleInvite} className="bg-yellow-500 hover:bg-yellow-600 text-black">
                Send Invite
              </Button>
            </CardContent>
          </Card>
          
          <Card className="border-yellow-500/20">
            <CardHeader>
              <CardTitle>Shared Access</CardTitle>
            </CardHeader>
            <CardContent>
              {server.sharedAccess.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No users have been granted access yet
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Email</TableHead>
                      <TableHead>Permission</TableHead>
                      <TableHead>Granted</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {server.sharedAccess.map(access => (
                      <TableRow key={access.email}>
                        <TableCell>{access.email}</TableCell>
                        <TableCell>
                          <Badge variant={access.permission === 'full' ? 'default' : 'secondary'}>
                            {access.permission === 'full' ? 'Full Access' : 'Start Only'}
                          </Badge>
                        </TableCell>
                        <TableCell>{new Date(access.grantedAt).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleRevoke(access.email)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
