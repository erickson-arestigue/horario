# Mi Horario Universitario

Aplicación personal de HTML, CSS y JavaScript, sin frameworks ni backend. Se mejoró el proyecto existente conservando su diseño, paleta, clases y actividades.

## Abrir localmente

Abre `index.html` con tu navegador. El calendario y la edición no requieren instalación. El guardado de páginas `file://` depende del navegador; para un origen estable y para probar la PWA, usa un servidor local.

Con Node.js instalado, abre una terminal dentro de esta carpeta y ejecuta:

```sh
node servidor-local.cjs
```

Abre **http://localhost:8000/mi-horario/**. Detén el servidor con Ctrl+C. Es un servidor opcional de archivos para pruebas: no es necesario en GitHub Pages. El service worker funciona en localhost o HTTPS, no al abrir un archivo directamente ni en una IP de red por HTTP.

Usa siempre la misma dirección y navegador: `localhost`, `127.0.0.1`, otros puertos, `file://` y el sitio publicado tienen almacenamientos separados.

## Editar y guardar

- Pulsa una actividad para editarla, o **+ Nueva actividad** para crearla.
- **Guardar** actualiza el calendario y los resúmenes inmediatamente. **Eliminar actividad** solicita confirmación.
- En **Clase universitaria**, selecciona también el curso: determina el color y si cuenta como clase de Estadística. **Estudio de Estadística** cuenta como estudio y como prioridad.
- Cada semana tiene su lista independiente. Exámenes comienza como una copia de Normal.
- Un conflicto produce una advertencia, pero puedes guardar. En escritorio las actividades coincidentes se distribuyen en columnas; en celular se mantienen como tarjetas separadas.
- El horario acepta actividades desde las 00:00. La cuadrícula normalmente comienza a las 06:00 y se amplía si añades actividades tempranas distintas de Dormir.
- Una hora final `00:00` significa medianoche. Solo Dormir puede acabar a una hora anterior al inicio y continuar al día siguiente. No se admiten eventos de duración cero o de 24 horas.
- **Restaurar horario original** pide confirmación y restaura ambas semanas y la configuración.

Los datos se guardan en `localStorage`, clave `mi-horario.v1`. No se envían a ningún servidor y no se sincronizan automáticamente. Borrar los datos del navegador también puede borrarlos: exporta copias. Si no se puede guardar, se muestra un aviso y no se presenta el cambio como guardado. Si otra pestaña modifica el horario, se pide recargar antes de sobrescribirlo.

## Pasar el horario de PC a celular

1. En la PC pulsa **Exportar horario**. Se genera `horario.json` con todas las semanas, la semana seleccionada, el filtro y el objetivo de sueño.
2. Transfiere ese archivo al celular mediante el medio que prefieras.
3. Abre la app en el celular: **Opciones → Importar horario**. Selecciona el archivo y confirma el reemplazo.

También puedes usar **Copiar datos** en un dispositivo y **Pegar datos** en el otro. Si el navegador bloquea el portapapeles, se abre un campo para copiar manualmente. El JSON se valida antes de reemplazar nada; la confirmación muestra el número de semanas y actividades. Importar reemplaza todas las semanas y configuraciones, no combina dos copias. Exporta antes si quieres conservarlas.

## Publicar en GitHub Pages

1. Crea un repositorio, por ejemplo `mi-horario`.
2. Sube **el contenido de esta carpeta** a la raíz del repositorio: `index.html` debe quedar en la raíz, junto a `styles.css`, `script.js`, `js/`, `icons/`, `manifest.json`, `service-worker.js` y `.nojekyll`.
3. En el repositorio ve a **Settings → Pages → Build and deployment**.
4. En **Source**, selecciona **Deploy from a branch**. Elige `main` y `/(root)`, y guarda.
5. Espera a que GitHub termine y abre la dirección que indique Pages, por ejemplo `https://usuario.github.io/mi-horario/`.

Todos los recursos, el manifest, los iconos y el service worker usan rutas relativas. No se necesitan npm, compilación, servidor propio ni secretos. El servidor local opcional y este documento no son necesarios para ejecutar la app publicada.

El código y el horario predeterminado estarán disponibles para quienes puedan acceder al sitio/repositorio. Las modificaciones personales posteriores permanecen en cada navegador salvo que exportes y compartas los datos.

