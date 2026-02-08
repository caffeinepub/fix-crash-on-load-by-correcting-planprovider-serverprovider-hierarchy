import { useState } from 'react';
import { useServers } from '../servers/ServerContext';
import { FileNode } from '../servers/serverTypes';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Folder, File, ChevronRight, Home } from 'lucide-react';

interface FileManagerProps {
  serverId: string;
}

export default function FileManager({ serverId }: FileManagerProps) {
  const { servers, canPerformAction } = useServers();
  const server = servers.find(s => s.id === serverId);
  const [currentPath, setCurrentPath] = useState('/');
  
  if (!server) return null;
  
  const canManageFiles = canPerformAction(serverId, 'files');
  
  const getCurrentFolder = (): FileNode => {
    if (currentPath === '/') return server.fileTree;
    
    const parts = currentPath.split('/').filter(Boolean);
    let current = server.fileTree;
    
    for (const part of parts) {
      const child = current.children?.find(c => c.name === part);
      if (child) current = child;
    }
    
    return current;
  };
  
  const currentFolder = getCurrentFolder();
  const items = currentFolder.children || [];
  
  const handleNavigate = (node: FileNode) => {
    if (node.type === 'folder') {
      setCurrentPath(node.path);
    }
  };
  
  const pathParts = currentPath.split('/').filter(Boolean);
  
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-sm">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCurrentPath('/')}
          className="h-8"
        >
          <Home className="w-4 h-4" />
        </Button>
        {pathParts.map((part, i) => (
          <div key={i} className="flex items-center gap-2">
            <ChevronRight className="w-4 h-4 text-gray-500" />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCurrentPath('/' + pathParts.slice(0, i + 1).join('/'))}
              className="h-8"
            >
              {part}
            </Button>
          </div>
        ))}
      </div>
      
      {!canManageFiles && (
        <div className="text-sm text-gray-500 bg-yellow-500/10 border border-yellow-500/20 rounded p-3">
          You have read-only access to files
        </div>
      )}
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Size</TableHead>
            <TableHead>Modified</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center text-gray-500">
                Empty folder
              </TableCell>
            </TableRow>
          ) : (
            items.map(item => (
              <TableRow
                key={item.path}
                className={item.type === 'folder' ? 'cursor-pointer hover:bg-purple-900/20' : ''}
                onClick={() => handleNavigate(item)}
              >
                <TableCell className="flex items-center gap-2">
                  {item.type === 'folder' ? (
                    <Folder className="w-4 h-4 text-yellow-500" />
                  ) : (
                    <File className="w-4 h-4 text-gray-400" />
                  )}
                  <span>{item.name}</span>
                </TableCell>
                <TableCell>{item.type}</TableCell>
                <TableCell>
                  {item.type === 'file' && item.size ? `${(item.size / 1024).toFixed(1)} KB` : '-'}
                </TableCell>
                <TableCell>{new Date(item.updatedAt).toLocaleString()}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
