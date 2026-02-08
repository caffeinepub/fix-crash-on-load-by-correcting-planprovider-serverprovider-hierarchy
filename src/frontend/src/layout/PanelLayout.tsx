import { Outlet } from '@tanstack/react-router';
import LeftNav from './LeftNav';
import TopHeader from './TopHeader';

export default function PanelLayout() {
  return (
    <div className="min-h-screen bg-black text-white flex">
      <LeftNav />
      <div className="flex-1 flex flex-col">
        <TopHeader />
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
