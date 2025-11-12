// --- BASE DE DATOS DE TALLAS ---
// Medidas corporales estándar en CM. La holgura se añade después.
const SIZING_DATABASE = {
    // Bebés
    "primera-puesta": { display: "Primera Puesta", pecho: 40, cuello: 25.0, sisa: 10.0, manga: 15, cuerpo: 16, muneca: 9.0 },
    "1-3m": { display: "1–3 Meses", pecho: 42, cuello: 25.5, sisa: 10.5, manga: 17, cuerpo: 17, muneca: 10.0 },
    "3-6m": { display: "3–6 Meses", pecho: 44, cuello: 26.0, sisa: 11.5, manga: 19, cuerpo: 19, muneca: 11.0 },
    "6-9m": { display: "6–9 Meses", pecho: 46, cuello: 26.5, sisa: 12.0, manga: 21, cuerpo: 21, muneca: 11.5 },
    "9-12m": { display: "9–12 Meses", pecho: 48, cuello: 27.0, sisa: 12.5, manga: 23, cuerpo: 22, muneca: 12.0 },
    "12-15m": { display: "12–15 Meses", pecho: 50, cuello: 27.5, sisa: 13.0, manga: 25, cuerpo: 23, muneca: 12.5 },
    "15-18m": { display: "15–18 Meses", pecho: 51, cuello: 27.8, sisa: 13.5, manga: 26, cuerpo: 23, muneca: 13.0 },
    "18-24m": { display: "18–24 Meses", pecho: 53, cuello: 28.0, sisa: 14.5, manga: 28, cuerpo: 24, muneca: 13.5 },
    
    // Infantiles
    "3-4a": { display: "3–4 Años", pecho: 58, cuello: 29.0, sisa: 15.0, manga: 30, cuerpo: 26, muneca: 14.0 },
    "5-6a": { display: "5–6 Años", pecho: 64, cuello: 30.0, sisa: 16.0, manga: 34, cuerpo: 28, muneca: 14.5 },
    "7-8a": { display: "7–8 Años", pecho: 70, cuello: 31.0, sisa: 17.0, manga: 38, cuerpo: 30, muneca: 15.0 },
    "9-10a": { display: "9–10 Años", pecho: 76, cuello: 32.0, sisa: 18.0, manga: 42, cuerpo: 32, muneca: 15.5 },

    // Adultos (Las claves 36, 38, etc. deben coincidir con el 'value' del HTML)
    "36": { display: "EU 36", pecho: 84, cuello: 34.7, sisa: 17.2, manga: 43, cuerpo: 38, muneca: 16.5 },
    "38": { display: "EU 38", pecho: 88, cuello: 35.8, sisa: 17.6, manga: 43, cuerpo: 38, muneca: 17.0 },
    "40": { display: "EU 40", pecho: 92, cuello: 36.9, sisa: 18.0, manga: 44, cuerpo: 39, muneca: 17.0 },
    "42": { display: "EU 42", pecho: 96, cuello: 38.0, sisa: 18.4, manga: 44, cuerpo: 39, muneca: 17.5 },
    "44": { display: "EU 44", pecho: 100, cuello: 39.1, sisa: 18.8, manga: 45, cuerpo: 40, muneca: 17.5 },
    "46": { display: "EU 46", pecho: 106, cuello: 40.2, sisa: 19.2, manga: 45, cuerpo: 40, muneca: 18.0 },
    "48": { display: "EU 48", pecho: 112, cuello: 41.3, sisa: 19.6, manga: 46, cuerpo: 41, muneca: 18.0 },
    "50": { display: "EU 50", pecho: 118, cuello: 42.4, sisa: 20.0, manga: 46, cuerpo: 41, muneca: 18.5 }
};
// --- FIN DE LA BASE DE DATOS ---


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
     */
    function generarPatron(data) {
        
        // --- A. RECOGER DATOS DE ENTRADA ---
        const pts10 = parseFloat(data.pts10);
        const rows10 = parseFloat(data.rows10);
        const tallaId = data.talla; // p.ej. "primera-puesta", "3-6m", "38"
        const metodo = data.metodo;

        // --- B. COMPROBACIONES Y LÓGICA DE MVP ---
        
        // 1. Buscar la talla en la base de datos
        const tallaData = SIZING_DATABASE[tallaId];
        
        if (!tallaData) {
            mostrarError("La talla seleccionada no se encontró en la base de datos.");
            return;
        }

        // 2. Por ahora, solo funciona el método Top-Down
        if (metodo !== 'top-down') {
            mostrarError("Lo sentimos, la lógica de cálculo para el método 'Bottom-Up' aún no está implementada en este MVP. Por favor, selecciona 'Top-Down (Raglán)'.");
            return;
        }

        // --- C. CÁLCULOS (Lógica Top-Down) ---
        
        // 1. Variables intermedias
        const pts_cm = pts10 / 10;
        const rows_cm = rows10 / 10;
        
        // 2. Circunferencia objetivo (¡Ahora usa la base de datos!)
        const talla_cm = tallaData.pecho;
        
        // TODO: Leer la holgura desde el input 'data.ajuste'
        // Por ahora, usamos 5cm fijos (ajuste "normal" para bebé)
        const ease_cm = 5.0; 
        const circ_obj_cm = talla_cm + ease_cm;
        
        // 3. Puntos totales
        const total_sts_teorico = circ_obj_cm * pts_cm;

        // 4. Lógica de Raglán (Simplificada para este MVP)
        // Usamos el cuello y la sisa de la base de datos
        const neck_cm = tallaData.cuello;
        const neck_cast_on_teorico = neck_cm * pts_cm;
        
        // --- Lógica de redondeo y ajuste (MUY simplificada) ---
        // Ajustamos el montaje a un múltiplo de 2
        const neck_cast_on = Math.round(neck_cast_on_teorico / 2) * 2;
        
        // Calculamos los aumentos necesarios
        const sisa_pasadas = Math.round(tallaData.sisa * rows_cm);
        // Si tejemos plano, 1 pasada de aumento cada 2 pasadas (solo pasadas del derecho)
        const aumentos_rondas = Math.floor(sisa_pasadas / 2);
        
        const puntos_aumentados = aumentos_rondas * 8; // 8p por ronda de raglán
        const total_sts_ajustado = neck_cast_on + puntos_aumentados;
        
        
        // 5. Cálculos de largo (¡Ahora usa la base de datos!)
        const largo_cuerpo_cm = tallaData.cuerpo;
        const largo_manga_cm = tallaData.manga;
        const pasadas_cuerpo = Math.round(largo_cuerpo_cm * rows_cm);
        const pasadas_manga = Math.round(largo_manga_cm * rows_cm);
        
        // 6. Distribución (Simplificada)
        // Esto es un ejemplo, la lógica de distribución real es más compleja
        const puntos_manga_aprox = Math.round((total_sts_ajustado * 0.2) / 2) * 2; // 20% para cada manga
        const puntos_cuerpo_restantes = total_sts_ajustado - (puntos_manga_aprox * 2);
        const puntos_espalda = Math.round((puntos_cuerpo_restantes / 2) / 2) * 2;
        const puntos_delantero = puntos_cuerpo_restantes - puntos_espalda;
        const puntos_sisa_montar = Math.round(pts_cm * 2); // Montar 2cm en sisa
        const puntos_cuerpo_total = puntos_delantero + puntos_espalda + (puntos_sisa_montar * 2);

        // --- D. GENERAR SALIDA ---
        
        // 7. Generar el JSON de salida
        const jsonOutput = {
          "resumen": `Montar ${neck_cast_on} puntos para el cuello (Talla: ${tallaData.display}). Realizar ${aumentos_rondas} rondas de aumento de raglán (aprox ${tallaData.sisa} cm) hasta alcanzar ${total_sts_ajustado} puntos. Separar ${puntos_manga_aprox} puntos para cada manga. Continuar el cuerpo (${puntos_cuerpo_total} puntos) recto durante ${pasadas_cuerpo} pasadas (aprox ${largo_cuerpo_cm} cm).`,
          "parametros": {
            "pts10": pts10,
            "rows10": rows10,
            "pts_cm": pts_cm,
            "rows_cm": rows_cm,
            "talla_seleccionada": tallaId,
            "talla_pecho_base_cm": talla_cm,
            "ease_cm": ease_cm,
            "circ_obj_cm": circ_obj_cm,
            "total_sts_teorico": total_sts_teorico,
            "total_sts_ajustado": total_sts_ajustado,
            "neck_cast_on": neck_cast_on,
            "pasadas_sisa": sisa_pasadas,
            "pasadas_cuerpo": pasadas_cuerpo,
            "pasadas_manga": pasadas_manga
          },
          "instrucciones": [
            `1. Montaje del cuello (Talla ${tallaData.display}): Montar ${neck_cast_on} puntos.`,
            `2. Elástico: Tejer elástico (1x1 o 2x2) durante aprox 2-3 cm.`,
            `3. Preparación Raglán: Distribuir puntos y colocar 4 marcadores de raglán (la lógica de distribución exacta debe implementarse).`,
            `4. Aumentos Raglán: Tejer ${sisa_pasadas} pasadas (aprox ${tallaData.sisa} cm), realizando aumentos de raglán cada 2 pasadas (${aumentos_rondas} rondas de aumento).`,
            `5. Resultado Tras Aumentos: Total ${total_sts_ajustado} puntos.`,
            `6. Separación de Mangas: Poner ${puntos_manga_aprox} puntos de cada manga en espera. Montar ${puntos_sisa_montar} puntos nuevos para la sisa.`,
            `7. Cuerpo: Continuar tejiendo los ${puntos_cuerpo_total} puntos del cuerpo durante ${pasadas_cuerpo} pasadas (aprox ${largo_cuerpo_cm} cm).`,
            `8. Bajo: Tejer elástico y cerrar puntos.`,
            `9. Mangas: Recoger ${puntos_manga_aprox} puntos en espera + ${puntos_sisa_montar} puntos de la sisa. Tejer recto durante ${pasadas_manga} pasadas (aprox ${largo_manga_cm} cm), disminuir para puño y cerrar.`
          ],
          "advertencias": ["Resultados basados en lógica MVP (Top-Down). La distribución de puntos de raglán y las disminuciones de puño son aproximadas y deben detallarse."]
        };

        // 8. Generar el texto HTML
        const textoHTML = `
            <ol>
                ${jsonOutput.instrucciones.map(paso => `<li>${paso}</li>`).join('')}
            </ol>
            <div class="alert-critical">${jsonOutput.advertencias[0]}</div>
        `;
        
        // 9. Mostrar los resultados
        mostrarResultados(jsonOutput, textoHTML);
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
