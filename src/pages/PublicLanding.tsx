import { useParams, Link } from "react-router-dom";
import { useApp } from "@/store/useApp";
import { TemplateRenderer } from "@/templates/TemplateRenderer";
import { useEffect } from "react";

export default function PublicLanding() {
  const { slug } = useParams();
  const data = useApp((s) => (slug ? s.getBySlug(slug) : null));
  const isPreview = new URLSearchParams(window.location.search).get("preview") === "1";

  useEffect(() => {
    if (data) {
      document.title = `${data.restaurant.name} | Menú digital`;
      const desc = data.restaurant.description || "";
      let meta = document.querySelector('meta[name="description"]');
      if (!meta) { meta = document.createElement("meta"); meta.setAttribute("name", "description"); document.head.appendChild(meta); }
      meta.setAttribute("content", desc);
    }
    return () => { document.title = "PlatePro"; };
  }, [data]);

  if (!data) {
    return (
      <div className="min-h-screen grid place-items-center bg-background p-6">
        <div className="text-center">
          <div className="text-6xl mb-4">🍽️</div>
          <h1 className="font-display text-3xl font-bold">Página no encontrada</h1>
          <p className="text-muted-foreground mt-2">Esta página aún no existe o fue removida.</p>
          <Link to="/" className="inline-block mt-6 px-6 py-3 rounded-full bg-gradient-brand text-white font-semibold">Crear mi página gratis</Link>
        </div>
      </div>
    );
  }

  if (!data.restaurant.is_published && !isPreview) {
    return (
      <div className="min-h-screen grid place-items-center bg-background p-6">
        <div className="text-center">
          <div className="text-6xl mb-4">🚧</div>
          <h1 className="font-display text-3xl font-bold">Esta página aún no está disponible</h1>
          <p className="text-muted-foreground mt-2">El restaurante todavía no ha publicado su página.</p>
        </div>
      </div>
    );
  }

  return <TemplateRenderer data={data} />;
}
