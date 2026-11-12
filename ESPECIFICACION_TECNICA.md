# Especificación técnica: landing de EcoAlerta

## 1. Arquitectura de componentes

### Stack y criterios generales

- **React + TypeScript** para componentes, datos y contratos.
- **Tailwind CSS** para estilos y tokens visuales; CSS adicional solo para efectos que lo requieran.
- **Framer Motion** para animaciones de entrada, interacción y desplazamiento.
- **Vite** como entorno de desarrollo y compilación.
- **Iconos SVG** de una biblioteca consistente, como Lucide React.
- Landing estática, sin backend obligatorio. El contenido variable y la URL del APK se centralizan en archivos de configuración.

La experiencia debe ser **mobile-first**, con alto impacto visual y un objetivo principal: descargar la app. La referencia a Sweatcoin orienta la estética y el ritmo visual, sin copiar sus recursos gráficos.

### Composición principal

```text
App
├── SiteHeader
│   ├── Logo
│   ├── DesktopNavigation
│   ├── MobileMenu
│   └── DownloadButton
├── Main
│   ├── HeroSection
│   │   ├── HeroCopy
│   │   ├── DownloadButton
│   │   ├── PhoneMockup
│   │   └── FloatingReportCards
│   ├── BenefitsSection
│   │   └── BenefitCard × 3
│   ├── HowItWorksSection
│   │   └── ProcessStep × 3
│   ├── EcoStoreSection
│   │   ├── EcoStorePreview
│   │   └── RewardCard × N
│   ├── ImpactSection
│   │   └── ImpactCard × N
│   ├── DownloadSection
│   │   ├── DownloadButton
│   │   └── ApkDetails
│   └── FaqSection
│       └── AccordionItem × N
└── SiteFooter
```

### Responsabilidades y contratos

| Componente | Responsabilidad | Datos principales |
|---|---|---|
| `SiteHeader` | Navegación, enlace al inicio y acceso a descarga | Enlaces, estado del menú móvil |
| `DownloadButton` | CTA reutilizable hacia el APK | URL, etiqueta, variante visual, ubicación para analítica |
| `PhoneMockup` | Presentar una vista ilustrativa de la app | Imagen, texto alternativo, decoración opcional |
| `GlassCard` | Contenedor visual reutilizable | Contenido, variante y clases adicionales |
| `BenefitCard` | Mostrar un beneficio con apoyo gráfico | Icono, título, descripción |
| `ProcessStep` | Explicar una etapa del recorrido | Número, título, descripción, ilustración |
| `RewardCard` | Mostrar un ejemplo de producto de EcoTienda | Imagen, nombre, coste y etiqueta de ejemplo |
| `ImpactCard` | Mostrar una métrica verificable o un objetivo editorial | Valor, etiqueta, fuente si corresponde |
| `AccordionItem` | Mostrar una respuesta accesible | Pregunta, respuesta, estado abierto |
| `Reveal` | Aplicar entradas consistentes con respeto por movimiento reducido | Contenido, variante y retraso |

**Reglas de datos:**

- La URL del APK, versión, requisitos de Android, tamaño y fecha de actualización deben provenir de configuración verificable. Si se desconoce un dato, **no se muestra**.
- Si no existe una URL de descarga válida, se oculta el enlace de descarga y se muestra un mensaje explícito de disponibilidad pendiente. Nunca usar un enlace ficticio.
- Las pantallas, recompensas y saldos ilustrativos deben identificarse como **ejemplos** si no representan datos reales.
- No publicar cifras de impacto, promesas de recompensa ni afirmaciones de validación que no estén confirmadas.

---

## 2. Árbol de carpetas

