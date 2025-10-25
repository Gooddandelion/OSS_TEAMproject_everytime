import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import './Layout.css';

function Layout() {
  return (
    <div>
      <header className="app-header">
        <Link to="/" className="logo-link">
          <h1>HandongMate</h1>
        </Link>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;