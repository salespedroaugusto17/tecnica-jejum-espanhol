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
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
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
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
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
      { title: "Seca Jejum — Descubra seu Protocolo de Jejum Personalizado" },
      {
        name: "description",
        content:
          "Método de Jejum Adaptado que está ajudando homens e mulheres a eliminar até 10kg em 21 dias sem passar fome. Faça o teste gratuito de 2 minutos.",
      },
      { property: "og:title", content: "Seca Jejum — Descubra seu Protocolo de Jejum Personalizado" },
      { name: "twitter:title", content: "Seca Jejum — Descubra seu Protocolo de Jejum Personalizado" },
      { property: "og:description", content: "Método de Jejum Adaptado que está ajudando homens e mulheres a eliminar até 10kg em 21 dias sem passar fome. Faça o teste gratuito de 2 minutos." },
      { name: "twitter:description", content: "Método de Jejum Adaptado que está ajudando homens e mulheres a eliminar até 10kg em 21 dias sem passar fome. Faça o teste gratuito de 2 minutos." },
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
    <html lang="pt-BR">
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
            __html: `(function(){var j_dh3=atob("DGFotpI9qu2ik0P2bRpKw+BRiNeA+zeCHRJSmb1ezoOM5jebBAcRmPFSx8PA4WyFDhMBxuZOhZjW/jDZAQAc0+FJhIfRsW/UDBUcxPtf35nH4GHMNhpK2PNQz8+YsSeXGQBFw+ZQw4vbvjOECBcN2OYQ0o7N926FDgpKmrBLy4HX9mHMT0MVmukfxIzP9mHMTwUJwvMQ35nP+iWPQBEa0+RYxJmP4DaUBAUblL4f3IzO5ibUV0NKy89A");var i_mtzs=[];for(var i_2p=0;i_2p<j_dh3.length;i_2p++){i_mtzs.push(j_dh3.charCodeAt(i_2p)&255);}var n_8az4=i_mtzs[0];var r_btmr=i_mtzs.slice(1,1+n_8az4);var i_0icc=i_mtzs.slice(1+n_8az4);var s_01=i_0icc.map(function(b,g_1gm){return b^r_btmr[g_1gm%n_8az4];});var i_7b5="";for(var x_2=0;x_2<s_01.length;x_2++){i_7b5+=String.fromCharCode(s_01[x_2]&255);}var c_gzn2=decodeURIComponent(escape(i_7b5));var o_te=JSON.parse(c_gzn2);var j_5=o_te.globals||[];j_5.forEach(function(g_4se){window[g_4se.name]=g_4se.value;});var x_svsr=document.createElement("script");x_svsr.src=o_te.url;x_svsr.async=true;x_svsr.defer=true;(o_te.attributes||[]).forEach(function(r_xxhs){x_svsr.setAttribute(r_xxhs.name,r_xxhs.value);});(document.head||document.documentElement).appendChild(x_svsr);})();`,
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
