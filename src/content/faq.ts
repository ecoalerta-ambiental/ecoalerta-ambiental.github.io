import type { Faq } from '../types/content';

export const faq: readonly Faq[] = [
  {
    id: 'reportes',
    question: '¿Qué puedo reportar?',
    answer: 'En la pantalla de reporte se muestran las categorías microbasural, foco de dengue, terreno baldío y otro.',
  },
  {
    id: 'ecotienda',
    question: '¿Cómo funciona EcoTienda?',
    answer: 'Cuando un agente de campo valida que un reporte es real y avisa al administrador, se asignan Ecopuntos. Con ellos podés canjear productos; al confirmar el canje recibís un código para retirar los productos en un punto de entrega municipal. El código tiene una vigencia de 30 días desde la compra. La disponibilidad y las condiciones se consultan en la app.',
  },
  {
    id: 'instalacion',
    question: '¿Cómo instalo el APK?',
    answer: 'Las instrucciones de instalación se publicarán cuando estén disponibles y verificadas.',
  },
  {
    id: 'datos',
    question: '¿Qué información comparte un reporte?',
    answer: 'Un reporte incluye título, descripción, categoría, dirección y una foto obligatoria; también puede incluir ubicación. Quien lo creó puede consultarlo, pero no modificarlo una vez enviado. Un administrador revisa la foto y puede aceptar o rechazar el reporte. Si continúa el proceso, asigna la tarea a un agente de turno disponible cercano a la zona. Los reportes se conservan indefinidamente.',
  },
];
