// Layout.js
import { Outlet } from 'react-router-dom';
import Sidebar from '../Sidebar';

function Layout() {
  return (
    <div className="app-container">
      <Sidebar />
      <main className="content-area">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;