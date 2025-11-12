// Espera a que todo el HTML esté cargado
document.addEventListener('DOMContentLoaded', () => {

    // --- 1. MANEJO DE LA INTERFAZ (UI) DE PASOS ---
    
    const steps = document.querySelectorAll('.step');
    const indicators = document.querySelectorAll('.step-indicator');
    const nextButtons = document.querySelectorAll('.btn-next');
    const prevButtons = document.querySelectorAll('.btn-prev');
    const form = document.getElementById('calc-form');
    const btnStartOver = document.querySelector('.btn-start-over');
    
    let currentStep = 1;

    function showStep(stepNumber) {
        steps.forEach((step, index) => {
            step.classList.toggle('active', (index + 1) === stepNumber);
        });
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', (index + 1) === stepNumber);
        });
        currentStep = stepNumber;
    }

    nextButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (currentStep < 4) {
                showStep(currentStep + 1);
            }
        });
    });

    prevButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (currentStep > 1) {
                showStep(currentStep - 1);
            }
        });
    });
    
    btnStartOver.addEventListener('click', () => {
        showStep(1);
        form.reset(); // Resetea el formulario
    });
    

    // --- 2. VALIDACIÓN EN TIEMPO REAL (Ejemplo) ---

    const ptsInput = document.getElementById('pts10');
    const rowsInput = document.getElementById('rows10');
    const ptsWarning = document.getElementById('pts-warning');
    const rowsWarning = document.getElementById('rows-warning');

    function validateMuestra(input, warningEl) {
        const value = parseFloat(input.value);
        if (value > 0 && (value < 4 || value > 50)) {
            warningEl.style.display = 'block';
            input.style.borderColor = '#c53030';
        } else {
            warningEl.style.display = 'none';
            input.style.borderColor = 'var(--color-borde)';
        }
    }

    ptsInput.addEventListener('input', () => validateMuestra(ptsInput, ptsWarning));
    rowsInput.addEventListener('input', () => validateMuestra(rowsInput, rowsWarning));


    // --- 3. LÓGICA DE CÁLCULO AL ENVIAR EL FORMULARIO ---

    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Evita que la página se recargue
        
        // Recolectar datos del formulario
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());
        
        // Iniciar el proceso de generación
        generarPatron(data);
        
        // Mostrar la pantalla de resultados
        showStep(4);
    });

    /**
     * Función principal que genera el patrón.
     * ESTA ES LA FUNCIÓN MÁS IMPORTANTE A DESARROLLAR.
     * Por ahora, solo simula el CASO DE PRUEBA 1.
     */
    function generarPatron(data) {
        const pts10 = parseFloat(data.pts10);
        const rows10 = parseFloat(data.rows10);
        const talla = data.talla;
        const metodo = data.metodo;

        // ---- INICIO DE LÓGICA DE CÁLCULO ----
        // Esta es la implementación del Caso de Prueba 1
        
        // Solo calculamos si son los datos exactos del test case 1
        if (talla === 'primera-puesta' && pts10 === 22 && rows10 === 30 && metodo === 'top-down') {
            
            // 1. Variables intermedias
            const pts_cm = pts10 / 10; // 2.2
            const rows_cm = rows10 / 10; // 3.0
            
            // 2. Circunferencia objetivo (Datos estándar para 'primera-puesta')
            const talla_cm = 42.0;
            const ease_cm = 5.0; // Para ajuste 'normal'
            const circ_obj_cm = talla_cm + ease_cm; // 47.0 cm
            
            // 3. Puntos totales
            const total_sts_teorico = circ_obj_cm * pts_cm; // 47.0 * 2.2 = 103.4
            
            // 4. Lógica de Raglán (Simplificada para este MVP)
            // Se asume un montaje de cuello de 54p y 6 rondas de aumento
            const neck_cast_on = 54; 
            const aumentos_rondas = 6;
            const puntos_aumentados = aumentos_rondas * 8; // 8p por ronda de raglán
            const total_sts_ajustado = neck_cast_on + puntos_aumentados; // 54 + 48 = 102 puntos
            const circ_final_cm = total_sts_ajustado / pts_cm; // 102 / 2.2 = 46.36 cm
            
            // 5. Cálculos de largo
            const largo_cuerpo_cm = 14;
            const largo_manga_cm = 15;
            const pasadas_cuerpo = Math.round(largo_cuerpo_cm * rows_cm); // 14 * 3 = 42
            const pasadas_manga = Math.round(largo_manga_cm * rows_cm); // 15 * 3 = 45

            // 6. Generar el JSON de salida
            const jsonOutput = {
              "resumen": "Montar 54 puntos para el cuello. Tejer 12 pasadas (aprox 4 cm) en elástico 1x1. Continuar 12 pasadas (6 rondas de aumento) en punto jersey, realizando aumentos de raglán cada 2 pasadas hasta alcanzar 102 puntos. Separar 21 puntos para cada manga y continuar el cuerpo (64 puntos) recto durante 42 pasadas (aprox 14 cm).",
              "parametros": {
                "pts10": pts10,
                "rows10": rows10,
                "pts_cm": pts_cm,
                "rows_cm": rows_cm,
                "circ_obj_cm": circ_obj_cm,
                "total_sts": total_sts_teorico,
                "total_sts_ajustado": total_sts_ajustado
              },
              "instrucciones": [
                "1. Montaje del cuello: Montar 54 puntos. Une en redondo (si es jersey) o empieza a tejer plano (si es chaqueta).",
                "2. Elástico: Tejer 12 pasadas (aprox 4 cm) en elástico 1x1 (1 punto derecho, 1 punto revés).",
                "3. Preparación Raglán (Pasada de Marcadores): Tejer 8p (Delantero), PM, 1p (Raglán), PM, 9p (Manga), PM, 1p (Raglán), PM, 16p (Espalda), PM, 1p (Raglán), PM, 9p (Manga), PM, 1p (Raglán), PM, 8p (Delantero). (Total = 54p).",
                "4. Inicio Aumentos Raglán (Pasada 1 - Derecho): Tejer hasta 1p antes del marcador, Aumentar 1p (M1L), tejer 1p (raglán), Aumentar 1p (M1R). Repetir 4 veces. (Total = 62p).",
                "5. Pasada 2 (Revés): Tejer todos los puntos del revés (sin aumentos).",
                "6. Calendario de Aumentos (Pasadas 3-12): Repetir los pasos 4 y 5, 5 veces más (Total 6 rondas de aumento).",
                "7. Resultado Tras Aumentos (Total 102 puntos): Delantero(14p), Manga(21p), Espalda(28p), Manga(21p), Delantero(14p). (Puntos de raglán se unen a las secciones).",
                "8. Separación de Mangas: Tejer 14p (Delantero), poner 21p (Manga 1) en espera, montar 4p nuevos (sisa), tejer 28p (Espalda), poner 21p (Manga 2) en espera, montar 4p nuevos (sisa), tejer 14p (Delantero).",
                "9. Cuerpo: Continuar tejiendo los puntos del cuerpo (14+4+28+4+14 = 64 puntos) durante 42 pasadas (aprox 14 cm).",
                "10. Bajo: Tejer 10 pasadas en elástico 1x1. Cerrar todos los puntos.",
                "11. Mangas (Repetir 2 veces): Recoger 21p en espera + 4p de la sisa. (Total 25 puntos). Tejer 45 pasadas (aprox 15 cm).",
                "12. Puños: Tejer 8 pasadas en elástico 1x1. Cerrar."
              ],
              "advertencias": ["Advertencia (Redondeo): El contorno objetivo (47.0 cm) se ajustó a 46.36 cm (102 puntos) para que los aumentos de raglán sean consistentes."]
            };

            // 7. Generar el texto HTML
            const textoHTML = `
                <ol>
                    ${jsonOutput.instrucciones.map(paso => `<li>${paso}</li>`).join('')}
                </ol>
            `;
            
            // 8. Mostrar los resultados
            mostrarResultados(jsonOutput, textoHTML);

        } else {
            // Caso para cualquier otra combinación de entradas (no implementada aún)
            mostrarError("Lo sentimos, la lógica de cálculo para esta combinación específica de talla, muestra y método aún no está implementada en este MVP. Solo el caso de prueba 'Primera Puesta' (22p/30r) está activo.");
        }
    }

    /**
     * Muestra los resultados en la pantalla
     */
    function mostrarResultados(json, textoHTML) {
        document.getElementById('resumen-texto').textContent = json.resumen;
        document.getElementById('json-output').textContent = JSON.stringify(json, null, 2); // 'null, 2' formatea el JSON
        document.getElementById('instrucciones-texto').innerHTML = textoHTML;
    }

    /**
     * Muestra un mensaje de error
     */
    function mostrarError(mensaje) {
        document.getElementById('resumen-texto').textContent = "Error en el cálculo";
        document.getElementById('json-output').textContent = `{ "error": "${mensaje}" }`;
        document.getElementById('instrucciones-texto').innerHTML = `<p class="alert-critical">${mensaje}</p>`;
    }
});