Guía oficial: [Configurar la fuente de GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

## Instalar en Android

Abre la dirección **HTTPS** en Chrome. En el menú **⋮**, selecciona **Agregar a pantalla principal / Instalar aplicación** y confirma. También aparecerá un botón en Configuración cuando el navegador ofrezca la instalación. Ábrela una vez con conexión para preparar la caché.

[Ayuda oficial de Chrome](https://support.google.com/chrome/answer/9658361?co=GENIE.Platform%3DAndroid&hl=es).

## Instalar en iPhone

Abre la dirección **HTTPS** en Safari, pulsa **Compartir → Agregar a inicio**. Si aparece **Abrir como app web**, actívalo, y pulsa **Agregar**. Abre el icono con conexión al menos una vez. Si la copia instalada tiene datos diferentes a Safari, importa allí tu `horario.json`.

[Guía oficial de Apple](https://support.apple.com/es-es/guide/iphone/iphea86e5236/ios).

## Offline y actualizaciones

La primera apertura descarga todos los archivos necesarios. Después puedes abrir el calendario, editarlo y guardarlo sin internet, mientras el navegador conserve la caché y el almacenamiento. La instalación real en Android/iPhone requiere el sitio HTTPS; no se publica automáticamente desde este proyecto.

Cuando modifiques HTML, CSS, JS, manifest o iconos, cambia `VERSION` en `service-worker.js` (por ejemplo a `v2.0.2`) y publica todos los archivos juntos. El navegador descarga la siguiente versión completa y avisa en la app; **Configuración → Aplicar actualización** la activa con confirmación. Una descarga incompleta no sustituye la caché anterior. No cambies la clave de localStorage al actualizar.

La caché está limitada a esta aplicación y su ruta; no borra cachés de otros proyectos del mismo dominio.

## Sueño y resúmenes

Los marcadores de sueño del proyecto anterior se convirtieron en **7 intervalos editables**, con fin en el primer aseo de la mañana siguiente, manteniendo la estimación usada antes. Son 103 actividades diurnas más 7 de sueño. Un sueño que cruza medianoche se muestra en ambos días, pero se cuenta una sola vez. Puedes ajustar estos intervalos desde las tarjetas.

**Sueño programado** suma el tiempo de los eventos Dormir sin duplicar solapamientos; el promedio divide esa suma entre 7. **Tiempo libre** suma los bloques de Descanso / tiempo libre sin duplicados: no incluye huecos sin actividad. Las demás categorías suman la duración de cada evento, incluso si hay un conflicto.

El **sueño objetivo**, inicialmente 23:45–08:00 (8 h 15 min), solo es una referencia visual: cambiarlo no crea ni modifica actividades.

## Archivos y mantenimiento

- Modificados: `index.html` (controles y modales), `styles.css` (responsive y formularios), `script.js` (interacciones, persistencia y PWA).
- Nuevos: `js/data.js` (horario original y paleta), `js/storage.js` (modelo, validación, cálculos y conflictos), `js/calendar.js` (renderizado semanal y diario).
- Nuevos: `manifest.json`, `service-worker.js`, cuatro iconos PNG en `icons/`, `.nojekyll`, `servidor-local.cjs` y este documento.

El formato JSON contiene `version`, `activeWeek`, `settings` y un arreglo `weeks`. Para incorporar otro tipo de semana en el futuro basta con añadir un objeto de semana con identificador único, nombre y eventos; el selector se genera a partir de este arreglo. La interfaz actual ofrece Normal y Exámenes.

## Revisión realizada

- Vista semanal y agenda móvil, incluyendo ancho de 320 px; sin desbordamientos horizontales en las tarjetas móviles.
- Creación, edición, eliminación, cancelación, conflictos y actualización de resúmenes.
- Persistencia tras recargar y separación entre semanas.
- Filtros, navegación diaria, configuración del sueño y confirmación de restauración.
- Copia y pegado del JSON, rechazo de JSON inválido e importación desde archivo.
- Validaciones del modelo: horas inválidas, duplicados, categorías, intervalos nocturnos y cruce domingo → lunes.
- Manifest, dimensiones de iconos, rutas relativas y registro del service worker bajo `/mi-horario/`.
- Apertura y lectura del horario con el servidor detenido, desde la caché offline.
- Detección y aplicación de una nueva versión de la PWA mediante el aviso de actualización.

La instalación física en un Android/iPhone y la publicación real en GitHub Pages deben hacerse cuando tengas la URL HTTPS. No se realizaron desde este equipo.
