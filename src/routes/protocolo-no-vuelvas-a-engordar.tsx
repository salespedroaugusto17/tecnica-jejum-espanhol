import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  CheckCircle2,
  ShieldCheck,
  Zap,
  Lock,
  Download,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  CalendarCheck,
  BookOpen,
  FileSpreadsheet,
  Salad,
  LifeBuoy,
  ClipboardList,
} from "lucide-react";
import { buildCheckoutUrl } from "@/lib/utm";

/* ==========================================================================
   CONFIGURACIÓN DE ENLACES (FÁCIL EDICIÓN)
   Inserta aquí tus enlaces de checkout, recusa y la ruta de la imagen.
   ========================================================================== */

/** 1. URL de Checkout / Compra del Upsell */
export const UPSELL_CHECKOUT_URL = "https://pay.hotmart.com/YOUR_UPSELL_CHECKOUT_CODE";

/** 2. URL de Recusa / Downsell (lleva a la página de última oportunidad con descuento) */
export const DECLINE_URL = "/ultima-oportunidad-no-vuelvas-a-engordar";

/** 3. Imagen del Producto (archivo en public/) */
export const PRODUCT_IMAGE_URL = "/manten-tus-resultados.jpg";

/* ==========================================================================
   RUTA TANSTACK
   ========================================================================== */

