import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useApp } from "@/store/useApp";
import { toast } from "sonner";
import { ArrowLeft, Sparkles } from "lucide-react";

export default function Register() {
  const nav = useNavigate();
  const register = useApp((s) => s.register);
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password || !city) { toast.error("Completa todos los campos"); return; }
    register(name, email, password, city);
    toast.success("¡Cuenta creada! Bienvenido a PlatePro");
    nav("/dashboard");
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="hidden lg:flex relative bg-gradient-hero p-12 flex-col justify-between">
        <Link to="/" className="flex items-center gap-2 relative z-10">
          <div className="h-9 w-9 rounded-lg bg-gradient-brand grid place-items-center text-primary-foreground font-bold">P</div>
          <span className="font-display text-2xl font-bold">PlatePro</span>
        </Link>
        <div className="relative z-10 space-y-6">
          <Sparkles className="h-16 w-16 text-brand" />
          <h2 className="font-display text-4xl font-bold leading-tight max-w-md">
            Tu landing page lista <br />en menos de 10 minutos.
          </h2>
          <ul className="space-y-3 text-muted-foreground">
            <li className="flex items-center gap-2">✓ 10 plantillas hermosas</li>
            <li className="flex items-center gap-2">✓ Menú digital con fotos</li>
            <li className="flex items-center gap-2">✓ Ofertas que convierten</li>
            <li className="flex items-center gap-2">✓ 100% gratis para siempre</li>
          </ul>
        </div>
        <div className="relative z-10 text-sm text-muted-foreground">© 2026 PlatePro</div>
      </div>

      <div className="flex flex-col p-8 md:p-12 justify-center bg-background">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 lg:hidden">
          <ArrowLeft className="h-4 w-4" /> Volver
        </Link>
        <div className="max-w-sm w-full mx-auto">
          <h1 className="font-display text-3xl font-bold">Crea tu cuenta gratis</h1>
          <p className="mt-2 text-muted-foreground">Sin tarjeta de crédito. Sin trampas.</p>

          <form onSubmit={submit} className="mt-8 space-y-4">
            <div>
              <Label htmlFor="name">Nombre del restaurante</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="La Cosecha" className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="city">Ciudad</Label>
              <Input id="city" value={city} onChange={(e) => setCity(e.target.value)} placeholder="Bogotá" className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="hola@tu-restaurante.com" className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="password">Contraseña</Label>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Mínimo 6 caracteres" className="mt-1.5" />
            </div>
            <Button type="submit" className="w-full bg-gradient-brand hover:opacity-90 h-11">Crear cuenta gratis →</Button>
          </form>

          <p className="mt-6 text-sm text-center text-muted-foreground">
            ¿Ya tienes cuenta? <Link to="/auth/login" className="text-brand hover:underline font-medium">Inicia sesión</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
