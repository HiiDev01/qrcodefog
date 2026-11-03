
import { useEffect, useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Moon,
  Sun,
  QrCode,
  LogOut,
  Menu,
  X,
  ArrowUpRight
} from 'lucide-react';

import useTheme from '../hooks/useTheme.js';
import { useAuth } from '../contexts/AuthContext.jsx';
import Footer from '../components/Footer.jsx';

export default function AppLayout() {
  const [theme, toggleTheme] = useTheme();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
    window.scrollTo(0, 0);
  }, [pathname]);

  async function logout() {
    await signOut();
    navigate('/login');
  }

  return (
    <div className="app">

      <header className="qrf-nav">
        <div className="qrf-nav-inner">

          <Link to="/" className="qrf-nav-brand">
            <span className="qrf-nav-brand-icon">
              <QrCode size={21} strokeWidth={2.2} />
            </span>
            <span>QRForge</span>
          </Link>

          <nav className={`qrf-nav-links ${open ? 'qrf-nav-links-open' : ''}`}>

            <Link to="/generator" className="qrf-nav-link">
              QR Generator
            </Link>

            <Link to="/pricing" className="qrf-nav-link">
              Pricing
            </Link>

            {user ? (
              <>
                <Link to="/dashboard" className="qrf-nav-link">
                  Dashboard
                </Link>

                <button
                  className="qrf-nav-link qrf-nav-logout"
                  onClick={logout}
                >
                  <LogOut size={15} />
                  Log out
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="qrf-nav-link">
                  Login
                </Link>

                <Link to="/register" className="qrf-nav-cta">
                  Get started
                  <ArrowUpRight size={15} />
                </Link>
              </>
            )}

          </nav>

          <div className="qrf-nav-actions">

            <button
              className="qrf-nav-theme"
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun size={18} />
              ) : (
                <Moon size={18} />
              )}
            </button>

            <button
              className="qrf-nav-menu"
              onClick={() => setOpen(o => !o)}
              aria-label="Toggle navigation"
              aria-expanded={open}
            >
              {open ? <X size={19} /> : <Menu size={19} />}
            </button>

          </div>

        </div>
      </header>

      <main>
        <Outlet />
      </main>

      <Footer />

    </div>
  );
}
