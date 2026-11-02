import { useEffect, useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { Moon, Sun, QrCode, LogOut, Menu, X } from 'lucide-react';
import useTheme from '../hooks/useTheme.js';
import { useAuth } from '../contexts/AuthContext.jsx';

export default function AppLayout() {
  const [theme, toggleTheme] = useTheme();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);

  useEffect(() => { setOpen(false); window.scrollTo(0, 0); }, [pathname]);

  async function logout() {
    await signOut();
    navigate('/login');
  }

  return (
    <div className="app">
      <header className="nav">
        <Link to="/" className="logo"><QrCode size={22} /> QRForge</Link>
        <div className="nav-right">
          <nav className={`nav-links ${open ? 'open' : ''}`}>
            <Link to="/generator" className="nav-link">QR Generator</Link>
            <Link to="/pricing" className="nav-link">Pricing</Link>
            {user ? (
              <>
                <Link to="/dashboard" className="nav-link">Dashboard</Link>
                <button className="nav-link nav-btn" onClick={logout}><LogOut size={16} /> Log out</button>
              </>
            ) : (
              <>
                <Link to="/login" className="nav-link">Login</Link>
                <Link to="/register" className="btn primary sm">Try It Free</Link>
              </>
            )}
          </nav>
          <button className="icon-btn" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button className="icon-btn menu-btn" onClick={() => setOpen((o) => !o)} aria-label="Menu" aria-expanded={open}>
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </header>
      <main><Outlet /></main>
      <footer className="footer">
        <div className="footer-inner">
          <div>
            <Link to="/" className="logo"><QrCode size={20} /> QRForge</Link>
            <p className="muted small">Free QR codes with custom designs, dynamic links and scan analytics.</p>
          </div>
          <nav className="footer-links">
            <Link to="/generator">QR Generator</Link>
            <Link to="/pricing">Pricing</Link>
            <Link to="/login">Login</Link>
          </nav>
        </div>
        <p className="muted small center">© {new Date().getFullYear()} QRForge. All rights reserved.</p>
      </footer>
    </div>
  );
}
