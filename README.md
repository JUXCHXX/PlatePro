<div align="center">

<br/>

```
██████╗ ██╗      █████╗ ████████╗███████╗██████╗ ██████╗  ██████╗
██╔══██╗██║     ██╔══██╗╚══██╔══╝██╔════╝██╔══██╗██╔══██╗██╔═══██╗
██████╔╝██║     ███████║   ██║   █████╗  ██████╔╝██████╔╝██║   ██║
██╔═══╝ ██║     ██╔══██║   ██║   ██╔══╝  ██╔═══╝ ██╔══██╗██║   ██║
██║     ███████╗██║  ██║   ██║   ███████╗██║     ██║  ██║╚██████╔╝
╚═╝     ╚══════╝╚═╝  ╚═╝   ╚═╝   ╚══════╝╚═╝     ╚═╝  ╚═╝ ╚═════╝
```

### 🍽️ Tu restaurante merece una página que realmente venda.

**PlatePro** es la plataforma SaaS donde los dueños de restaurantes crean su landing page profesional en minutos — menú digital, ofertas, redes sociales, WhatsApp, Google Maps y más. Sin código. Sin complicaciones.

<br/>

[![Estado](https://img.shields.io/badge/estado-en%20desarrollo-orange?style=for-the-badge&logo=statuspage&logoColor=white)](https://platepro.app)
[![Versión](https://img.shields.io/badge/versión-0.1.0-E85D24?style=for-the-badge)](https://platepro.app)
[![Licencia](https://img.shields.io/badge/licencia-privada-red?style=for-the-badge&logo=shield&logoColor=white)](#)
[![Hecho en](https://img.shields.io/badge/Hecho%20en-Colombia%20🇨🇴-yellow?style=for-the-badge)](#)

<br/>

> 🚀 **Este es un proyecto SaaS en producción.** No está pensado para ser clonado y usado de forma independiente — es una plataforma de servicio que vive en [platepro.app](https://platepro.app). Este repositorio documenta su arquitectura, stack y evolución.

<br/>

---

</div>

## ✨ ¿Qué es PlatePro?

PlatePro es como **Canva + Webflow, pero diseñado exclusivamente para restaurantes**. Un dueño de restaurante entra, elige una de las 10 plantillas profesionales, carga su menú con fotos y precios, agrega sus ofertas y datos de contacto, y en minutos tiene **una landing page pública** lista para compartir con sus clientes.

Nada de contratar un desarrollador. Nada de pagar miles por una web. Solo resultados.

```
Dueño del restaurante  →  Elige plantilla  →  Llena su info  →  Publica  →  Comparte el link  🎉
```

<br/>

## 🎯 Para quién es

| 👤 Usuario | 💡 Qué logra con PlatePro |
|-----------|--------------------------|
| Restaurante pequeño | Primera presencia web profesional sin invertir en desarrollo |
| Foodtruck o negocio móvil | Menú digital listo para compartir por WhatsApp al instante |
| Cadena local | Múltiples páginas por sucursal, cada una con su propia URL |
| Cafetería o panadería | Vitrina digital con fotos de productos y horarios actualizados |

<br/>

## 🔥 Features principales

<table>
<tr>
<td width="50%">

**🎨 10 plantillas diseñadas a medida**
Cada template tiene identidad propia: oscura y dramática para asaderos, fresca y verde para comida saludable, dorada y elegante para restaurantes latinos, etc.

**🍽️ Menú digital completo**
Categorías, fotos, precios, descripciones, badges de "Nuevo" y "Destacado", filtros por disponibilidad.

**📣 Ofertas que llaman la atención**
Banners de descuento, 2x1, countdown timer para promociones con fecha límite.

**🚀 Deploy con un clic**
Preview en tiempo real → Publica → Tu URL queda activa al instante.

</td>
<td width="50%">

**📱 WhatsApp, redes y mapas integrados**
Botón flotante de WhatsApp, links a Facebook, Instagram, TikTok, Google Maps, todo desde el mismo panel.

**🕐 Horarios dinámicos**
Configura tus horarios por día y la landing muestra automáticamente si estás "Abierto ahora" o "Cerrado".

**📸 Gestión de imágenes**
Sube fotos de platos, logo y portada. Compresión automática para que cargue rápido.

**🔗 URL personalizada**
Cada restaurante tiene su propio slug: `platepro.app/r/tu-restaurante`

</td>
</tr>
</table>

<br/>

## 🛠️ Stack tecnológico

<div align="center">

### Frontend
[![Next.js](https://img.shields.io/badge/Next.js%2014-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Framer Motion](https://img.shields.io/badge/Framer%20Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)](https://framer.com/motion)

### Backend & Infra
[![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://postgresql.org)
[![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com)

### UI & Estado
[![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-18181B?style=for-the-badge&logo=shadcnui&logoColor=white)](https://ui.shadcn.com)
[![Zustand](https://img.shields.io/badge/Zustand-433E38?style=for-the-badge&logo=react&logoColor=white)](https://zustand-demo.pmnd.rs)
[![Lucide](https://img.shields.io/badge/Lucide%20Icons-F56565?style=for-the-badge&logo=lucide&logoColor=white)](https://lucide.dev)

</div>

<br/>

## 🏗️ Arquitectura en 30 segundos

```
platepro.app/                  → Landing de marketing (Next.js)
platepro.app/dashboard/        → Panel del restaurante (autenticado)
platepro.app/dashboard/editor  → Editor visual con preview en tiempo real
platepro.app/dashboard/menu    → Gestor de productos y categorías
platepro.app/dashboard/offers  → Gestor de ofertas y descuentos
platepro.app/r/[slug]          → Landing pública del restaurante (ISR)
```

```
┌─────────────────────────────────────────────────────┐
│                  Dueño del restaurante               │
│              dashboard.platepro.app                  │
└──────────────────────┬──────────────────────────────┘
                       │ edita y publica
                       ▼
┌─────────────────────────────────────────────────────┐
│              Supabase (DB + Auth + Storage)          │
│   restaurants | menu_items | offers | categories     │
└──────────────────────┬──────────────────────────────┘
                       │ ISR (revalida c/60s)
                       ▼
┌─────────────────────────────────────────────────────┐
│          platepro.app/r/mi-restaurante               │
│     Landing pública · mobile-first · SEO-ready       │
│   WhatsApp · Maps · Menú digital · Ofertas activas   │
└─────────────────────────────────────────────────────┘
                       │ visita
                       ▼
                 🧑‍🍳 Cliente final
```

<br/>

## 🎨 Las 10 plantillas

| # | Nombre | Estilo | Para quién |
|---|--------|--------|------------|
| 1 | 🔥 **Brasa & Fuego** | Oscuro, rojo fuego | Asaderos, parrillas, carnes |
| 2 | 🥗 **Fresco Market** | Blanco, verde vivo | Ensaladas, saludable, vegano |
| 3 | ✨ **Noche Latina** | Negro y dorado | Restaurantes elegantes |
| 4 | ⬛ **Minimal Bites** | Blanco puro, tipografía | Cafés, sandwicherías |
| 5 | 🌮 **Street Food** | Amarillo y negro | Comidas rápidas, foodtrucks |
| 6 | 🌊 **Mar y Tierra** | Azul marino, turquesa | Mariscos, pescados, ceviche |
| 7 | 🍕 **Pizzeria Italiana** | Rojo tomate, serifa | Pizzerías, pasta |
| 8 | ☕ **Café de Autor** | Beige y café oscuro | Cafeterías especializadas |
| 9 | 🥑 **Fast & Fresh** | Naranja y blanco | Wraps, bowls, rápido y sano |
| 10 | 🍲 **Cocina Tradicional** | Terracota y crema | Comida casera, local |

<br/>

## 📸 Screenshots

> *(Coming soon — en desarrollo activo* 🚧*)*

<br/>

## 🗺️ Roadmap

- [x] 🏗️ Arquitectura base y diseño del sistema
- [ ] 🔐 Autenticación con Supabase Auth
- [ ] 🎨 Editor visual con 10 plantillas
- [ ] 🍽️ Gestión de menú y categorías
- [ ] 📣 Módulo de ofertas y descuentos
- [ ] 🚀 Sistema de publicación con ISR
- [ ] 📱 Landing pública SEO-ready
- [ ] 🔗 Integración WhatsApp + redes sociales
- [ ] 🌐 Soporte para dominio personalizado *(v2)*
- [ ] 📊 Panel de analíticas básicas *(v2)*
- [ ] 🛒 Módulo de pedidos por WhatsApp *(v2)*
- [ ] 🖨️ Generador de menú QR imprimible *(v2)*

<br/>

## 💼 Modelo de servicio

PlatePro funciona como un **SaaS** — los restaurantes pagan una suscripción mensual por tener su página activa, y nosotros nos encargamos del hosting, actualizaciones, seguridad y soporte.

```
Plan Gratis      →  1 plantilla, URL platepro.app/r/..., con branding
Plan Pro         →  Todas las plantillas, sin branding, analytics
Plan Business    →  Dominio propio, soporte prioritario, múltiples sucursales
```

<br/>

## 👨‍💻 Sobre el proyecto

PlatePro nació de una idea simple: **el dueño de una picada en Barranquilla merece una página tan buena como la de cualquier cadena internacional**, pero sin necesitar presupuesto de corporación ni conocimientos técnicos.

Construido con ❤️ desde Colombia 🇨🇴 para toda Latinoamérica.

<br/>

---

<div align="center">

**¿Tienes un restaurante y quieres tu página?**

[![Visitar PlatePro](https://img.shields.io/badge/🍽️%20Ir%20a%20platepro.app-E85D24?style=for-the-badge)](https://platepro.app)

<br/>

*© 2025 PlatePro · Todos los derechos reservados*

</div>