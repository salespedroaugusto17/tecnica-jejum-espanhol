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
  Flame,
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
   Inserta aquí el enlace de compra del downsell y la URL final si rechaza.
   ========================================================================== */

/** 1. URL de Checkout / Compra del Downsell ($9,90) */
export const DOWNSELL_CHECKOUT_URL = "https://pay.hotmart.com/YOUR_DOWNSELL_CHECKOUT_CODE";

/** 2. URL de Recusa Final / Página de Agradecimiento o Entrega del producto principal */
export const DECLINE_URL = "/obrigado";

/** 3. Imagen del Producto (mismo mockup del upsell) */
export const PRODUCT_IMAGE_URL = "/manten-tus-resultados.jpg";

/* ==========================================================================
   RUTA TANSTACK
   ========================================================================== */

export const Route = createFileRoute("/ultima-oportunidad-no-vuelvas-a-engordar")({
  head: () => ({
    meta: [
      { title: "Última Oportunidad — Protocolo No Vuelvas a Engordar" },
      {
        name: "description",
        content:
          "Accede al Protocolo No Vuelvas a Engordar por solo US$9,90 y protege tus resultados después del plan.",
      },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: ProtocoloDownsellPage,
});

/* ==========================================================================
   COMPONENTE PRINCIPAL DE DOWNSELL
   ========================================================================== */

function ProtocoloDownsellPage() {
  const [checkoutHref, setCheckoutHref] = useState(DOWNSELL_CHECKOUT_URL);
  const [declineHref, setDeclineHref] = useState(DECLINE_URL);

  useEffect(() => {
    // Preserva parámetros UTM automáticamente
    setCheckoutHref(buildCheckoutUrl(DOWNSELL_CHECKOUT_URL));
    setDeclineHref(buildCheckoutUrl(DECLINE_URL));
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
      title: "Comidas seguras para mantener el control",
      icon: Salad,
      badge: "Anti-ansiedad",
    },
    {
      title: "Plan de emergencia después de excesos",
      icon: LifeBuoy,
      badge: "Rescate 24h",
    },
    {
      title: "Checklist semanal para sostener tus resultados",
      icon: ClipboardList,
      badge: "Control total",
    },
  ];

  return (
    <div className="min-h-screen bg-[#fafbfc] text-[#0f172a] font-sans antialiased selection:bg-[#b91c1c] selection:text-white">
      {/* 1. TOP BRAND HEADER: URGENCIA MÁXIMA / ÚLTIMA CHANCE */}
      <header className="bg-white border-b border-rose-100 sticky top-0 z-30 shadow-xs">
        <div className="max-w-xl mx-auto px-4 pt-3 pb-2 text-center">
          <div className="inline-flex items-center justify-center gap-2 mb-2">
            <span className="text-xl">🔥</span>
            <span className="font-extrabold tracking-wider text-base text-[#0f172a] font-['Plus_Jakarta_Sans',sans-serif]">
              SECA AYUNO
            </span>
          </div>

          {/* BARRA DE PROGRESO FINAL (95%) */}
          <div className="w-full bg-rose-100 h-2 rounded-full overflow-hidden relative">
            <div
              className="bg-[#b91c1c] h-full rounded-full transition-all duration-500 ease-out"
              style={{ width: "95%" }}
            />
          </div>

          <div className="flex justify-between items-center text-[11px] font-semibold text-slate-500 mt-1.5 px-0.5">
            <span className="text-[#b91c1c] font-bold uppercase tracking-wide">Último aviso antes de salir</span>
            <span className="text-slate-400">95% completado</span>
          </div>
        </div>
      </header>

      {/* CONTENEDOR PRINCIPAL */}
      <main className="max-w-xl mx-auto px-4 pt-5 pb-14">
        
        {/* TARJETA PRINCIPAL BLANCA / CLEAN */}
        <div className="bg-white rounded-2xl border border-rose-200/90 shadow-[0_4px_24px_-4px_rgba(185,28,28,0.1)] p-4 sm:p-7">
          
          {/* BADGE DE DESCUENTO FINAL */}
          <div className="text-center mb-3">
            <span className="inline-flex items-center gap-1.5 bg-[#7f1d1d] text-rose-100 text-[11px] sm:text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-xs">
              <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              Descuento especial de salida
            </span>
          </div>

          {/* 1. HEADLINE */}
          <h1 className="text-2xl sm:text-3xl font-extrabold text-center text-[#0f172a] font-['Plus_Jakarta_Sans',sans-serif] tracking-tight leading-tight mb-3">
            Última oportunidad{" "}
            <span className="text-[#b91c1c] underline decoration-amber-400 decoration-4 underline-offset-3">
              antes de salir
            </span>
          </h1>

          {/* 2. SUBHEADLINE */}
          <p className="text-sm sm:text-base text-slate-700 text-center font-medium leading-relaxed max-w-lg mx-auto mb-4">
            Accede al <span className="font-bold text-[#064e3b]">Protocolo No Vuelvas a Engordar</span> por{" "}
            <span className="font-black text-[#b91c1c] bg-rose-50 px-1.5 py-0.5 rounded">solo US$9,90</span>{" "}
            y protege tus resultados después del plan.
          </p>

          <div className="text-center text-xl mb-3">👇</div>

          {/* 3. IMAGEN DEL PRODUCTO */}
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

          {/* TEXTO DE URGENCIA */}
          <div className="bg-rose-50 border-l-4 border-rose-600 rounded-r-xl p-3 sm:p-3.5 mb-5 flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <p className="text-xs sm:text-[13px] text-rose-950 font-semibold leading-snug">
              <span className="text-rose-700 uppercase font-extrabold">Importante:</span> Esta oferta especial solo aparece una vez. Si sales ahora, podrías perder este precio.
            </p>
          </div>

          {/* 4. BLOQUE DE VALOR */}
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

          {/* 5. PRECIO ESPECIAL DE DOWNSELL: US$9,90 */}
          <div className="bg-gradient-to-b from-[#022c22] to-[#04362b] text-white rounded-2xl p-5 sm:p-6 text-center border-2 border-amber-400/50 shadow-xl relative overflow-hidden mb-5">
            <div className="inline-block bg-rose-600 text-white text-xs font-black px-3.5 py-1 rounded-full uppercase tracking-wider mb-2 shadow-xs">
              Último precio de salida
            </div>

            <div className="text-slate-300 text-xs sm:text-sm line-through">
              Antes: US$19,90
            </div>

            <div className="text-3xl sm:text-4xl font-black tracking-tight text-white my-1">
              Ahora: <span className="text-amber-300 font-['Plus_Jakarta_Sans',sans-serif]">solo US$9,90</span>
            </div>

            <p className="text-[11px] text-emerald-200/90 font-medium">
              Pago único • Sin cobros recurrentes • Acceso de por vida
            </p>

            {/* 6. BOTÓN PRINCIPAL */}
            <div className="mt-5">
              <a
                href={checkoutHref}
                id="cta-downsell-accept"
                className="group relative flex items-center justify-center gap-2 w-full bg-gradient-to-r from-amber-400 via-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-base sm:text-lg py-4 px-5 rounded-xl shadow-[0_6px_20px_-3px_rgba(251,191,36,0.6)] transform hover:scale-[1.01] active:scale-[0.99] transition-all"
              >
                <span>Sí, quiero aprovechar esta oferta</span>
                <ArrowRight className="w-5 h-5 text-slate-950 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            {/* 7. RECUSA ABAJO DEL BOTÓN */}
            <div className="mt-3.5">
              <a
                href={declineHref}
                id="cta-downsell-decline"
                className="inline-block text-xs text-slate-400 hover:text-slate-200 hover:underline transition-colors py-1 px-2 font-normal"
              >
                No gracias, renuncio a esta oferta especial
              </a>
            </div>
          </div>

          {/* BLOQUE FINAL CORTO */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-3.5 text-center mb-5">
            <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
              Ya diste el primer paso con tu plan. Esta es tu última oportunidad de llevar también el protocolo que te ayuda a no volver al punto de inicio.
            </p>
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
              <span className="text-[11px] font-bold text-slate-800 leading-tight">Última oportunidad</span>
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
