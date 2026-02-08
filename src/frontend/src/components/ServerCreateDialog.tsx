import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useServers } from '../servers/ServerContext';

interface ServerCreateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DOMAIN_SUFFIXES = ['.org', '.net', '.fun', '.gg', '.play', '.host', '.xyz', '.com'];

export default function ServerCreateDialog({ open, onOpenChange }: ServerCreateDialogProps) {
  const { createServer } = useServers();
  const [name, setName] = useState('');
  const [domainSuffix, setDomainSuffix] = useState('.org');
  
  const handleCreate = () => {
    if (!name.trim()) return;
    
    createServer(name, domainSuffix);
    setName('');
    setDomainSuffix('.org');
    onOpenChange(false);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Server</DialogTitle>
          <DialogDescription>
            Set up your Minecraft server with a custom domain
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="server-name">Server Name</Label>
            <Input
              id="server-name"
              placeholder="My Awesome Server"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="domain-suffix">Domain Suffix</Label>
            <Select value={domainSuffix} onValueChange={setDomainSuffix}>
              <SelectTrigger id="domain-suffix">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {DOMAIN_SUFFIXES.map(suffix => (
                  <SelectItem key={suffix} value={suffix}>{suffix}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-gray-500">
              Your server will be accessible at: {name.toLowerCase().replace(/[^a-z0-9]/g, '') || 'yourserver'}{domainSuffix}
            </p>
          </div>
          
          <Button onClick={handleCreate} className="w-full bg-yellow-500 hover:bg-yellow-600 text-black">
            Create Server
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
