import { useState } from 'react';
import { useServers } from '../servers/ServerContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { renderMinecraftText } from '../formatting/mcFormat';

interface ServerBrandingFormProps {
  serverId: string;
}

export default function ServerBrandingForm({ serverId }: ServerBrandingFormProps) {
  const { servers, updateServer } = useServers();
  const server = servers.find(s => s.id === serverId);
  
  const [title, setTitle] = useState(server?.title || '');
  const [subtitle, setSubtitle] = useState(server?.subtitle || '');
  const [logoPreview, setLogoPreview] = useState(server?.logo || '');
  
  if (!server) return null;
  
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      setLogoPreview(dataUrl);
    };
    reader.readAsDataURL(file);
  };
  
  const handleSave = () => {
    updateServer(serverId, {
      title: title || undefined,
      subtitle: subtitle || undefined,
      logo: logoPreview || undefined
    });
  };
  
  return (
    <div className="space-y-6">
      <Card className="border-yellow-500/20">
        <CardHeader>
          <CardTitle>Server Branding</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="logo">Server Logo</Label>
            <Input
              id="logo"
              type="file"
              accept="image/*"
              onChange={handleLogoUpload}
            />
            {logoPreview && (
              <div className="mt-2">
                <img src={logoPreview} alt="Logo preview" className="w-24 h-24 rounded border border-yellow-500/20" />
              </div>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="title">Server Title</Label>
            <Input
              id="title"
              placeholder="My Server"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <p className="text-xs text-gray-500">
              Use Minecraft color codes: &a for green, &c for red, &e for yellow, etc.
            </p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="subtitle">Server Subtitle</Label>
            <Input
              id="subtitle"
              placeholder="Welcome to our server!"
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
            />
          </div>
          
          <Button onClick={handleSave} className="bg-yellow-500 hover:bg-yellow-600 text-black">
            Save Changes
          </Button>
        </CardContent>
      </Card>
      
      <Card className="border-yellow-500/20">
        <CardHeader>
          <CardTitle>Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 p-4 bg-black/50 rounded">
            {logoPreview && (
              <img src={logoPreview} alt="" className="w-16 h-16 rounded" />
            )}
            <div>
              <div className="text-xl font-semibold">
                {title ? renderMinecraftText(title) : server.name}
              </div>
              {subtitle && (
                <div className="text-sm text-gray-400">
                  {renderMinecraftText(subtitle)}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