```text
ecoalerta-landing/
├── public/
│   ├── favicon.svg
│   └── images/
│       ├── app-preview.webp
│       ├── report-example.webp
│       └── rewards/
├── src/
│   ├── app/
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── assets/
│   │   └── icons/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── SiteHeader.tsx
│   │   │   ├── MobileMenu.tsx
│   │   │   └── SiteFooter.tsx
│   │   ├── sections/
│   │   │   ├── HeroSection.tsx
│   │   │   ├── BenefitsSection.tsx
│   │   │   ├── HowItWorksSection.tsx
│   │   │   ├── EcoStoreSection.tsx
│   │   │   ├── ImpactSection.tsx
│   │   │   ├── DownloadSection.tsx
│   │   │   └── FaqSection.tsx
│   │   ├── ui/
│   │   │   ├── DownloadButton.tsx
│   │   │   ├── GlassCard.tsx
│   │   │   ├── PhoneMockup.tsx
│   │   │   ├── SectionHeading.tsx
│   │   │   └── AccordionItem.tsx
│   │   └── motion/
│   │       ├── Reveal.tsx
│   │       └── variants.ts
│   ├── config/
│   │   ├── site.ts
│   │   └── download.ts
│   ├── content/
│   │   ├── navigation.ts
│   │   ├── benefits.ts
│   │   ├── process.ts
│   │   ├── rewards.ts
│   │   ├── impact.ts
│   │   └── faq.ts
│   ├── styles/
│   │   └── globals.css
│   └── types/
│       └── content.ts
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

El APK puede alojarse en un servidor o release confiable y enlazarse mediante configuración. Mantenerlo fuera del repositorio de la landing salvo que exista una decisión explícita de distribución.

### Tokens visuales

| Token | Valor o criterio |
|---|---|
| Fondo principal | `#0B0F17` |
| Acento esmeralda | `#10B981` |
| Texto principal | Blanco suave, por ejemplo `#F8FAFC` |
| Texto secundario | Gris claro con contraste accesible |
| Superficie glass | Blanco o verde de baja opacidad sobre fondo oscuro |
| Borde | `1px` con blanco translúcido |
| Desenfoque | `backdrop-blur` moderado; fondo opaco de respaldo |
| Glow | Sombra verde difusa de baja opacidad |
| Radios | Tarjetas: 20–28 px; botones: píldora |
| Contenido | Ancho máximo aproximado de 1200 px, centrado |
| Tipografía | Sans geométrica legible; títulos de gran escala y peso fuerte |

Ejemplo de superficie reutilizable:

```css
.glass-panel {
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(16px);
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.25);
}
```

Usar el verde para acciones, indicadores y acentos; no depender exclusivamente del color para transmitir significado. Evitar el texto pequeño en verde sobre fondos donde no alcance contraste suficiente.

---

## 3. Animaciones con Framer Motion

| Elemento | Animación | Activación | Duración orientativa |
|---|---|---|---|
| Header | Aparición desde arriba con opacidad | Al cargar | 0,4 s |
| Título y bajada del hero | Entrada escalonada desde abajo | Al cargar | 0,5–0,7 s |
| Mockup principal | Aparición con leve escala y desplazamiento | Al cargar | 0,7 s |
| Tarjetas flotantes | Movimiento vertical suave y alternado | Tras la entrada | Ciclo de 4–6 s |
| Tarjetas de beneficios | Fade y desplazamiento vertical escalonado | Al entrar en viewport | 0,4–0,5 s |
| Pasos del proceso | Aparición secuencial; línea de conexión progresiva | Al entrar en viewport | 0,5 s por grupo |
| Tarjetas de EcoTienda | Elevación y aumento leve del glow | Hover o foco | 0,2 s |
| Panel de descarga | Entrada con escala sutil | Al entrar en viewport | 0,5 s |
| FAQ | Expansión y contracción del contenido | Interacción | 0,2–0,3 s |
| Menú móvil | Despliegue de panel y opacidad | Apertura/cierre | 0,2–0,3 s |

**Criterios de implementación:**

- Usar `whileInView` con `viewport={{ once: true }}` por defecto; las tarjetas de beneficios, pasos e impacto y los paneles de EcoTienda y descarga repiten su animación al volver a entrar en pantalla.
- Priorizar `transform` y `opacity`; evitar animar continuamente filtros y sombras costosas.
- Con `useReducedMotion()`, eliminar flotación y desplazamientos; conservar cambios de estado inmediatos o transiciones mínimas.
- Las animaciones decorativas no deben bloquear interacción, lectura ni descarga.
- El estado de foco de teclado debe ser tan visible como el estado hover.

---

## 4. Diseño detallado por sección

### 4.1. Header

**Objetivo:** orientación inmediata y acceso permanente a la descarga.

- Barra superior translúcida con blur, borde inferior fino y logo a la izquierda.
- Navegación hacia **Cómo funciona**, **EcoTienda**, **Impacto** y **Preguntas frecuentes**.
- CTA esmeralda **“Descargar APK”** a la derecha.
- En móvil: logo, CTA compacto y botón de menú accesible.
- El header puede permanecer fijo; compensar su altura en los destinos de ancla.

### 4.2. Hero

**Objetivo:** comunicar la propuesta en segundos y ofrecer el primer CTA.

**Layout desktop:** texto a la izquierda; mockup de teléfono a la derecha.  
**Layout móvil:** texto y CTA primero; mockup debajo.

- Fondo oscuro con gradiente radial verde, grilla muy tenue y halo detrás del teléfono.
- Etiqueta superior pequeña: **“Tu ciudad. Tu impacto.”**
- Titular sugerido: **“Reportá. Sumá. Transformá.”**
- Bajada: **“Reportá problemas ambientales desde tu celular y conocé las recompensas disponibles en EcoTienda.”**
- CTA principal: **“Descargar APK”**.
- CTA secundario: **“Ver cómo funciona”**, con enlace a la sección correspondiente.
- Teléfono con vista de la app o representación ilustrativa claramente identificada.
- Dos tarjetas glass flotantes, por ejemplo: una vista de reporte y una vista de EcoTienda. No mostrar estados de aprobación o saldos como si fueran reales.

