import { useServers } from '../servers/ServerContext';
import { useAuth } from '../auth/AuthContext';
import { usePlan } from '../plans/PlanContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { User, LogOut } from 'lucide-react';
import { renderMinecraftText } from '../formatting/mcFormat';

export default function TopHeader() {
  const { currentServer } = useServers();
  const { session, logout } = useAuth();
  const { currentPlan } = usePlan();
  
  return (
    <header className="h-16 bg-gradient-to-r from-black via-purple-950/20 to-black border-b border-yellow-500/20 flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        {currentServer && (
          <>
            {currentServer.logo && (
              <img src={currentServer.logo} alt="" className="w-10 h-10 rounded" />
            )}
            <div>
              <div className="font-semibold">
                {currentServer.title ? renderMinecraftText(currentServer.title) : currentServer.name}
              </div>
              {currentServer.subtitle && (
                <div className="text-sm text-gray-400">
                  {renderMinecraftText(currentServer.subtitle)}
                </div>
              )}
            </div>
            <Badge variant={currentServer.status === 'Online' ? 'default' : 'secondary'} className="ml-2">
              {currentServer.status}
            </Badge>
          </>
        )}
      </div>
      
      <div className="flex items-center gap-4">
        <Badge variant="outline" className="border-yellow-500/50 text-yellow-500">
          {currentPlan.name}
        </Badge>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <User className="w-5 h-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem disabled>
              {session?.email}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={logout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
