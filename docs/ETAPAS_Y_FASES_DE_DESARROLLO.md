# Etapas y fases de desarrollo: landing de EcoAlerta

Este plan organiza el trabajo según la [especificación técnica de la landing](../ESPECIFICACION_TECNICA.md) y la documentación interna de la aplicación y su diseño inicial, que se conserva fuera del repositorio público.

**Estados:** ✅ completada · 🔄 en curso · ⬜ pendiente

| Etapa | Fase | Estado |
|---|---|---|
| A. Fundamentos | 0. Especificación y contexto | ✅ |
| A. Fundamentos | 1. Base técnica y tokens visuales | ✅ |
| B. Construcción | 2. Componentes reutilizables | ✅ |
| B. Construcción | 3. Secciones y ensamblado | ✅ (contenido provisional) |
| C. Consolidación | 4. Contenido real y recursos gráficos | ✅ (alcance de la entrega académica) |
| C. Consolidación | 5. Refinamiento y calidad | ✅ (aprobada para la entrega académica) |
| D. Lanzamiento | 6. Publicación y descarga | 🔄 |
| D. Lanzamiento | 7. Mantenimiento | ⬜ |

---

## Etapa A. Fundamentos

### Fase 0. Especificación y contexto ✅

- Especificación técnica de la landing y de la app incorporadas al proyecto.
- Reglas de datos acordadas: no mostrar información del APK, métricas ni recompensas sin confirmar; identificar los ejemplos como ilustrativos.

### Fase 1. Base técnica y tokens visuales ✅

- Vite, React, TypeScript, Tailwind CSS y Framer Motion configurados.
- Tokens como variables CSS en `src/styles/globals.css`, consumidos por `tailwind.config.js`.
- Configuración (`src/config/`), tipos (`src/types/`) y pruebas con Vitest.

**Criterio de salida:** `npm run build` y `npm test` correctos.

---

## Etapa B. Construcción

### Fase 2. Componentes reutilizables ✅

`Reveal`, `InteractiveCard`, `GlassCard`, `DownloadButton`, `PhoneMockup`, `RewardCard` y `AccordionItem`, con soporte de movimiento reducido y estado sin URL de APK.

### Fase 3. Secciones y ensamblado ✅

Header, menú móvil, hero, beneficios, cómo funciona, EcoTienda, impacto, descarga, FAQ y footer ensamblados en `src/app/App.tsx`.

**Limitación actual:** los textos se basan en la especificación de la app, que no certifica que cada capacidad esté implementada ni validada en producción.

---

## Etapa C. Consolidación

### Fase 4. Contenido real y recursos gráficos ✅

- [x] Definir el catálogo de la landing como datos locales de ejemplo, sin conexión a Supabase, para la entrega académica.
- [x] Cargar en `src/content/rewards.ts` los productos y valores en Ecopuntos proporcionados, identificados como ejemplos.
- [x] Identificar las categorías de EcoTienda: Hogar, Limpieza y Cuidado Personal; «Todos» es la opción general.
- [x] Definir que la asignación y los filtros por categoría quedan fuera del alcance de esta entrega.
- [x] Incorporar los estados visibles del reporte: en revisión, aprobado y rechazado.
- [x] Incorporar que la foto del reporte es obligatoria, confirmado para la versión a entregar.
- [x] Incorporar en la FAQ los tipos de reporte y el mecanismo de puntos descritos en el diseño inicial, distinguiéndolos de las capacidades verificadas.
- [x] Incorporar las categorías y el título del reporte visibles en la captura proporcionada.
- [x] Confirmar con el equipo que las categorías de la captura corresponden a la versión a entregar.
- [x] Documentar la asignación de Ecopuntos y el canje con código para retiro en un punto municipal.
- [x] Documentar los datos principales del reporte, la revisión administrativa y la conservación indefinida informada por el equipo.
- [x] Incorporar que el autor puede consultar su reporte, pero no modificarlo una vez enviado.
- [x] Incorporar la vigencia del código de canje: 30 días desde la compra.
- [x] Obtener capturas reales de inicio, reporte y tienda para el mockup del hero.
- [x] Evaluar si se necesita una imagen adicional de ejemplo de reporte: el equipo confirmó que la captura del hero alcanza para la entrega.
- [x] Incorporar imágenes de recompensas en `public/images/rewards/` y configurar sus rutas en `src/content/rewards.ts`.
- [x] Mantener los objetivos cualitativos de impacto para la entrega; incorporar métricas solo si se cuenta con datos verificables, fuente y período.
- [x] Revisar y actualizar el contenido de la landing con los datos confirmados y mantener identificados los ejemplos.

El documento de diseño inicial describe un MVP local y requisitos proyectados; la especificación técnica general describe una arquitectura con API y base de datos. El equipo confirmó que la foto es obligatoria, aunque la especificación general la describe como opcional. Las categorías se basan en `public/images/vista-reporte.jpeg` y fueron confirmadas para la entrega. El equipo informó que los reportes se conservan indefinidamente y describió la revisión administrativa y la validación en campo. La landing no afirma que los roles mencionados sean los únicos con acceso. La clasificación de productos y las métricas quedan fuera de esta entrega y pueden revisarse más adelante.

