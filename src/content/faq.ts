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
    answer: 'Desde tu teléfono Android, descargá el APK con el botón de esta página. Abrí el archivo descargado desde la notificación o la carpeta Descargas. Si Android solicita permiso para instalar aplicaciones desde esa fuente, habilitalo solo para el navegador o gestor de archivos que uses y volvé al archivo. Tocá Instalar y, al finalizar, abrí EcoAlerta. Podés desactivar ese permiso después. Los pasos pueden variar según el dispositivo y la versión de Android. Descargá el APK únicamente desde fuentes confiables y no desactives las protecciones de seguridad del dispositivo.',
  },
  {
    id: 'datos',
    question: '¿Qué información comparte un reporte?',
    answer: 'Un reporte incluye título, descripción, categoría, dirección y una foto obligatoria; también puede incluir ubicación. Quien lo creó puede consultarlo, pero no modificarlo una vez enviado. Un administrador revisa la foto y puede aceptar o rechazar el reporte. Si continúa el proceso, asigna la tarea a un agente de turno disponible cercano a la zona. Los reportes se conservan indefinidamente.',
  },
];
