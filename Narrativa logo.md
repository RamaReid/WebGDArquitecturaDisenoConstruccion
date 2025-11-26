Aquí tienes el Resumen de la Narrativa Visual (Guion de la experiencia).

Este documento describe la "historia" que cuenta tu loader, ideal para explicar el concepto a otros diseñadores, desarrolladores o al cliente final.

Título: "El Salto de GD"

Concepto: Transición de lo digital/técnico a lo orgánico/físico.

Acto 1: La Construcción (La Espera)

Lo que sucede: Sobre un fondo azul profundo inmersivo, vemos planos técnicos (líneas grises punteadas) trazando coordenadas. Progresivamente, la ingeniería cobra vida: primero se entinta la letra "G" (Rojo) y finalmente la "D" (Blanco).

La Sensación: Precisión, ingeniería, tecnología. El sistema se está "construyendo".

Duración: Mínimo 2 ciclos completos para asegurar la marca.

Acto 2: El Despertar (La Preparación)

Lo que sucede: Una vez cargado el sitio, el logo deja de ser un dibujo 2D. Adquiere "vida". Se eleva suavemente hacia el espectador (aumenta de escala y sube su posición), como si tomara aire o impulso antes de un salto.

La Sensación: Anticipación, inhalación. El usuario intuye que algo va a pasar.

Acto 3: El Impacto (El Clímax)

Lo que sucede: El logo se deja caer con peso y gravedad. Golpea el centro de la pantalla.

El Evento Crítico: En el instante exacto del contacto, el logo no choca contra algo sólido, sino que rompe la tensión superficial del fondo azul.

La Revelación: Se genera una Onda Expansiva (Ripple). Esta onda funciona como una ventana circular que se abre rápidamente desde el centro hacia afuera, barriendo el color azul y revelando, por primera vez, el fondo real del Home.

Acto 4: La Estabilización (La Calma)

Lo que sucede: El sitio web ya es visible de fondo. El logo "GD" no desaparece; ha sobrevivido a la caída. Debido a la fuerza del impacto, realiza un movimiento de amortiguación (rebote elástico): se hunde un poco, vuelve a subir y oscila levemente hasta quedarse quieto, flotando sobre el contenido. Unas ondas secundarias (anillos blancos tenues) se disipan suavemente.

La Sensación: Presencia, solidez y elegancia. El logo es el protagonista que nos ha traído el contenido.

Estado Final (Ready)

Situación: El usuario tiene control total del sitio. El logo "GD" descansa estable en el centro de la pantalla, esperando la siguiente interacción (su futuro viaje hacia el encabezado/header).

Resumen Técnico para Desarrollo

Loader Loop: Animación SVG (drawLines).

Trigger: window.onload + min_cycles.

Animación de Salida:

Scale Up + Translate Y- (Elevación).

Scale Down + Translate Y+ (Caída rápida).

Transición de Fondo: Mask-image radial animada sincronizada con el impacto (el azul se vuelve transparente).

Física Final: Keyframes de rebote amortiguado en el logo..

Lo que describes se llama una transición por capas independientes.

Para lograr esto, debemos cambiar la estrategia técnica de una sola caja a tres capas superpuestas:

Capa Fondo (Azul): Es la que recibirá el "agujero" (la máscara) y desaparecerá.

Capa Ondas: Generará los anillos blancos visuales.

Capa Logo (Protagonista): Estará encima de todo. Nunca desaparecerá, solo cambiará su animación de "dibujo" a "física de rebote".

Aquí tienes la implementación exacta para esa escena:

1. HTML (index.html)

Estructuramos el loader separando el fondo del logo.

code
Html
play_circle
download
content_copy
expand_less
<!-- LOADER WRAPPER: Contenedor general fijo -->
<div id="loader-wrapper">
    
    <!-- CAPA 1: El fondo azul que se va a perforar -->
    <div id="loader-bg-layer"></div>

    <!-- CAPA 2: Contenedor para las ondas decorativas (anillos blancos) -->
    <div id="loader-ripple-layer">
        <div class="ripple-ring r1"></div>
        <div class="ripple-ring r2"></div>
    </div>

    <!-- CAPA 3: El Logo (Siempre visible, flota encima del resto) -->
    <div id="loader-logo-layer">
        <!-- TU SVG ORIGINAL AQUÍ -->
        <svg viewBox="0 0 210 170" ... >
            <!-- ... todo el contenido del svg ... -->
        </svg>
    </div>

