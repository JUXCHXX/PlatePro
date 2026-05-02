import { Link, NavLink, Navigate, Outlet, useNavigate } from "react-router-dom";
import { useApp } from "@/store/useApp";
import { Home, Palette, UtensilsCrossed, Megaphone, Settings, ExternalLink, LogOut, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const links = [
  { to: "/dashboard", label: "Inicio", icon: Home, end: true },
  { to: "/dashboard/editor", label: "Editor", icon: Palette },
  { to: "/dashboard/menu", label: "Menú", icon: UtensilsCrossed },
  { to: "/dashboard/offers", label: "Ofertas", icon: Megaphone },
  { to: "/dashboard/settings", label: "Configuración", icon: Settings },
];

export default function DashboardLayout() {
  const user = useApp((s) => s.user);
  const data = useApp((s) => s.getCurrent());
  const logout = useApp((s) => s.logout);
  const nav = useNavigate();

  if (!user || !data) return <Navigate to="/auth/login" replace />;

  const r = data.restaurant;

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <aside className="hidden md:flex w-64 flex-col border-r border-sidebar-border bg-sidebar">
        <Link to="/" className="flex items-center gap-2 px-5 h-16 border-b border-sidebar-border">
          <div className="h-8 w-8 rounded-lg bg-gradient-brand grid place-items-center text-primary-foreground font-bold">P</div>
          <span className="font-display text-xl font-bold">PlatePro</span>
        </Link>

        <div className="px-4 py-4 border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-gradient-brand grid place-items-center text-primary-foreground font-semibold">
              {r.name.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-sm font-semibold truncate">{r.name}</div>
              <span className={cn(
                "text-[10px] uppercase tracking-wide font-bold px-1.5 py-0.5 rounded",
                r.is_published ? "bg-green-500/20 text-green-400" : "bg-yellow-500/20 text-yellow-400"
              )}>
                {r.is_published ? "Publicado" : "Borrador"}
              </span>
            </div>
          </div>
          {r.is_published && (
            <Button asChild variant="outline" size="sm" className="w-full mt-3">
              <Link to={`/r/${r.slug}`} target="_blank">
                <ExternalLink className="h-3.5 w-3.5 mr-1.5" /> Ver mi página
              </Link>
            </Button>
          )}
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {links.map((l) => (
            <NavLink
              key={l.to} to={l.to} end={l.end}
              className={({ isActive }) => cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                isActive ? "bg-brand/15 text-brand" : "text-sidebar-foreground hover:bg-sidebar-accent"
              )}
            >
              <l.icon className="h-4 w-4" />
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-sidebar-border space-y-2">
          <Button variant="ghost" size="sm" className="w-full justify-start" asChild>
            <Link to={`/r/${r.slug}`} target="_blank"><Eye className="h-4 w-4 mr-2" /> Vista previa</Link>
          </Button>
          <Button variant="ghost" size="sm" className="w-full justify-start text-muted-foreground" onClick={() => { logout(); nav("/"); }}>
            <LogOut className="h-4 w-4 mr-2" /> Cerrar sesión
          </Button>
        </div>
      </aside>

      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 inset-x-0 z-40 h-14 border-b border-border bg-background flex items-center px-4 gap-3">
        <Link to="/dashboard" className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-md bg-gradient-brand grid place-items-center text-primary-foreground font-bold text-xs">P</div>
          <span className="font-display font-bold">PlatePro</span>
        </Link>
      </div>

      {/* Mobile bottom nav */}
      <div className="md:hidden fixed bottom-0 inset-x-0 z-40 h-16 border-t border-border bg-background">
        <div className="grid grid-cols-5 h-full">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.end}
              className={({ isActive }) => cn(
                "flex flex-col items-center justify-center gap-1 text-[10px]",
                isActive ? "text-brand" : "text-muted-foreground"
              )}>
              <l.icon className="h-4 w-4" /> {l.label}
            </NavLink>
          ))}
        </div>
      </div>

      <main className="flex-1 min-w-0 md:pt-0 pt-14 pb-20 md:pb-0">
        <Outlet />
      </main>
    </div>
  );
}