**Criterio de salida para la entrega:** contenido contrastado con las especificaciones, capturas y aclaraciones del equipo; ejemplos identificados y datos no confirmados sin publicar. Una revisión de la app en ejecución sigue siendo recomendable antes de cualquier publicación.

### Fase 5. Refinamiento y calidad ✅

El equipo informó que las pruebas fueron aprobadas satisfactoriamente y dio por finalizada esta fase para la entrega académica. Se conservan las limitaciones y tareas de publicación indicadas a continuación; este cierre no supone una certificación formal de conformidad WCAG.

Estructura pendiente respecto de la especificación (sección 2):

- [x] `src/components/motion/variants.ts`: variantes de animación compartidas.
- [x] `src/components/ui/SectionHeading.tsx`: encabezado reutilizable de sección.
- [x] `src/content/navigation.ts` y `src/content/benefits.ts`: extraer datos hoy definidos en componentes o en `site.ts`.
- [x] Ícono de pestaña configurado en `index.html`; utiliza la versión optimizada del ícono de la app.
- [x] `vite.config.ts` explícito.

Calidad y accesibilidad:

- [x] Revisión de contraste, jerarquía de encabezados y foco visible aprobada por el equipo para la entrega.
- [x] Pruebas con teclado y lector de pantalla aprobadas por el equipo para la entrega.
- [ ] Resolver el control persistente de pausa de ambos carruseles automáticos: la pausa solo mientras mantienen el foco o el cursor no cubre por sí sola el criterio WCAG 2.2.2. Para la entrega actual se decidió mantener el diseño sin botones; queda como limitación de accesibilidad conocida.
- [x] Comprobar que los carruseles del inicio y de EcoTienda se detienen con movimiento reducido.
- [x] Comprobar en navegador el estado inicial con movimiento reducido: sin animaciones activas y desplazamiento suave desactivado; las pruebas cubren la flotación, las tarjetas y las líneas del proceso.
- [x] Comprobar el ancho de las secciones y la ausencia de desbordamiento horizontal a 320, 375, 768, 1024 y 1440 px.
- [x] Revisión visual responsive y de rendimiento aprobada por el equipo para la entrega.
- [x] Configurar título, descripción y metadatos Open Graph básicos.
- [ ] Configurar URL canónica, `og:url` e imagen Open Graph cuando se confirme el dominio de publicación.

Comprobaciones realizadas durante el desarrollo: menú móvil y acordeón operables con teclado; un `h1` y encabezados principales `h2`. Se corrigió el desbordamiento provocado por el ancho mínimo de 320 px cuando la barra de desplazamiento ocupa espacio. Las imágenes comprobadas cargan y declaran dimensiones y texto alternativo; las imágenes de productos utilizan carga diferida. La aprobación adicional de las pruebas fue comunicada por el equipo.

**Criterio de salida para la entrega:** pruebas aprobadas por el equipo, con la limitación de pausa documentada y los metadatos dependientes del dominio pendientes para la publicación.

---

## Etapa D. Lanzamiento

### Fase 6. Publicación y descarga 🔄

El equipo eligió GitHub Pages y confirmó que el APK alojado en Expo está autorizado para su publicación. Expo lo identifica como compilación de distribución interna.

- [x] Configurar una URL HTTPS accesible del APK alojado en Expo, fuera del repositorio de la landing.
- [ ] Completar en `src/config/download.ts` la versión, el tamaño, los requisitos y la fecha cuando estén confirmados.
- [x] Probar descarga e instalación en un dispositivo Android real: el equipo informó que esta versión se instaló y funciona.
- [x] Añadir a la FAQ indicaciones generales para descargar e instalar el APK con precauciones de seguridad.
- [ ] Verificar el recorrido de esas instrucciones en dispositivos Android; los pasos pueden variar según el equipo.
- [ ] Agregar privacidad, términos y contacto solo cuando existan documentos y canales confirmados.
- [x] Elegir GitHub Pages y preparar rutas y flujo de publicación.
- [x] Crear el repositorio, activar GitHub Pages y desplegar `dist/`; comprobar el sitio publicado y HTTPS.
- [ ] Configurar URL canónica, `og:url` e imagen Open Graph con el dominio definitivo.
- [ ] Analítica de clics de descarga, solo con herramienta configurada y política de privacidad aplicable.

**Criterio de salida:** la landing publicada ofrece una descarga funcional y verificada.

### Fase 7. Mantenimiento ⬜

- [ ] Actualizar versión, tamaño y fecha del APK en cada lanzamiento.
- [ ] Mantener la FAQ y las recompensas alineadas con la app.
- [ ] Actualizar dependencias y repetir `npm run build` y `npm test` en cada cambio.

---

## Comandos de referencia

```sh
npm run dev        # desarrollo
npm run typecheck  # tipos
npm test           # pruebas
npm run build      # compilación de producción
npm run preview    # vista previa de la compilación
```