</div>
2. CSS (loader.css)

Aquí definimos la física: la gravedad (caída), la tensión superficial (el agujero abriéndose) y la flotabilidad (el rebote final).

code
CSS
download
content_copy
expand_less
/* === ESTRUCTURA DE CAPAS === */
#loader-wrapper {
    position: fixed;
    top: 0; left: 0; width: 100%; height: 100%;
    z-index: 9999;
    /* Ya no ponemos el fondo aquí, sino en la capa hija */
    pointer-events: none; /* Para que al abrirse, se pueda clickear la web abajo */
}

/* CAPA 1: FONDO AZUL SOLIDO */
#loader-bg-layer {
    position: absolute;
    top: 0; left: 0; width: 100%; height: 100%;
    background: #020280;
    z-index: 1;
    /* Preparamos la máscara para el agujero */
    -webkit-mask-image: radial-gradient(circle at center, transparent 0%, black 0%);
    mask-image: radial-gradient(circle at center, transparent 0%, black 0%);
}

/* CAPA 3: LOGO (Encima de todo) */
#loader-logo-layer {
    position: absolute;
    top: 0; left: 0; width: 100%; height: 100%;
    display: flex; align-items: center; justify-content: center;
    z-index: 3;
    pointer-events: auto; /* El logo bloqueará clicks si está en medio */
}

/* Ajuste del SVG dentro del layer */
#loader-logo-layer svg {
    width: min(95vw, 600px); /* Tamaño base */
    overflow: visible;
    transform-origin: center center;
    /* El logo empieza quieto o dibujándose */
}


/* === ANIMACIONES DE LA SECUENCIA === */

/* PASO 1: ELEVACIÓN (Toma aire) */
.anim-elevate svg {
    animation: elevateLogo 1.5s cubic-bezier(0.45, 0, 0.55, 1) forwards;
}

/* PASO 2: CAÍDA (Gravedad) */
.anim-drop svg {
    animation: dropLogo 0.4s cubic-bezier(0.75, 0, 1, 1) forwards; 
    /* Aceleración fuerte al final */
}

/* PASO 3: IMPACTO Y ESTABILIZACIÓN (Rebote en agua) */
.anim-stabilize svg {
    animation: floatingBob 3s cubic-bezier(0.36, 0, 0.66, -0.56) forwards;
    /* Este bezier simula el rebote elástico */
}

/* PASO 4: APERTURA DEL AGUJERO (En el fondo azul) */
.anim-open-hole {
    animation: expandHole 1.5s cubic-bezier(0.19, 1, 0.22, 1) forwards;
}

/* PASO 5: ONDAS DECORATIVAS */
.ripple-ring {
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%) scale(0);
    border: 2px solid rgba(255, 255, 255, 0.6);
    border-radius: 50%;
    opacity: 0;
    z-index: 2;
    pointer-events: none;
}
.anim-ripples .r1 { animation: rippleEffect 2s ease-out forwards; }
.anim-ripples .r2 { animation: rippleEffect 2s ease-out 0.3s forwards; }


/* === KEYFRAMES === */

@keyframes elevateLogo {
    0% { transform: scale(0.5); }
    100% { transform: scale(0.65) translateY(-40px); } /* Sube y crece */
}

@keyframes dropLogo {
    0% { transform: scale(0.65) translateY(-40px); }
    100% { transform: scale(0.5) translateY(0); } /* Cae a su posición original con fuerza */
}

@keyframes floatingBob {
    0% { transform: scale(0.5) translateY(0); }
    20% { transform: scale(0.55, 0.45) translateY(15px); } /* Aplastamiento por impacto */
    40% { transform: scale(0.48, 0.52) translateY(-10px); } /* Rebote arriba */
    60% { transform: scale(0.51, 0.49) translateY(5px); } /* Rebote abajo suave */
    80% { transform: scale(0.5) translateY(-2px); }
    100% { transform: scale(0.5) translateY(0); } /* Quieto */
}

