# EcoAlerta: componentes iniciales

Landing de EcoAlerta construida con React, TypeScript, Vite y Tailwind CSS.

## Desarrollo

```sh
npm ci
npm run dev
```

Para generar y revisar la versión de producción, ejecutar `npm run build` y luego `npm run preview`.

## Validación

Con Node.js y npm instalados:

```sh
npm ci
npm run typecheck
npm test
```

La configuración utiliza Tailwind CSS 3 y el punto de entrada importa `src/styles/globals.css`.

## SEO y publicación

El título, la descripción y los metadatos Open Graph básicos se mantienen en `index.html`. Antes de publicar, definir el dominio definitivo y una imagen para compartir, y configurar la URL canónica, `og:url` y `og:image` con URLs públicas HTTPS. Verificar que la información de la descripción y de los metadatos coincida si se modifica el contenido.

### GitHub Pages

La compilación usa rutas relativas para funcionar tanto en la raíz del dominio como bajo la ruta de un repositorio de GitHub Pages. El flujo `.github/workflows/deploy-pages.yml` ejecuta las pruebas, compila y publica `dist/` al recibir cambios en la rama `main` o al iniciarse manualmente.

1. Crear un repositorio de GitHub y subir el proyecto a la rama `main`. Revisar antes el contenido que se hará público, incluidas las imágenes y los datos de ejemplo.
2. En el repositorio, abrir **Settings → Pages** y seleccionar **GitHub Actions** como fuente de publicación.
3. En **Actions**, comprobar que termine correctamente el flujo «Publicar en GitHub Pages». Si se cambió la fuente después de subir el proyecto, ejecutarlo manualmente.
4. Abrir la URL publicada que muestra GitHub Pages y comprobar imágenes, navegación y descarga. Para un repositorio de proyecto suele tener la forma `https://USUARIO.github.io/REPOSITORIO/`.

Si la rama principal no se llama `main`, actualizar la rama configurada en el flujo. La URL del APK debe ser HTTPS y accesible para quienes visiten la página; confirmarla con el equipo y probar la descarga e instalación antes de activarla.

## Contenido y descarga

Los tokens visuales se mantienen en `src/styles/globals.css`. La URL y los metadatos del APK se configuran en `src/config/download.ts` únicamente cuando estén confirmados. `DownloadButton` muestra el mensaje de disponibilidad si la URL está ausente o no es HTTPS; verificar además que el servidor sea confiable antes de publicarla.

El ícono original de la app está en `public/images/logo-ecoalerta.png`. El encabezado, el pie y la pestaña del navegador utilizan la versión optimizada `public/images/logo-ecoalerta-128.png`; si se cambia el original, actualizar también esa versión.

`PhoneMockup` requiere una imagen con texto alternativo y dimensiones. Marcar `isIllustrative` para identificar una representación que no sea una pantalla real. Para la imagen principal se puede pasar `loading="eager"`.

`HeroSection` muestra capturas reales de inicio, reporte y tienda configuradas en `src/content/appScreens.ts`. Los datos visibles en las capturas son de ejemplo. La vista cambia automáticamente cada siete segundos con una transición suave; se detiene al recibir foco o durante el hover y no rota con movimiento reducido. Al enfocar la vista se puede cambiar de pantalla con las flechas del teclado. Se puede reemplazar por una sola imagen mediante la propiedad `image`.

Las tarjetas de beneficios, pasos e impacto y los paneles de EcoTienda y descarga repiten una animación sutil al volver a entrar en pantalla. El resto de las entradas ocurre una sola vez; con movimiento reducido no se aplica desplazamiento ni demora.

Los contenidos de EcoTienda e impacto se encuentran en `src/content/rewards.ts` y `src/content/impact.ts`. Las recompensas son ejemplos locales con los valores en Ecopuntos proporcionados por el equipo; no se conectan a Supabase ni garantizan disponibilidad. Las métricas de impacto requieren fuente y período; se admiten hasta tres tarjetas en la sección.

EcoTienda muestra los productos en una cinta continua y lenta cuando hay al menos seis productos. El movimiento se detiene al pasar el cursor; al enfocar la cinta se muestra la lista desde el principio y cada producto puede enfocarse con Tab para leer su nombre, costo y etiqueta de ejemplo. Las tarjetas son informativas y no realizan un canje. Con movimiento reducido se muestra la lista estática y desplazable.

Las imágenes del catálogo se encuentran en `public/images/rewards/` y sus rutas se configuran mediante `imageUrl` en `src/content/rewards.ts`. Para reemplazar una imagen, conservar su nombre o actualizar la ruta y la extensión correspondiente:

| Producto | Archivo |
|---|---|
| Lavandina | `lavandina.jpg` |
| Esponja vegetal | `esponja-vegetal.webp` |
| Lámpara LED de bajo consumo | `lampara-led.webp` |
| Semillas para huerta | `semillas-huerta.jpeg` |
| Kit de cuidado personal sólido | `kit-cuidado-personal.webp` |
| Kit de cubiertos | `kit-cubiertos.jpg` |
| Cepillo de bambú | `cepillo-bambu.webp` |
| Botella térmica | `botella-termica.jpg` |
| Compostera domiciliaria 20 L | `compostera-domiciliaria.webp` |
| Gorra oficial EcoAlerta | `gorra-ecoalerta.jpg` |
| Bolsa de tela reutilizable | `bolsa-tela.jpg` |

Hasta configurar cada imagen, la tarjeta muestra un ícono. Las rutas no se detectan automáticamente.

Los pasos y respuestas de `src/content/process.ts` y `src/content/faq.ts` se basan en las especificaciones, la captura `public/images/vista-reporte.jpeg` y las aclaraciones del equipo. Para la entrega se confirmaron las categorías, la foto obligatoria, la revisión y validación del reporte, la consulta sin edición por su autor, la conservación indefinida y la vigencia de 30 días del código de canje desde la compra. La landing no afirma que los roles mencionados sean los únicos con acceso. La especificación técnica general describe la foto como opcional; debe actualizarse cuando se revise la documentación de la app. Las categorías de productos y las métricas de impacto quedan fuera del alcance de esta entrega; la instalación sigue pendiente de verificación. No se muestran créditos, copyright ni enlaces legales o de contacto sin datos confirmados.
