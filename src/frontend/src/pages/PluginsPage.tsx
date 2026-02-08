import { useState, useMemo } from 'react';
import { useParams } from '@tanstack/react-router';
import { useServers } from '../servers/ServerContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Download, Trash2, Package, ShoppingCart, CheckCircle } from 'lucide-react';
import { searchPlugins, getPluginCategories } from '../plugins/pluginCatalog';
import { searchPaidPlugins, getPaidPluginCategories, PaidPlugin } from '../plugins/paidPluginCatalog';
import PaidPluginPurchaseDialog from '../components/PaidPluginPurchaseDialog';

export default function PluginsPage() {
  const { serverId } = useParams({ from: '/servers/$serverId/plugins' });
  const { servers, currentServer, updateServer, canPerformAction } = useServers();
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [paidCategory, setPaidCategory] = useState('All');
  const [purchaseDialogOpen, setPurchaseDialogOpen] = useState(false);
  const [selectedPaidPlugin, setSelectedPaidPlugin] = useState<PaidPlugin | null>(null);
  
  const server = servers.find(s => s.id === serverId) || currentServer;
  const canManagePlugins = server ? canPerformAction(server.id, 'plugins') : false;
  
  const freePlugins = useMemo(() => searchPlugins(searchQuery, category), [searchQuery, category]);
  const paidPlugins = useMemo(() => searchPaidPlugins(searchQuery, paidCategory), [searchQuery, paidCategory]);
  const categories = useMemo(() => getPluginCategories(), []);
  const paidCategories = useMemo(() => getPaidPluginCategories(), []);
  
  const installedPlugins = server?.installedPlugins || [];
  const ownedPaidPlugins = server?.ownedPaidPlugins || [];
  
  const handleInstall = (pluginId: string) => {
    if (!server || !canManagePlugins) return;
    
    if (!installedPlugins.includes(pluginId)) {
      updateServer(server.id, {
        installedPlugins: [...installedPlugins, pluginId]
      });
    }
  };
  
  const handleUninstall = (pluginId: string) => {
    if (!server || !canManagePlugins) return;
    
    updateServer(server.id, {
      installedPlugins: installedPlugins.filter(id => id !== pluginId)
    });
  };
  
  const handlePurchaseClick = (plugin: PaidPlugin) => {
    setSelectedPaidPlugin(plugin);
    setPurchaseDialogOpen(true);
  };
  
  const handlePurchaseComplete = (pluginId: string) => {
    if (!server) return;
    
    updateServer(server.id, {
      ownedPaidPlugins: [...ownedPaidPlugins, pluginId]
    });
  };
  
  if (!server) {
    return (
      <div className="p-6">
        <Card className="border-yellow-500/20">
          <CardContent className="py-12 text-center">
            <p className="text-gray-400">No server selected</p>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Plugins</h1>
        <p className="text-gray-400">Manage and install plugins for your server</p>
      </div>
      
      <Tabs defaultValue="browse" className="w-full">
        <TabsList>
          <TabsTrigger value="browse">Browse Free Plugins</TabsTrigger>
          <TabsTrigger value="paid">Paid Plugins</TabsTrigger>
          <TabsTrigger value="installed">
            Installed ({installedPlugins.length})
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="browse" className="space-y-4">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search free plugins..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map(cat => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {freePlugins.map(plugin => {
              const isInstalled = installedPlugins.includes(plugin.id);
              
              return (
                <Card key={plugin.id} className="border-yellow-500/20">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg">{plugin.name}</CardTitle>
                        <CardDescription className="text-xs">
                          by {plugin.author} • v{plugin.version}
                        </CardDescription>
                      </div>
                      <Badge variant="outline">{plugin.category}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-gray-400">{plugin.description}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{(plugin.downloads / 1000000).toFixed(1)}M downloads</span>
                    </div>
                    {canManagePlugins && (
                      <Button
                        size="sm"
                        onClick={() => isInstalled ? handleUninstall(plugin.id) : handleInstall(plugin.id)}
                        className={isInstalled ? 'w-full bg-red-600 hover:bg-red-700' : 'w-full bg-yellow-500 hover:bg-yellow-600 text-black'}
                      >
                        {isInstalled ? (
                          <>
                            <Trash2 className="w-4 h-4 mr-2" />
                            Uninstall
                          </>
                        ) : (
                          <>
                            <Download className="w-4 h-4 mr-2" />
                            Install
                          </>
                        )}
                      </Button>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>
        
        <TabsContent value="paid" className="space-y-4">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search paid plugins..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={paidCategory} onValueChange={setPaidCategory}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {paidCategories.map(cat => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {paidPlugins.map(plugin => {
              const isOwned = ownedPaidPlugins.includes(plugin.id);
              const isInstalled = installedPlugins.includes(plugin.id);
              
              return (
                <Card key={plugin.id} className="border-yellow-500/20">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg">{plugin.name}</CardTitle>
                        <CardDescription className="text-xs">
                          by {plugin.author} • v{plugin.version}
                        </CardDescription>
                      </div>
                      <Badge variant="outline">{plugin.category}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-gray-400">{plugin.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-yellow-500">${plugin.price}</span>
                      {isOwned && (
                        <Badge className="bg-green-600">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Owned
                        </Badge>
                      )}
                    </div>
                    {isOwned ? (
                      canManagePlugins && (
                        <Button
                          size="sm"
                          onClick={() => isInstalled ? handleUninstall(plugin.id) : handleInstall(plugin.id)}
                          className={isInstalled ? 'w-full bg-red-600 hover:bg-red-700' : 'w-full bg-yellow-500 hover:bg-yellow-600 text-black'}
                        >
                          {isInstalled ? (
                            <>
                              <Trash2 className="w-4 h-4 mr-2" />
                              Uninstall
                            </>
                          ) : (
                            <>
                              <Download className="w-4 h-4 mr-2" />
                              Install
                            </>
                          )}
                        </Button>
                      )
                    ) : (
                      <Button
                        size="sm"
                        onClick={() => handlePurchaseClick(plugin)}
                        className="w-full bg-yellow-500 hover:bg-yellow-600 text-black"
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Purchase
                      </Button>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>
        
        <TabsContent value="installed" className="space-y-4">
          {installedPlugins.length === 0 ? (
            <Card className="border-yellow-500/20">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Package className="w-16 h-16 text-gray-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">No plugins installed</h3>
                <p className="text-gray-400">Browse and install plugins to get started</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {installedPlugins.map(pluginId => {
                const plugin = [...searchPlugins(''), ...paidPlugins].find(p => p.id === pluginId);
                if (!plugin) return null;
                
                const isPaid = 'price' in plugin;
                
                return (
                  <Card key={plugin.id} className="border-yellow-500/20">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg">{plugin.name}</CardTitle>
                          <CardDescription className="text-xs">
                            by {plugin.author} • v{plugin.version}
                          </CardDescription>
                        </div>
                        <Badge variant="outline">{plugin.category}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-sm text-gray-400">{plugin.description}</p>
                      {isPaid && (
                        <Badge className="bg-yellow-600">Premium Plugin</Badge>
                      )}
                      {canManagePlugins && (
                        <Button
                          size="sm"
                          onClick={() => handleUninstall(plugin.id)}
                          className="w-full bg-red-600 hover:bg-red-700"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Uninstall
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </TabsContent>
      </Tabs>
      
      <PaidPluginPurchaseDialog
        open={purchaseDialogOpen}
        onOpenChange={setPurchaseDialogOpen}
        plugin={selectedPaidPlugin}
        onPurchaseComplete={handlePurchaseComplete}
      />
    </div>
  );
}