@keyframes expandHole {
    0% {
        -webkit-mask-image: radial-gradient(circle at center, transparent 0%, black 0%);
        mask-image: radial-gradient(circle at center, transparent 0%, black 0%);
    }
    100% {
        /* El agujero crece hasta cubrir toda la pantalla (150% radius) */
        -webkit-mask-image: radial-gradient(circle at center, transparent 150%, black 150%);
        mask-image: radial-gradient(circle at center, transparent 150%, black 150%);
        opacity: 0; /* Al final desaparece para evitar bugs de render */
    }
}

@keyframes rippleEffect {
    0% { width: 0; height: 0; opacity: 0.8; border-width: 5px; }
    100% { width: 150vw; height: 150vw; opacity: 0; border-width: 0px; }
}
3. JavaScript de Control (La Coreografía)

Este script controla los tiempos exactos. Espera a que cargue la web, luego eleva el logo, luego lo deja caer, y en el momento exacto del impacto, detona las ondas y la apertura.

code
Html
play_circle
download
content_copy
expand_less
<script>
    (function() {
        // Configuración
        const MIN_CYCLES = 2; 
        
        // Elementos DOM
        const bgLayer = document.getElementById('loader-bg-layer');
        const logoLayer = document.getElementById('loader-logo-layer');
        const rippleLayer = document.getElementById('loader-ripple-layer');
        const logoWrapper = document.getElementById('loader-logo-layer'); // Contenedor para clases
        
        // Estado
        let pageLoaded = false;
        let cyclesCompleted = 0;
        let exitSequenceStarted = false;
        
        // Listener del dibujo inicial (letra D)
        const lastAnimationElement = document.querySelector('.str5');

        function startSequence() {
            if (exitSequenceStarted) return;
            exitSequenceStarted = true;

            // 1. Detener loop de dibujo
            if (window.loaderStopLoop) window.loaderStopLoop();

            console.log("Iniciando secuencia cinematográfica...");

            // FASE 1: ELEVACIÓN (Latido/Subida)
            logoWrapper.classList.add('anim-elevate');

            // Esperar que termine de subir (1.5s según CSS)
            setTimeout(() => {
                
                // FASE 2: CAÍDA
                logoWrapper.classList.remove('anim-elevate');
                logoWrapper.classList.add('anim-drop');

                // Esperar a que caiga (0.4s según CSS) para el IMPACTO
                setTimeout(() => {
                    
                    // FASE 3: IMPACTO (El momento de la verdad)
                    
                    // A) El logo rebota y se estabiliza
                    logoWrapper.classList.remove('anim-drop');
                    logoWrapper.classList.add('anim-stabilize');

                    // B) El fondo azul se abre (primera gran onda)
                    bgLayer.classList.add('anim-open-hole');

                    // C) Salen las ondas secundarias
                    rippleLayer.classList.add('anim-ripples');

                    // D) Liberar el scroll de la página (el usuario ya ve el contenido)
                    document.body.classList.remove('loading');

                    // LIMPIEZA:
                    // Después de que el fondo azul desaparece (1.5s), lo quitamos del DOM
                    setTimeout(() => {
                        bgLayer.style.display = 'none';
                    }, 1600);

                    // NOTA PARA EL FUTURO:
                    // Aquí el logo está centrado y quieto. 
                    // En el futuro, agregarás aquí el código para moverlo al Header.
                    // setTimeout(() => { moverLogoAlHeader(); }, 3000);

                }, 400); // Fin de la caída

            }, 1500); // Fin de la elevación
        }

        function checkConditions() {
            if (pageLoaded && cyclesCompleted >= MIN_CYCLES) {
                startSequence();
            }
        }

        window.addEventListener('load', function() {
            pageLoaded = true;
            checkConditions();
        });

        if (lastAnimationElement) {
            lastAnimationElement.addEventListener('animationend', function(e) {
                if (e.animationName === 'drawD') {
                    cyclesCompleted++;
                    checkConditions();
                }
            });
        } else {
            // Fallback
            window.addEventListener('load', function(){
                setTimeout(startSequence, 3000); 
            });
        }
    })();
</script>
Resultado de esta implementación:

Carga: Verás el dibujo técnico del logo sobre azul.

Preparación: El logo terminado se eleva suavemente (toma impulso).

Golpe: Cae rápido hacia el centro.

Splash: Al tocar "fondo", el azul se rasga circularmente revelando tu web.

Estabilidad: El logo se queda ahí, rebotando un poco como si flotara en el aire/agua sobre tu sitio web, esperando tus instrucciones futuras para irse al header.