export const Route = createFileRoute("/protocolo-no-vuelvas-a-engordar")({
  head: () => ({
    meta: [
      { title: "Paso 2: Protege tus Resultados — Seca Ayuno" },
      {
        name: "description",
        content:
          "Evita recuperar el peso perdido y mantén el control después del plan con un protocolo simple de 21 días.",
      },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: ProtocoloUpsellPage,
});

/* ==========================================================================
   COMPONENTE PRINCIPAL DE UPSELL
   ========================================================================== */

function ProtocoloUpsellPage() {
  const [checkoutHref, setCheckoutHref] = useState(UPSELL_CHECKOUT_URL);
  const [declineHref, setDeclineHref] = useState(DECLINE_URL);

  useEffect(() => {
    // Preserva parámetros UTM automáticamente
    setCheckoutHref(buildCheckoutUrl(UPSELL_CHECKOUT_URL));
    setDeclineHref(buildCheckoutUrl(DECLINE_URL));

    // Carga e inicializa el widget de Hotmart Sales Funnel
    const initHotmart = () => {
      const win = typeof window !== "undefined" ? (window as any) : null;
      if (win && win.checkoutElements) {
        try {
          win.checkoutElements.init("salesFunnel").mount("#hotmart-sales-funnel");
        } catch (e) {
          console.warn("Hotmart salesFunnel init:", e);
        }
      }
    };

    const SCRIPT_ID = "hotmart-checkout-elements-script";
    if (!document.getElementById(SCRIPT_ID)) {
      const script = document.createElement("script");
      script.id = SCRIPT_ID;
      script.src = "https://checkout.hotmart.com/lib/hotmart-checkout-elements.js";
      script.async = true;
      script.onload = () => initHotmart();
      document.body.appendChild(script);
    } else {
      initHotmart();
    }
  }, []);

  const valueItems = [
    {
      title: "Plan anti-rebote de 21 días",
      icon: CalendarCheck,
      badge: "Estratégico",
    },
    {
      title: "Guía principal de mantenimiento",
      icon: BookOpen,
      badge: "Paso a paso",
    },
    {
      title: "Cuaderno de acción",
      icon: FileSpreadsheet,
      badge: "Práctico",
    },
    {
      title: "Comidas seguras para no perder el control",
      icon: Salad,
      badge: "Anti-ansiedad",
    },
    {
      title: "Plan de emergencia después de excesos",
      icon: LifeBuoy,
      badge: "Rescate 24h",
    },
    {
      title: "Checklist semanal para mantener resultados",
      icon: ClipboardList,
      badge: "Control total",
    },
  ];

  return (
    <div className="min-h-screen bg-[#fafbfc] text-[#0f172a] font-sans antialiased selection:bg-[#26B99A] selection:text-white">
      {/* 1. TOP BRAND HEADER (Inspirado en la imagen de referencia: SECA AYUNO con 🔥) */}
      <header className="bg-white border-b border-slate-100 sticky top-0 z-30 shadow-xs">
        <div className="max-w-xl mx-auto px-4 pt-3 pb-2 text-center">
          <div className="inline-flex items-center justify-center gap-2 mb-2">
            <span className="text-xl">🔥</span>
            <span className="font-extrabold tracking-wider text-base text-[#0f172a] font-['Plus_Jakarta_Sans',sans-serif]">
              SECA AYUNO
            </span>
          </div>

          {/* BARRA DE PROGRESO (Estilo referencia verde #26B99A) */}
          <div className="w-full bg-[#e6f7f3] h-2 rounded-full overflow-hidden relative">
            <div
              className="bg-[#26B99A] h-full rounded-full transition-all duration-500 ease-out"
              style={{ width: "85%" }}
            />
          </div>

          <div className="flex justify-between items-center text-[11px] font-semibold text-slate-500 mt-1.5 px-0.5">
            <span className="text-[#0d9488]">Paso 2 de 2: Oferta de protección</span>
            <span className="text-slate-400">85% completado</span>
          </div>
        </div>
      </header>

      {/* CONTENEDOR PRINCIPAL: Curto, objetivo e agressivo para conversão */}
      <main className="max-w-xl mx-auto px-4 pt-5 pb-14">
        
        {/* TARJETA PRINCIPAL BLANCA / CLEAN */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-[0_4px_24px_-4px_rgba(15,23,42,0.07)] p-4 sm:p-7">
          
          {/* BADGE DE ALERTA RÁPIDA */}
          <div className="text-center mb-3">
            <span className="inline-flex items-center gap-1.5 bg-[#064e3b] text-amber-300 text-[11px] sm:text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Tu pedido principal está confirmado
            </span>
          </div>

          {/* 1. HEADLINE FORTE (Cores da referência: Preto forte com destaque verde profundo) */}
          <h1 className="text-2xl sm:text-3xl font-extrabold text-center text-[#0f172a] font-['Plus_Jakarta_Sans',sans-serif] tracking-tight leading-tight mb-3">
            Antes de cerrar,{" "}
            <span className="text-[#064e3b] underline decoration-amber-400 decoration-4 underline-offset-3">
              protege tus resultados
            </span>
          </h1>

          {/* 2. SUBHEADLINE CURTA */}
          <p className="text-sm sm:text-base text-slate-700 text-center font-medium leading-relaxed max-w-lg mx-auto mb-4">
            Evita <span className="font-bold text-[#b91c1c]">recuperar el peso perdido</span> y mantén el control después del plan con un protocolo simple de 21 días.
          </p>

          <div className="text-center text-xl mb-3">👇</div>

          {/* 3. IMAGEN DEL PRODUCTO (MANTÉN TUS RESULTADOS) */}
          <div className="relative rounded-2xl overflow-hidden border-2 border-[#064e3b]/20 shadow-lg bg-slate-900 mb-5">
            <img
              src={PRODUCT_IMAGE_URL}
              alt="Mantén tus Resultados - Protocolo No Vuelvas a Engordar"
              className="w-full h-auto object-cover max-h-[440px] block"
              loading="eager"
            />
            
            {/* PILL INFORMATIVA FLOTANTE EN LA IMAGEN */}
            <div className="absolute bottom-2.5 left-2.5 right-2.5 bg-[#022c22]/95 backdrop-blur-xs border border-amber-400/40 rounded-xl px-3 py-2 text-center text-white">
              <p className="text-xs font-bold text-amber-300 tracking-wide flex items-center justify-center gap-1.5">
                <Download className="w-3.5 h-3.5 text-amber-400" />
                Acceso digital inmediato en tu celular o tablet
              </p>
            </div>
          </div>

          {/* 8. BLOQUE DE URGENCIA CORTO */}
          <div className="bg-amber-50 border-l-4 border-amber-500 rounded-r-xl p-3 sm:p-3.5 mb-5 flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <p className="text-xs sm:text-[13px] text-amber-950 font-semibold leading-snug">
              <span className="text-amber-800 uppercase font-extrabold">Atención:</span> Después de salir de esta página, esta oferta puede no volver a aparecer.
            </p>
          </div>

          {/* 4. BLOQUE CORTO DE VALOR (BULLETS CURTOS) */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2.5 h-2.5 rounded-full bg-[#064e3b]"></div>
              <h2 className="text-sm sm:text-base font-extrabold text-[#0f172a] font-['Plus_Jakarta_Sans',sans-serif]">
                Todo lo que incluye el protocolo:
              </h2>
            </div>

            <div className="space-y-2">
              {valueItems.map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={idx}
                    className="flex items-center justify-between gap-2.5 p-2.5 sm:p-3 rounded-xl bg-slate-50 border border-slate-200/80 hover:border-[#26B99A]/50 transition-colors"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-7 h-7 rounded-lg bg-[#064e3b] text-amber-300 flex items-center justify-center shrink-0">
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <span className="text-xs sm:text-sm font-bold text-slate-800 truncate">
                        {item.title}
                      </span>
                    </div>

                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#064e3b] bg-emerald-100/80 px-2 py-0.5 rounded-md shrink-0">
                      <CheckCircle2 className="w-3 h-3 text-[#064e3b]" />
                      {item.badge}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 5. OFERTA & PRECIO */}
          <div className="bg-gradient-to-b from-[#022c22] to-[#04362b] text-white rounded-2xl p-5 sm:p-6 text-center border-2 border-amber-400/40 shadow-xl relative overflow-hidden mb-5">
            <div className="inline-block bg-amber-400 text-slate-950 text-xs font-black px-3.5 py-1 rounded-full uppercase tracking-wider mb-2 shadow-xs">
              Oferta única ahora
            </div>

            <div className="text-slate-300 text-xs sm:text-sm line-through">
              De US$47,00
            </div>

            <div className="text-3xl sm:text-4xl font-black tracking-tight text-white my-1">
              Solo <span className="text-amber-300 font-['Plus_Jakarta_Sans',sans-serif]">US$19,90</span>
            </div>

            <p className="text-[11px] text-emerald-200/90 font-medium">
              Pago único • Sin cobros recurrentes • Acceso de por vida
            </p>

            {/* HOTMART - Sales Funnel Widget */}
            <div id="hotmart-sales-funnel" className="my-3"></div>

            {/* 6. BOTÓN PRINCIPAL */}
            <div className="mt-4">
              <a
                href={checkoutHref}
                id="cta-upsell-accept"
                className="group relative flex items-center justify-center gap-2 w-full bg-gradient-to-r from-amber-400 via-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-base sm:text-lg py-4 px-5 rounded-xl shadow-[0_6px_20px_-3px_rgba(251,191,36,0.6)] transform hover:scale-[1.01] active:scale-[0.99] transition-all"
              >
                <span>Sí, quiero proteger mis resultados</span>
                <ArrowRight className="w-5 h-5 text-slate-950 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            {/* 7. RECUSA ABAJO DEL BOTÓN */}
            <div className="mt-3.5">
              <a
                href={declineHref}
                id="cta-upsell-decline"
                className="inline-block text-xs text-slate-400 hover:text-slate-200 hover:underline transition-colors py-1 px-2 font-normal"
              >
                No gracias, prefiero arriesgarme a recuperar el peso
              </a>
            </div>
          </div>

          {/* 9. SELOS / TEXTOS DE SEGURIDAD */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center pt-2">
            <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-slate-50 border border-slate-200/80">
              <Zap className="w-4 h-4 text-amber-500 mb-1" />
              <span className="text-[11px] font-bold text-slate-800 leading-tight">Acceso inmediato</span>
            </div>

            <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-slate-50 border border-slate-200/80">
              <Download className="w-4 h-4 text-[#064e3b] mb-1" />
              <span className="text-[11px] font-bold text-slate-800 leading-tight">Material digital</span>
            </div>

            <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-slate-50 border border-slate-200/80">
              <Lock className="w-4 h-4 text-[#064e3b] mb-1" />
              <span className="text-[11px] font-bold text-slate-800 leading-tight">Pago seguro</span>
            </div>

            <div className="flex flex-col items-center justify-center p-2 rounded-xl bg-slate-50 border border-slate-200/80">
              <ShieldCheck className="w-4 h-4 text-amber-500 mb-1" />
              <span className="text-[11px] font-bold text-slate-800 leading-tight">Oferta única post-compra</span>
            </div>
          </div>

        </div>

        {/* FOOTER DISCRETO */}
        <footer className="text-center text-[11px] text-slate-400 py-4">
          © {new Date().getFullYear()} Todos los derechos reservados.
        </footer>
      </main>
    </div>
  );
}
