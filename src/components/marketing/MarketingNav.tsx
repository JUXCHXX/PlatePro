import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export function MarketingNav() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  if (pathname.startsWith("/dashboard") || pathname.startsWith("/r/") || pathname.startsWith("/auth")) return null;

  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-border/40 bg-background/70 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-brand grid place-items-center text-primary-foreground font-bold">P</div>
          <span className="font-display text-xl font-bold">PlatePro</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          <a href="#features" className="hover:text-foreground transition-colors">Características</a>
          <a href="#templates" className="hover:text-foreground transition-colors">Plantillas</a>
          <a href="#how" className="hover:text-foreground transition-colors">Cómo funciona</a>
        </nav>
        <div className="hidden md:flex items-center gap-3">
          <Button variant="ghost" asChild><Link to="/auth/login">Iniciar sesión</Link></Button>
          <Button asChild className="bg-gradient-brand hover:opacity-90"><Link to="/auth/register">Empezar gratis</Link></Button>
        </div>
        <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Menú">
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-border/40 bg-background/95 backdrop-blur-xl">
          <div className="container py-4 flex flex-col gap-3">
            <a href="#features" onClick={() => setOpen(false)}>Características</a>
            <a href="#templates" onClick={() => setOpen(false)}>Plantillas</a>
            <a href="#how" onClick={() => setOpen(false)}>Cómo funciona</a>
            <Button variant="outline" asChild><Link to="/auth/login">Iniciar sesión</Link></Button>
            <Button asChild className="bg-gradient-brand"><Link to="/auth/register">Empezar gratis</Link></Button>
          </div>
        </div>
      )}
    </header>
  );
}
