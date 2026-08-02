import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router';
import Navbar from './Navbar';
import Footer from './Footer';
import SideDock from './SideDock';

/**
 * 全局布局（嵌套路由模式：本组件渲染 <Outlet/>，App.tsx 必须使用嵌套 <Route>）。
 * 负责：Navbar / Footer / 路由切换回到顶部。
 */
export default function Layout() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);

  return (
    <div className="flex min-h-[100dvh] flex-col">
      <Navbar />
      <SideDock />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
