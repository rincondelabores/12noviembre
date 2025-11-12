// --- BASE DE DATOS DE TALLAS ---
const SIZING_DATABASE = {
    // Bebés (Las claves deben coincidir con el 'value' del HTML)
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

    // Adultos
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


/**
 * Distribuye los puntos iniciales del escote según la regla 1/3, 1/3, 1/3
 * y ajusta los puntos sobrantes según la prioridad.
 */
function distribuirRagland(totalPuntos, esChaqueta) {
    
    // 1. Inicializar Puntos
    let puntosEspalda, puntosDelantero, puntosManga;
    let puntosRaglan = 4; // Los 4 puntos de las líneas de raglán (1p en cada línea)
    
    // Validar que hay suficientes puntos
    if (totalPuntos <= (puntosRaglan + 3)) { // Necesita al menos 1p por sección + raglán
        throw new Error(`Puntos de montaje insuficientes (${totalPuntos}p). Se necesita un mínimo de 8p para repartir. Revisa la muestra o el cuello.`);
    }
    
    let puntosARepartir = totalPuntos - puntosRaglan;

    // 2. Reparto inicial 1/3
    let parte = Math.floor(puntosARepartir / 3);
    let sobrante = puntosARepartir % 3; // Puede ser 0, 1 o 2

    // Inicialización base
    puntosEspalda = parte;
    puntosDelantero = parte; // Total para el/los delanteros
    puntosManga = parte;     // Total para las dos mangas

    // 3. Gestión del Sobrante (Tu regla: 1 para espalda, si hay 2, 1 del y 1 esp)
    if (sobrante === 1) {
        puntosEspalda += 1;
    } else if (sobrante === 2) {
        puntosDelantero += 1;
        puntosEspalda += 1;
    }

    // 4. Ajustar Delantero y Mangas
    
    // 4.1. Delantero (Si es chaqueta, debe ser par para dividir en dos)
    if (esChaqueta) {
        if (puntosDelantero % 2 !== 0) {
            // Si es impar, le damos 1 punto (quitándoselo a la espalda)
            puntosDelantero += 1;
            puntosEspalda -= 1; 
        }
        puntosDelantero = Math.floor(puntosDelantero / 2); // Repartir el delantero en dos (Delantero Izq y Der)
    }
    
    // 4.2. Mangas (El total de mangas debe ser par para dividir en dos)
    if (puntosManga % 2 !== 0) {
        puntosManga -= 1; // Quitar 1 punto de la manga total
        puntosEspalda += 1; // Dárselo a la espalda (según tu regla)
    }
    puntosManga = Math.floor(puntosManga / 2); // Repartir la manga total en dos (Manga 1 y Manga 2)

    // 5. Devolver Resultado
    let chequeo = (esChaqueta ? (puntosDelantero * 2) : puntosDelantero) + puntosEspalda + (puntosManga * 2) + 4;
    
    if (chequeo !== totalPuntos) {
         console.warn(`Error de lógica en el reparto de raglán. Total no coincide. ${chequeo} !== ${totalPuntos}`);
         // Ajuste final por si el redondeo quitó puntos
         let diferencia = totalPuntos - chequeo;
         puntosEspalda += diferencia; // El ajuste final siempre a la espalda
         chequeo = (esChaqueta ? (puntosDelantero * 2) : puntosDelantero) + puntosEspalda + (puntosManga * 2) + 4;
    }
    
    return {
        puntoRagland: 1, 
        espalda: puntosEspalda,
        delantero: puntosDelantero, // Es el total (Jersey) o la mitad (Chaqueta)
        manga: puntosManga, // Es una manga
        esChaqueta: esChaqueta,
        puntosTotalesChequeo: chequeo
    };
}


// --- RESTO DEL SCRIPT DENTRO DE DOMContentLoaded ---

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

    // Maneja TODOS los botones "btn-prev" (los de Volver y Modificar Datos)
    prevButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (currentStep > 1) {
                showStep(currentStep - 1);
            }
        });
    });
    
    btnStartOver.addEventListener('click', () => {
        showStep(1);
        form.reset(); 
    });
    

    // --- 2. VALIDACIÓN EN TIEMPO REAL ---

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
        e.preventDefault(); 
        
        try {
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            generarPatron(data);
        } catch (error) {
            console.error(error); 
            mostrarError(`Error crítico en el cálculo: ${error.message}`);
        }
        
        showStep(4);
    });

    /**
     * Función principal que genera el patrón.
     */
    function generarPatron(data) {
        
        // --- A. RECOGER DATOS DE ENTRADA ---
        const pts10 = parseFloat(data.pts10);
        const rows10 = parseFloat(data.rows10);
        const tallaId = data.talla;
        const metodo = data.metodo;
        const tipoPrenda = data.tipo_prenda; // 'chaqueta' o 'jersey'
        const esChaqueta = (tipoPrenda === 'chaqueta');

        // --- B. COMPROBACIONES Y LÓGICA DE MVP ---
        const tallaData = SIZING_DATABASE[tallaId];
        
        if (!tallaData) {
            throw new Error(`La talla seleccionada ('${tallaId}') no se encontró en la base de datos.`);
        }

        if (metodo !== 'top-down') {
            throw new Error("Lo sentimos, la lógica 'Bottom-Up' aún no está implementada.");
        }
        
        if (!pts10 || !rows10 || pts10 <= 0 || rows10 <= 0) {
             throw new Error("La muestra (puntos y pasadas) debe ser un número positivo.");
        }

        // --- C. CÁLCULOS (Lógica Top-Down) ---
        
        const pts_cm = pts10 / 10;
        const rows_cm = rows10 / 10;
        const talla_cm = tallaData.pecho;
        
        // HOLGURA: TODO: Leer la holgura del formulario 'data.ajuste'
        const ease_cm = 5.0; // Usamos 5cm fijos (ajuste "normal")
        const circ_obj_cm = talla_cm + ease_cm;
        
        const neck_cm = tallaData.cuello;
        const neck_cast_on_teorico = neck_cm * pts_cm;
        const neck_cast_on = Math.round(neck_cast_on_teorico / 2) * 2; 
        
        // Reparto de los puntos iniciales
        const reparto = distribuirRagland(neck_cast_on, esChaqueta);

        // Aumentos necesarios
        const sisa_pasadas = Math.round(tallaData.sisa * rows_cm);
        const aumentos_rondas = Math.floor(sisa_pasadas / 2); // 1 ronda de aumento cada 2 pasadas
        
        // Puntos finales tras aumentos de raglán
        let sts_delantero_final_real = 0;
        if (esChaqueta) {
             sts_delantero_final_real = reparto.delantero + aumentos_rondas; // Cada delantero (son 2) recibe 1 aumento por ronda
        } else {
             sts_delantero_final_real = reparto.delantero + (aumentos_rondas * 2); // El delantero único recibe 2
        }

        const sts_espalda_final_real = reparto.espalda + (aumentos_rondas * 2);
        const sts_manga_final_real = reparto.manga + (aumentos_rondas * 2);
        
        const total_sts_final_yoke = (esChaqueta ? (sts_delantero_final_real * 2) : sts_delantero_final_real) + sts_espalda_final_real + (sts_manga_final_real * 2) + 4; // +4 por los puntos de raglán

        // Puntos Cuerpo y Manga
        const puntos_sisa_montar = Math.round((pts_cm * 2) / 2) * 2; // (Aprox 2cm). Forzado a ser par.
        const puntos_sisa_mitad = puntos_sisa_montar / 2; // Puntos a añadir a cada lado
        
        const puntos_manga_total = sts_manga_final_real + puntos_sisa_montar;
        const puntos_cuerpo_total = (esChaqueta ? (sts_delantero_final_real * 2) : sts_delantero_final_real) + sts_espalda_final_real + (puntos_sisa_montar * 2);

        // Cálculos de largo
        const largo_cuerpo_cm = tallaData.cuerpo;
        const largo_manga_cm = tallaData.manga;
        const pasadas_cuerpo = Math.round(largo_cuerpo_cm * rows_cm);
        const pasadas_manga = Math.round(largo_manga_cm * rows_cm);

        // --- D. GENERAR SALIDA ---
        
        const etiquetaDelantero = esChaqueta ? `Delanteros (${reparto.delantero}p c/u)` : `Delantero (${reparto.delantero}p)`;
        const etiquetaDelanteroFinal = esChaqueta ? `Delanteros (${sts_delantero_final_real}p c/u)` : `Delantero (${sts_delantero_final_real}p)`;

        // Instrucciones limpias (versión anterior)
        const jsonOutput = {
          "resumen": `Montar **${neck_cast_on}** puntos (Talla ${tallaData.display}). Reparto inicial: Espalda (${reparto.espalda}p), ${etiquetaDelantero}, Mangas (${reparto.manga}p c/u). Tejer ${sisa_pasadas} pasadas de raglán (${aumentos_rondas} rondas de aumento) hasta alcanzar **${total_sts_final_yoke}** puntos. Tejer mangas primero (montando ${puntos_sisa_montar}p en cada sisa) y luego el cuerpo.`,
          "parametros": {
            // ... (parametros internos, ocultos para el usuario)
          },
          "instrucciones": [
            `1. **Montaje del Cuello:** Montar **${neck_cast_on}** puntos.`,
            `2. **Elástico:** Tejer elástico (1x1 o 2x2) durante 2-3 cm.`,
            `3. **Distribución de Puntos (Pasada de preparación):** Colocar marcadores. ${esChaqueta ? `Tejer ${reparto.delantero}p (Delantero Der), PM, 1p (Raglán), PM, ${reparto.manga}p (Manga 1), PM, 1p (Raglán), PM, ${reparto.espalda}p (Espalda), PM, 1p (Raglán), PM, ${reparto.manga}p (Manga 2), PM, 1p (Raglán), PM, ${reparto.delantero}p (Delantero Izq).` : `Tejer ${reparto.delantero}p (Delantero), PM, 1p (Raglán), PM, ${reparto.manga}p (Manga 1), PM, 1p (Raglán), PM, ${reparto.espalda}p (Espalda), PM, 1p (Raglán), PM, ${reparto.manga}p (Manga 2), PM, 1p (Raglán).`}`,
            `4. **Aumentos Raglán:** Tejer durante ${sisa_pasadas} pasadas, realizando **${aumentos_rondas} rondas de aumento** (cada 2 pasadas) a ambos lados de las 4 líneas de raglán.`,
            `5. **Separación de Piezas:** Al finalizar los aumentos, los puntos serán: ${etiquetaDelanteroFinal}, Espalda (${sts_espalda_final_real}p), Mangas (${sts_manga_final_real}p c/u).`,
            `6. **Tejer Manga 1 (Primero):** Poner los puntos del cuerpo (Delanteros y Espalda) en un hilo o aguja auxiliar. Quédate solo con los **${sts_manga_final_real}p** de la Manga 1 en tus agujas.`,
            `7. **Montar Sisa Manga 1:** Sigue tejiendo:
                <ul><li>**Pasada 1 (Derecho):** **Monta ${puntos_sisa_mitad}p nuevos** al inicio de la pasada. Teje hasta el final.</li>
                <li>**Pasada 2 (Revés):** **Monta ${puntos_sisa_mitad}p nuevos** al inicio de la pasada. Teje hasta el final.</li></ul>
                (Total **${puntos_manga_total}p** en la aguja).`,
            `8. **Continuar Manga 1:** Teje recto por **${pasadas_manga}** pasadas (aprox ${largo_manga_cm} cm). Teje elástico de puño y cierra. Corta el hilo.`,
            `9. **Tejer Manga 2:** Retoma los **${sts_manga_final_real}p** de la Manga 2 y repite los pasos 7 y 8.`,
            `10. **Tejer Cuerpo (Segundo):** Retoma todos los puntos del cuerpo que tenías en espera (${ (esChaqueta ? (sts_delantero_final_real * 2) : sts_delantero_final_real) + sts_espalda_final_real}p).`,
            `11. **Unir Cuerpo con Mangas:** Teje el primer delantero. **Recoge ${puntos_sisa_montar}p** del borde de la sisa de la Manga 1 (del borde recto que montaste). Teje la Espalda. **Recoge ${puntos_sisa_montar}p** del borde de la sisa de la Manga 2. Teje el otro delantero. (Total **${puntos_cuerpo_total}p** en la aguja).`,
            `12. **Continuar Cuerpo:** Teje recto por **${pasadas_cuerpo}** pasadas (aprox ${largo_cuerpo_cm} cm).`,
            `13. **Bajo:** Tejer elástico y cerrar todos los puntos.`
          ],
          "advertencias": [] // Vaciado
        };
        
        // Generar el texto HTML a partir del JSON (limpio)
        const textoHTML = `
            <ol>
                ${jsonOutput.instrucciones.map(paso => `<li>${paso.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</li>`).join('')}
            </ol>
        `;

        // Mostrar los resultados
        mostrarResultados(jsonOutput, textoHTML);
    }

    // --- FUNCIONES DE VISUALIZACIÓN (Muestran los resultados o el error) ---

    function mostrarResultados(json, textoHTML) {
        // Limpiamos por si había un error previo
        document.getElementById('instrucciones-texto').classList.remove('alert-critical');
        
        // Usamos innerHTML para el resumen para que pille las negritas
        document.getElementById('resumen-texto').innerHTML = json.resumen.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        document.getElementById('json-output').textContent = JSON.stringify(json, null, 2); 
        document.getElementById('instrucciones-texto').innerHTML = textoHTML;
    }

    function mostrarError(mensaje) {
        document.getElementById('resumen-texto').textContent = "Error en el cálculo";
        document.getElementById('json-output').textContent = `{ "error": "${mensaje}" }`;
        // Mostramos el error en la caja de instrucciones para que sea bien visible
        const errorBox = document.getElementById('instrucciones-texto');
        errorBox.innerHTML = `<p>${mensaje}</p>`;
        errorBox.classList.add('alert-critical'); // Usamos la clase de error que ya definimos
    }
});