### 4.3. Beneficios

**Objetivo:** sintetizar el valor de la app sin recurrir a bloques extensos de texto.

Tres tarjetas visuales en desktop, apiladas en móvil:

1. **Reportá tu entorno:** ilustración de mapa y marcador.
2. **Participá activamente:** composición de comunidad y entorno urbano.
3. **Explorá EcoTienda:** ficha visual de recompensa.

Cada tarjeta incluye icono, título breve, una oración y un detalle gráfico. Usar superficies glass con diferentes tamaños de elementos y halos discretos para evitar un aspecto de plantilla uniforme.

### 4.4. Cómo funciona

**Objetivo:** hacer comprensible el recorrido principal.

Tres pasos conectados por una línea luminosa en desktop y una línea vertical en móvil:

1. **Registrá un reporte:** describí el problema y agregá la información que permita la app.
2. **Seguí su estado:** consultá el avance disponible dentro de la aplicación.
3. **Explorá EcoTienda:** conocé las recompensas y las condiciones vigentes.

Cada paso combina número grande, icono, texto corto y una miniatura ilustrativa. El texto definitivo debe ajustarse al funcionamiento real: no prometer puntos automáticos, validaciones ni estados específicos sin confirmación.

### 4.5. EcoTienda

**Objetivo:** mostrar el sistema de recompensas como una característica visualmente atractiva.

- Composición dividida: explicación breve a un lado y un panel glass con tarjetas de productos al otro.
- Tarjetas con imagen, nombre y coste en puntos **solo si esos datos están confirmados**.
- Si se usan ejemplos, mostrar la etiqueta **“Ejemplo ilustrativo”**.
- Incluir una nota breve: **“La disponibilidad y las condiciones se consultan en la app.”**
- CTA secundario hacia la descarga, sin competir visualmente con el principal.

### 4.6. Impacto

**Objetivo:** vincular la acción individual con el cuidado del entorno.

- Fondo con mapa o paisaje urbano estilizado, oscurecido para preservar legibilidad.
- Si existen datos verificables: mostrar hasta tres métricas con período y fuente.
- Si no existen: reemplazar las cifras por tarjetas visuales con objetivos cualitativos, sin simular estadísticas.
- Ejemplo de mensaje: **“Cada reporte puede ayudar a visibilizar lo que necesita atención.”**

### 4.7. Descarga

**Objetivo:** convertir la visita en una descarga informada.

- Panel destacado con borde esmeralda, halo contenido y mockup parcial del teléfono.
- Titular: **“Empezá a participar con EcoAlerta.”**
- CTA principal: **“Descargar APK para Android”**.
- Mostrar versión, tamaño, requisitos y fecha de actualización únicamente cuando estén confirmados.
- Aclarar que se trata de una instalación mediante APK y enlazar instrucciones verificadas si están disponibles.
- El enlace debe apuntar a una fuente HTTPS controlada o confiable. No prometer compatibilidad universal ni que la instalación está verificada si no puede demostrarse.

### 4.8. Preguntas frecuentes

**Objetivo:** resolver dudas antes de la descarga.

Acordeón con preguntas como:

- ¿Qué puedo reportar?
- ¿Cómo funciona EcoTienda?
- ¿Cómo instalo el APK?
- ¿Qué información comparte un reporte?

Las respuestas deben basarse en el comportamiento y las políticas reales de la app. El acordeón utiliza botones nativos, `aria-expanded` y asociación con su panel; es operable con teclado.

### 4.9. Footer

- Logo y descripción breve.
- Enlaces a secciones y contacto, si existe un canal confirmado.
- Enlaces a privacidad y términos solo cuando sus documentos estén disponibles.
- Aviso de copyright con titular confirmado.
- Mantener suficiente separación visual respecto del CTA final.

---

## 5. Requisitos transversales

- **Responsive:** una columna en móvil, dos columnas para composiciones principales en desktop y grillas adaptables sin desbordamiento horizontal.
- **Accesibilidad:** un solo `h1`, jerarquía semántica, navegación por teclado, foco visible, texto alternativo significativo y contraste conforme a WCAG 2.2 AA.
- **Rendimiento:** imágenes optimizadas con dimensiones definidas; carga diferida debajo del primer viewport; evitar múltiples capas de blur grandes en móvil.
- **SEO y compartir:** título, descripción, URL canónica e imagen Open Graph configurables; contenido esencial disponible sin depender de animaciones.
- **Analítica opcional:** registrar clics de descarga por ubicación del CTA únicamente si existe una herramienta configurada y una política de privacidad aplicable. Un clic no equivale a una instalación.
- **Validación:** comprobar navegación, menú y acordeón por teclado; estado sin URL de APK; enlaces reales; movimiento reducido; y presentación en móvil y escritorio.
