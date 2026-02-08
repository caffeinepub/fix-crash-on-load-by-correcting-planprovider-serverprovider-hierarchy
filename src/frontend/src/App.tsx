import { RouterProvider, createRouter, createRoute, createRootRoute } from '@tanstack/react-router';
import { AppProviders } from './AppProviders';
import AuthPage from './pages/AuthPage';
import PanelLayout from './layout/PanelLayout';
import DashboardPage from './pages/DashboardPage';
import ConsolePage from './pages/ConsolePage';
import PlayersPage from './pages/PlayersPage';
import PluginsPage from './pages/PluginsPage';
import FilesPage from './pages/FilesPage';
import SettingsPage from './pages/SettingsPage';
import AccessSharingPage from './pages/AccessSharingPage';
import PlansPage from './pages/PlansPage';
import ServerDetailsPage from './pages/ServerDetailsPage';
import { useAuth } from './auth/AuthContext';
import { AppErrorBoundary } from './components/AppErrorBoundary';

function RootComponent() {
  const { isAuthenticated, isLoading } = useAuth();
  
  // Show loading state while auth is initializing
  if (isLoading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }
  
  if (!isAuthenticated) {
    return <AuthPage />;
  }
  
  return <PanelLayout />;
}

const rootRoute = createRootRoute({
  component: RootComponent
});

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: DashboardPage
});

const serverDetailsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/servers/$serverId',
  component: ServerDetailsPage
});

const consoleRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/servers/$serverId/console',
  component: ConsolePage
});

const playersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/servers/$serverId/players',
  component: PlayersPage
});

const pluginsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/servers/$serverId/plugins',
  component: PluginsPage
});

const filesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/servers/$serverId/files',
  component: FilesPage
});

const settingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/servers/$serverId/settings',
  component: SettingsPage
});

const accessSharingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/servers/$serverId/access',
  component: AccessSharingPage
});

const plansRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/plans',
  component: PlansPage
});

const routeTree = rootRoute.addChildren([
  dashboardRoute,
  serverDetailsRoute,
  consoleRoute,
  playersRoute,
  pluginsRoute,
  filesRoute,
  settingsRoute,
  accessSharingRoute,
  plansRoute
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

/**
 * Main App component with corrected provider nesting order.
 * Provider order: AuthProvider → PlanProvider → ServerProvider (see AppProviders.tsx)
 */
export default function App() {
  return (
    <AppErrorBoundary>
      <AppProviders>
        <RouterProvider router={router} />
      </AppProviders>
    </AppErrorBoundary>
  );
}
