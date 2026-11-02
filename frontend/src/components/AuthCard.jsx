import { supabaseConfigured } from '../lib/supabase.js';

export default function AuthCard({ title, subtitle, error, notice, children, footer }) {
  return (
    <div className="auth-wrap">
      <div className="card auth-card">
        <h1>{title}</h1>
        {subtitle && <p className="muted">{subtitle}</p>}
        {!supabaseConfigured && (
          <p className="warn">Supabase is not configured. Add your keys to frontend/.env.</p>
        )}
        {error && <p className="alert alert-error" role="alert">{error}</p>}
        {notice && <p className="alert alert-ok" role="status">{notice}</p>}
        {children}
        {footer && <p className="auth-footer">{footer}</p>}
      </div>
    </div>
  );
}
