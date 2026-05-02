import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useApp } from "@/store/useApp";
import { toast } from "sonner";
import { ArrowLeft, ChefHat } from "lucide-react";

export default function Login() {
  const nav = useNavigate();
  const login = useApp((s) => s.login);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) { toast.error("Completa email y contraseña"); return; }
    login(email, password);
    toast.success("¡Bienvenido de vuelta!");
    nav("/dashboard");
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="hidden lg:flex relative bg-gradient-hero p-12 flex-col justify-between">
        <Link to="/" className="flex items-center gap-2 relative z-10">
          <div className="h-9 w-9 rounded-lg bg-gradient-brand grid place-items-center text-primary-foreground font-bold">P</div>
          <span className="font-display text-2xl font-bold">PlatePro</span>
        </Link>
        <div className="relative z-10">
          <ChefHat className="h-16 w-16 text-brand mb-6" />
          <h2 className="font-display text-4xl font-bold leading-tight max-w-md">
            "PlatePro nos ahorró miles. Tenemos menú digital y ofertas en una semana."
          </h2>
          <p className="mt-4 text-muted-foreground">— María, Restaurante La Cosecha</p>
        </div>
        <div className="relative z-10 text-sm text-muted-foreground">© 2026 PlatePro</div>
      </div>

      <div className="flex flex-col p-8 md:p-12 justify-center bg-background">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 lg:hidden">
          <ArrowLeft className="h-4 w-4" /> Volver
        </Link>
        <div className="max-w-sm w-full mx-auto">
          <h1 className="font-display text-3xl font-bold">Bienvenido</h1>
          <p className="mt-2 text-muted-foreground">Inicia sesión para entrar a tu dashboard</p>

          <form onSubmit={submit} className="mt-8 space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="hola@tu-restaurante.com" className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="password">Contraseña</Label>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="mt-1.5" />
            </div>
            <Button type="submit" className="w-full bg-gradient-brand hover:opacity-90 h-11">Iniciar sesión</Button>
          </form>

          <p className="mt-6 text-sm text-center text-muted-foreground">
            ¿No tienes cuenta? <Link to="/auth/register" className="text-brand hover:underline font-medium">Regístrate gratis</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
