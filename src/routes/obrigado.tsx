import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Mail,
  ShieldCheck,
  Download,
  Inbox,
  AlertCircle,
  Home,
  CheckCircle2,
} from "lucide-react";
import { buildCheckoutUrl } from "@/lib/utm";

/* ==========================================================================
   CONFIGURACIÓN DE ENLACES (FÁCIL EDICIÓN)
   ========================================================================== */

/** 1. URL del botón "Volver al inicio" */
export const HOME_URL = "/";

/** 2. Imagen de Confirmación */
export const THANK_YOU_IMAGE_URL = "/compra-confirmada.jpg";

/* ==========================================================================
   RUTA TANSTACK
   ========================================================================== */

export const Route = createFileRoute("/obrigado")({
  head: () => ({
    meta: [
      { title: "¡Compra Confirmada! — Seca Ayuno" },
      {
        name: "description",
        content:
          "Tu compra ha sido confirmada con éxito. Revisa tu correo electrónico para acceder a tu material digital.",
      },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: ObrigadoPage,
});

/* ==========================================================================
   COMPONENTE PRINCIPAL DE CONFIRMACIÓN / GRACIAS
   ========================================================================== */

function ObrigadoPage() {
  const [homeHref, setHomeHref] = useState(HOME_URL);

  useEffect(() => {
    setHomeHref(buildCheckoutUrl(HOME_URL));
  }, []);

  const confirmationPoints = [
    {
      title: "Acceso enviado por e-mail",
      desc: "Revisa el correo utilizado durante el proceso de pago.",
      icon: Mail,
    },
    {
      title: "Material digital",
      desc: "Disponible de forma inmediata para celular, tablet o PC.",
      icon: Download,
    },
    {
      title: "Compra segura",
      desc: "Transacción procesada y confirmada con encriptación SSL.",
      icon: ShieldCheck,
    },
    {
      title: "Revisa tu bandeja de entrada",
      desc: "En pocos minutos recibirás las indicaciones y datos de acceso.",
      icon: Inbox,
    },
  ];

  return (
    <div className="min-h-screen bg-[#fafbfc] text-[#0f172a] font-sans antialiased selection:bg-[#26B99A] selection:text-white">
      {/* 1. TOP BRAND HEADER (Exacto a la imagen de referencia: SECA AYUNO con 🔥 y barra verde #26B99A) */}
      <header className="bg-white border-b border-slate-100 sticky top-0 z-30 shadow-xs">
        <div className="max-w-xl mx-auto px-4 pt-3 pb-2 text-center">
          <div className="inline-flex items-center justify-center gap-2 mb-2">
            <span className="text-xl">🔥</span>
            <span className="font-extrabold tracking-wider text-base text-[#0f172a] font-['Plus_Jakarta_Sans',sans-serif]">
              SECA AYUNO
            </span>
          </div>

          {/* BARRA DE PROGRESO 100% VERDE TEAL (#26B99A) */}
          <div className="w-full bg-[#e6f7f3] h-2 rounded-full overflow-hidden relative">
            <div
              className="bg-[#26B99A] h-full rounded-full transition-all duration-500 ease-out"
              style={{ width: "100%" }}
            />
          </div>

          <div className="flex justify-between items-center text-[11px] font-semibold text-slate-500 mt-1.5 px-0.5">
            <span className="text-[#0d9488] font-bold">Proceso finalizado con éxito</span>
            <span className="text-slate-400 font-bold">100%</span>
          </div>
        </div>
      </header>

      {/* CONTENEDOR PRINCIPAL */}
      <main className="max-w-xl mx-auto px-4 pt-5 pb-14">
        
        {/* TARJETA PRINCIPAL BLANCA / CLEAN */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-[0_4px_24px_-4px_rgba(15,23,42,0.07)] p-4 sm:p-7">
          
          {/* BADGE DE CONFIRMACIÓN */}
          <div className="text-center mb-3">
            <span className="inline-flex items-center gap-1.5 bg-[#064e3b] text-amber-300 text-[11px] sm:text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-xs">
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
              Pedido completado con éxito
            </span>
          </div>

          {/* 1. HEADLINE (Estructura y fuentes de la referencia) */}
          <h1 className="text-2xl sm:text-3xl font-extrabold text-center text-[#0f172a] font-['Plus_Jakarta_Sans',sans-serif] tracking-tight leading-tight mb-2">
            Compra{" "}
            <span className="text-[#064e3b] underline decoration-amber-400 decoration-4 underline-offset-3">
              confirmada
            </span>
          </h1>

          {/* 2. SUBHEADLINE */}
          <p className="text-sm sm:text-base text-slate-700 text-center font-medium leading-relaxed max-w-lg mx-auto mb-3">
            Tu acceso será enviado al correo electrónico utilizado en la compra.
          </p>

          <div className="text-center text-xl mb-4">👇</div>

          {/* IMAGEN DE COMPRA CONFIRMADA */}
          <div className="relative rounded-2xl overflow-hidden border-2 border-[#064e3b]/20 shadow-lg bg-slate-900 mb-5">
            <img
              src={THANK_YOU_IMAGE_URL}
              alt="Compra Confirmada - Revisa tu correo para acceder a tu material"
              className="w-full h-auto object-cover max-h-[440px] block"
              loading="eager"
            />
          </div>

          {/* 3. BLOQUE PRINCIPAL */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 sm:p-4.5 mb-4 text-center">
            <div className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-[#064e3b] text-amber-300 mb-2">
              <Mail className="w-4 h-4" />
            </div>
            <p className="text-xs sm:text-sm text-slate-800 font-semibold leading-relaxed">
              Gracias por tu compra. En pocos minutos recibirás un e-mail con las instrucciones para acceder a tu material digital.
            </p>
          </div>

          {/* 4. BLOQUE DE ORIENTACIÓN (SPAM / PROMOCIONES) */}
          <div className="bg-amber-50 border-l-4 border-amber-500 rounded-r-xl p-3 sm:p-3.5 mb-5 flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <p className="text-xs sm:text-[13px] text-amber-950 font-semibold leading-snug">
              <span className="text-amber-800 uppercase font-extrabold">Consejo importante:</span> Si no encuentras el mensaje, revisa también la carpeta de spam, promociones o correo no deseado.
            </p>
          </div>

          {/* 5. LISTA CORTA */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-2.5 h-2.5 rounded-full bg-[#064e3b]"></div>
              <h2 className="text-sm sm:text-base font-extrabold text-[#0f172a] font-['Plus_Jakarta_Sans',sans-serif]">
                Detalles de tu acceso:
              </h2>
            </div>

            <div className="space-y-2">
              {confirmationPoints.map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={idx}
                    className="flex items-center justify-between gap-2.5 p-2.5 sm:p-3 rounded-xl bg-slate-50 border border-slate-200/80"
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-7 h-7 rounded-lg bg-[#064e3b] text-amber-300 flex items-center justify-center shrink-0">
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-xs sm:text-sm font-bold text-slate-800 block leading-tight">
                          {item.title}
                        </span>
                        <span className="text-[11px] text-slate-500 block leading-tight mt-0.5">
                          {item.desc}
                        </span>
                      </div>
                    </div>

                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#064e3b] bg-emerald-100/80 px-2 py-0.5 rounded-md shrink-0">
                      <CheckCircle2 className="w-3 h-3 text-[#064e3b]" />
                      Listo
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 6. BOTÓN OPCIONAL (VOLVER AL INICIO) */}
          <div className="mb-5 text-center">
            <a
              href={homeHref}
              id="cta-volver-inicio"
              className="inline-flex items-center justify-center gap-2 bg-[#064e3b] hover:bg-[#022c22] text-amber-300 font-bold text-sm sm:text-base py-3.5 px-6 rounded-xl border border-emerald-700/40 shadow-xs hover:shadow-md transition-all duration-200"
            >
              <Home className="w-4 h-4" />
              <span>Volver al inicio</span>
            </a>
          </div>

          {/* 7. MENSAJE FINAL */}
          <div className="border-t border-slate-100 pt-4 text-center">
            <p className="text-xs text-slate-600 font-medium leading-relaxed max-w-md mx-auto italic">
              “Gracias por confiar en nosotros. Esperamos que este material te ayude a avanzar con más claridad y constancia.”
            </p>
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
