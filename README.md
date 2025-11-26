# Loader: WebGD Arquitectura, Diseño y Construcción

Breve guía para el loader incluido en este repositorio.

Archivos principales
- `loader.html`: página del loader con el SVG y las máscaras.
-- `css/loader.css`: estilos y animaciones (usa la variable `--brand-blue` — hex `#020280`, trazos y keyframes).
- `js/loader.js`: helper de depuración (`window.loaderUnmaskAll()` y atajo tecla `L`).

Prueba local rápida
1. Abrir `loader.html` en tu navegador (doble clic o arrastrar al navegador).
2. Verificar que hay solo un logo/animación y que el fondo utiliza la variable `--brand-blue` (hex `#020280`).
3. En la consola del navegador puedes ejecutar:
   - `window.loaderUnmaskAll()` — fuerza las máscaras a su posición final.
   - Presionar `L` (con la ventana enfocada) para activar el helper.

Funciones JS expuestas y control del loop
- `window.loaderUnmaskAll()` — fuerza las máscaras a su posición final (debug).
- `window.loaderStartLoop()` — activa el reinicio automático de la secuencia completa.
- `window.loaderStopLoop()` — detiene el reinicio automático.

Comportamiento del loop
- La animación se ejecuta una vez (cada trazo y máscara usa `animation: ... forwards`).
- Al terminar la animación final (`drawD`) el `svg` se desvanece en 0.6s.
- Justo al terminar ese desvanecimiento la secuencia se reinicia automáticamente.

Ajustes (cómo modificarlos)
- Cambiar la duración del fade: editar la línea `svg.style.transition = 'opacity 0.6s ease';` en `js/loader.js` (valor en segundos).
- Cambiar la pausa entre ciclos (si prefieres una pausa extra): en lugar de escuchar `transitionend`, reemplaza la lógica para usar `setTimeout` con el retraso deseado antes de `applyAnimations()`.

Depuración rápida
- Para pausar el loop durante pruebas: `window.loaderStopLoop()`.
- Para forzar una regeneración inmediata: primero `window.loaderStopLoop()`, luego `window.loaderUnmaskAll()` y finalmente `window.loaderStartLoop()`.

Git
- El repositorio raíz ha sido inicializado y sincronizado con el remoto.
- `hero-revista/` está excluida en `.gitignore` ya que contiene su propio repositorio.

Contacto
- Si quieres que haga un release o publique en GitHub Pages, dime y lo preparo.
