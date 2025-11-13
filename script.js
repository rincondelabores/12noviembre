// --- BASE DE DATOS DE TALLAS (CON NUEVAS MEDIDAS) ---
const SIZING_DATABASE = {
    // Bebés
    "primera-puesta": { display: "Primera Puesta", pecho: 40, cuello: 25.0, sisa: 10.0, manga: 15, cuerpo: 16, muneca: 9.0, contorno_brazo: 15, ancho_escote: 10, caida_escote: 4.5 },
    "1-3m": { display: "1–3 Meses", pecho: 42, cuello: 25.5, sisa: 10.5, manga: 17, cuerpo: 17, muneca: 10.0, contorno_brazo: 16, ancho_escote: 11, caida_escote: 5.0 },
    "3-6m": { display: "3–6 Meses", pecho: 44, cuello: 26.0, sisa: 11.5, manga: 19, cuerpo: 19, muneca: 11.0, contorno_brazo: 17, ancho_escote: 11, caida_escote: 5.0 },
    "6-9m": { display: "6–9 Meses", pecho: 46, cuello: 26.5, sisa: 12.0, manga: 21, cuerpo: 21, muneca: 11.5, contorno_brazo: 17.5, ancho_escote: 12, caida_escote: 5.5 },
    "9-12m": { display: "9–12 Meses", pecho: 48, cuello: 27.0, sisa: 12.5, manga: 23, cuerpo: 22, muneca: 12.0, contorno_brazo: 18, ancho_escote: 12, caida_escote: 5.5 },
    "12-15m": { display: "12–15 Meses", pecho: 50, cuello: 27.5, sisa: 13.0, manga: 25, cuerpo: 23, muneca: 12.5, contorno_brazo: 18.5, ancho_escote: 12.5, caida_escote: 5.5 },
    "15-18m": { display: "15–18 Meses", pecho: 51, cuello: 27.8, sisa: 13.5, manga: 26, cuerpo: 23, muneca: 13.0, contorno_brazo: 19, ancho_escote: 13, caida_escote: 6.0 },
    "18-24m": { display: "18–24 Meses", pecho: 53, cuello: 28.0, sisa: 14.5, manga: 28, cuerpo: 24, muneca: 13.5, contorno_brazo: 20, ancho_escote: 13, caida_escote: 6.0 },
    
    // Infantiles
    "3-4a": { display: "3–4 Años", pecho: 58, cuello: 29.0, sisa: 15.0, manga: 30, cuerpo: 26, muneca: 14.0, contorno_brazo: 21, ancho_escote: 14, caida_escote: 6.0 },
    "5-6a": { display: "5–6 Años", pecho: 64, cuello: 30.0, sisa: 16.0, manga: 34, cuerpo: 28, muneca: 14.5, contorno_brazo: 22, ancho_escote: 14.5, caida_escote: 6.5 },
    "7-8a": { display: "7–8 Años", pecho: 70, cuello: 31.0, sisa: 17.0, manga: 38, cuerpo: 30, muneca: 15.0, contorno_brazo: 24, ancho_escote: 15, caida_escote: 7.0 },
    "9-10a": { display: "9–10 Años", pecho: 76, cuello: 32.0, sisa: 18.0, manga: 42, cuerpo: 32, muneca: 15.5, contorno_brazo: 25, ancho_escote: 15.5, caida_escote: 7.0 },

    // Adultos
    "36": { display: "EU 36", pecho: 84, cuello: 34.7, sisa: 17.2, manga: 43, cuerpo: 38, muneca: 16.5, contorno_brazo: 27, ancho_escote: 16, caida_escote: 7.5 },
    "38": { display: "EU 38", pecho: 88, cuello: 35.8, sisa: 17.6, manga: 43, cuerpo: 38, muneca: 17.0, contorno_brazo: 28, ancho_escote: 16.5, caida_escote: 8.0 },
    "40": { display: "EU 40", pecho: 92, cuello: 36.9, sisa: 18.0, manga: 44, cuerpo: 39, muneca: 17.0, contorno_brazo: 29, ancho_escote: 17, caida_escote: 8.0 },
    "42": { display: "EU 42", pecho: 96, cuello: 38.0, sisa: 18.4, manga: 44, cuerpo: 39, muneca: 17.5, contorno_brazo: 30, ancho_escote: 17.5, caida_escote: 8.5 },
    "44": { display: "EU 44", pecho: 100, cuello: 39.1, sisa: 18.8, manga: 45, cuerpo: 40, muneca: 17.5, contorno_brazo: 31, ancho_escote: 18, caida_escote: 8.5 },
    "46": { display: "EU 46", pecho: 106, cuello: 40.2, sisa: 19.2, manga: 45, cuerpo: 40, muneca: 18.0, contorno_brazo: 33, ancho_escote: 19, caida_escote: 9.0 },
    "48": { display: "EU 48", pecho: 112, cuello: 41.3, sisa: 19.6, manga: 46, cuerpo: 41, muneca: 18.0, contorno_brazo: 34, ancho_escote: 19.5, caida_escote: 9.0 },
    "50": { display: "EU 50", pecho: 118, cuello: 42.4, sisa: 20.0, manga: 46, cuerpo: 41, muneca: 18.5, contorno_brazo: 35, ancho_escote: 20, caida_escote: 9.5 }
};
// --- FIN DE LA BASE DE DATOS ---


/**
 * Distribuye los puntos iniciales del escote (Top-Down).
 */
function distribuirRagland(totalPuntos, esChaqueta) {
    let puntosEspalda, puntosDelantero, puntosManga;
    let puntosRaglan = 4;
    
    if (totalPuntos <= (puntosRaglan + 3)) { 
        throw new Error(`Puntos de montaje insuficientes (${totalPuntos}p). Se necesita un mínimo de 8p para repartir.`);
    }
    
    let puntosARepartir = totalPuntos - puntosRaglan;
    let parte = Math.floor(puntosARepartir / 3);
    let sobrante = puntosARepartir % 3; 

    puntosEspalda = parte;
    puntosDelantero = parte; 
    puntosManga = parte;     

    if (sobrante === 1) {
        puntosEspalda += 1;
    } else if (sobrante === 2) {
        puntosDelantero += 1;
        puntosEspalda += 1;
    }

    if (esChaqueta) {
        if (puntosDelantero % 2 !== 0) {
            puntosDelantero += 1;
            puntosEspalda -= 1; 
        }
        puntosDelantero = Math.floor(puntosDelantero / 2); 
    }
    
    if (puntosManga % 2 !== 0) {
        puntosManga -= 1; 
        puntosEspalda += 1;
    }
    puntosManga = Math.floor(puntosManga / 2); 

    let chequeo = (esChaqueta ? (puntosDelantero * 2) : puntosDelantero) + puntosEspalda + (puntosManga * 2) + 4;
    
    if (chequeo !== totalPuntos) {
         let diferencia = totalPuntos - chequeo;
         puntosEspalda += diferencia; 
         chequeo = (esChaqueta ? (puntosDelantero * 2) : puntosDelantero) + puntosEspalda + (puntosManga * 2) + 4;
    }
    
    return {
        puntoRagland: 1, 
        espalda: puntosEspalda,
        delantero: puntosDelantero, 
        manga: puntosManga, 
        esChaqueta: esChaqueta,
        puntosTotalesChequeo: chequeo
    };
}


// --- RESTO DEL SCRIPT DENTRO DE DOMContentLoaded ---

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. MANEJO DE LA INTERFAZ (UI) DE PANTALLA ÚNICA ---
    
    const form = document.getElementById('calc-form');
    const resultadoContainer = document.getElementById('resultado-container');
    const btnModificar = document.getElementById('btn-modificar');
    const tallaSelect = document.getElementById('talla');
    const tallaInfoBox = document.getElementById('talla-info-box');
    
    const metodoRadios = document.querySelectorAll('input[name="metodo"]');
    const seccionPrenda = document.getElementById('seccion-prenda');
    const seccionTalla = document.getElementById('seccion-talla');
    const seccionCalcRapida = document.getElementById('calculadora-rapida-group');

    // --- 2. MOSTRAR INFO DE TALLA AL SELECCIONAR ---
    tallaSelect.addEventListener('change', () => {
        const tallaId = tallaSelect.value;
        const data = SIZING_DATABASE[tallaId];
        if (data) {
            tallaInfoBox.innerHTML = `<b>Medidas estándar (cuerpo):</b><br>Pecho: ${data.pecho}cm, Brazo: ${data.contorno_brazo}cm, Cuello: ${data.cuello}cm`;
            tallaInfoBox.style.display = 'block';
        } else {
            tallaInfoBox.style.display = 'none';
        }
    });
    // Disparar una vez al cargar la página
    tallaSelect.dispatchEvent(new Event('change'));

    // --- 3. MOSTRAR/OCULTAR SECCIONES SEGÚN MÉTODO ---
    metodoRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            const metodo = e.target.value;
            if (metodo === 'calculadora-rapida') {
                seccionPrenda.disabled = true;
                seccionTalla.disabled = true;
                seccionPrenda.classList.add('disabled');
                seccionTalla.classList.add('disabled');
                seccionCalcRapida.style.display = 'block';
            } else {
                seccionPrenda.disabled = false;
                seccionTalla.disabled = false;
                seccionPrenda.classList.remove('disabled');
                seccionTalla.classList.remove('disabled');
                seccionCalcRapida.style.display = 'none';
            }
        });
    });
    
    // --- 4. LÓGICA DE CÁLCULO AL ENVIAR EL FORMULARIO ---

    form.addEventListener('submit', (e) => {
        e.preventDefault(); 
        
        try {
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            generarPatron(data);
            
            form.style.display = 'none';
            resultadoContainer.style.display = 'block';
            window.scrollTo(0, 0); 

        } catch (error) {
            console.error(error); 
            mostrarError(`Error crítico en el cálculo: ${error.message}`);
            form.style.display = 'none';
            resultadoContainer.style.display = 'block';
            window.scrollTo(0, 0); 
        }
    });

    // --- 5. LÓGICA DEL BOTÓN "MODIFICAR DATOS" ---
    btnModificar.addEventListener('click', () => {
        resultadoContainer.style.display = 'none';
        form.style.display = 'block';
    });


    /**
     * Función principal que genera el patrón.
     */
    function generarPatron(data) {
        
        // --- A. RECOGER DATOS DE ENTRADA ---
        const pts10 = parseFloat(data.pts10);
        const rows10 = parseFloat(data.rows10); // Puede ser NaN o 0
        const tallaId = data.talla;
        const metodo = data.metodo;
        const tipoPrenda = data.tipo_prenda; 
        const esChaqueta = (tipoPrenda === 'chaqueta');

        // (NUEVO) Comprobar si tenemos datos de pasadas
        const hasRowsData = (rows10 && rows10 > 0);
        let rows_cm = 0;
        if (hasRowsData) {
            rows_cm = rows10 / 10;
        }

        // --- B. COMPROBACIONES ---
        if (!pts10 || pts10 <= 0) {
             throw new Error("¡Uy! Necesito que me digas cuántos puntos tienes en 10 cm.");
        }
        
        let jsonOutput;
        const pts_cm = pts10 / 10;
        
        // (NUEVO) Leer holgura de los botones
        let ease_cm = 0;
        if (data.ajuste === 'normal') ease_cm = 5.0;
        else if (data.ajuste === 'ajustado') ease_cm = 2.0;
        else if (data.ajuste === 'holgado') ease_cm = 10.0;
        
        // (NUEVO) Funciones auxiliares para CM y Pasadas
        const addRowInfo = (cm) => {
            if (!hasRowsData) return `(aprox. ${cm.toFixed(1)} cm)`;
            const pasadas = Math.round(cm * rows_cm);
            return `(aprox. ${cm.toFixed(1)} cm / ${pasadas} pasadas)`;
        };
        const addRowInfoOnly = (cm) => {
             if (!hasRowsData) return ``;
             const pasadas = Math.round(cm * rows_cm);
             return `(aprox. ${pasadas} pasadas)`;
        };
        const addCmInfo = (puntos) => {
            const cm = (puntos / pts_cm).toFixed(1);
            return `(aprox. ${cm} cm)`;
        }

        
        // --- C. LÓGICA DE CÁLCULO (Enrutador) ---
        
        if (metodo === 'calculadora-rapida') {
            // --- C.1 LÓGICA CALCULADORA RÁPIDA ---
            const cm_a_tejer = parseFloat(data.cm_a_tejer);
            if (!cm_a_tejer || cm_a_tejer <= 0) {
                throw new Error("Debes introducir los centímetros que quieres tejer.");
            }
            const puntos_totales = Math.round(cm_a_tejer * pts_cm);
            
            jsonOutput = {
                "resumen": `Para tejer **${cm_a_tejer} cm** con tu muestra, necesitas montar **${puntos_totales} puntos**.`,
                "instrucciones": [
                    `1. **Tu Muestra:** ${pts10} puntos en 10 cm (eso son ${pts_cm.toFixed(1)} puntos por cm).`,
                    `2. **Tu Cálculo:** ${cm_a_tejer} cm x ${pts_cm.toFixed(1)} p/cm = ${puntos_totales.toFixed(1)} puntos.`,
                    `3. **Resultado:** ¡Te recomiendo montar **${puntos_totales} puntos**!`
                ]
            };

        } else if (metodo === 'top-down') {
            // --- C.2 LÓGICA TOP-DOWN (RAGLÁN) ---
            const tallaData = SIZING_DATABASE[tallaId];
            if (!tallaData) throw new Error("Por favor, selecciona una talla.");

            // (NUEVO) Lógica de Tapeta
            let puntos_tapeta = 0;
            if (esChaqueta) {
                let tapeta_cm = 3.0; // Adulto por defecto
                if (tallaId.includes('m') || tallaId.includes('puesta')) tapeta_cm = 1.5; // Bebé
                else if (tallaId.includes('a')) tapeta_cm = 2.5; // Niño
                puntos_tapeta = Math.round(tapeta_cm * pts_cm);
            }

            const neck_cm = tallaData.cuello;
            let neck_cast_on = Math.round((neck_cm * pts_cm) / 2) * 2; 
            if (esChaqueta) {
                neck_cast_on += (puntos_tapeta * 2); // Sumar tapetas al montaje
            }
            
            // Repartir *sin* tapetas, luego sumarlas
            const reparto = distribuirRagland(neck_cast_on - (puntos_tapeta * 2), esChaqueta);
            if (esChaqueta) {
                reparto.delantero += puntos_tapeta; // Añadir tapeta a los delanteros
            }

            const sisa_cm = tallaData.sisa;
            const contorno_brazo_cm = tallaData.contorno_brazo + ease_cm;
            const sts_manga_final_real = Math.round(contorno_brazo_cm * pts_cm);
            const aumentos_necesarios_manga = sts_manga_final_real - reparto.manga;
            const rondas_necesarias = Math.floor(aumentos_necesarios_manga / 2);
            
            let sts_delantero_final_real = 0;
            if (esChaqueta) {
                 sts_delantero_final_real = reparto.delantero + rondas_necesarias; // Tapeta no aumenta
            } else {
                 sts_delantero_final_real = reparto.delantero + (rondas_necesarias * 2);
            }
            const sts_espalda_final_real = reparto.espalda + (rondas_necesarias * 2);
            
            const puntos_sisa_montar = Math.round((pts_cm * 2) / 2) * 2;
            const puntos_sisa_mitad = puntos_sisa_montar / 2;
            const puntos_manga_total = sts_manga_final_real + puntos_sisa_montar;
            const puntos_cuerpo_total = (esChaqueta ? (sts_delantero_final_real * 2) : sts_delantero_final_real) + sts_espalda_final_real + (puntos_sisa_montar * 2);
            
            const pasadas_cuerpo_cm = tallaData.cuerpo;
            const pasadas_manga_cm = tallaData.manga;
            
            const sts_muneca_final_cm = tallaData.muneca + 2;
            const sts_muneca_final = Math.round(sts_muneca_final_cm * pts_cm / 2) * 2;
            let puntos_a_menguar = puntos_manga_total - sts_muneca_final;
            if (puntos_a_menguar < 0) puntos_a_menguar = 0;
            if (puntos_a_menguar % 2 !== 0) puntos_a_menguar -= 1;
            const num_menguados_pares = puntos_a_menguar / 2;
            
            const pasadas_para_menguar_cm = pasadas_manga_cm - 4; // Dejar 4cm para borde

            let instruccion_menguado = `Teje recto por **${pasadas_manga_cm.toFixed(1)} cm** ${addRowInfoOnly(pasadas_manga_cm)}.`;
            if (num_menguados_pares > 0) {
                let freq_cm = (pasadas_para_menguar_cm / num_menguados_pares).toFixed(1);
                instruccion_menguado = `Para dar forma a la manga, **mengua 1 punto a cada lado** cada **${freq_cm} cm** aprox. Repite esto **${num_menguados_pares}** veces. (Te quedarán ${sts_muneca_final}p ${addCmInfo(sts_muneca_final)}). Continúa recto hasta alcanzar ${pasadas_manga_cm.toFixed(1)} cm totales.`;
                
                if (hasRowsData) {
                    const pasadas_para_menguar = Math.round(pasadas_para_menguar_cm * rows_cm);
                    const frecuencia_menguado = Math.floor(pasadas_para_menguar / num_menguados_pares);
                    if (frecuencia_menguado > 1) {
                         instruccion_menguado = `Para dar forma a la manga, **mengua 1 punto a cada lado** cada **${frecuencia_menguado} pasadas** (aprox. cada ${freq_cm} cm). Repite esto **${num_menguados_pares}** veces. (Te quedarán ${sts_muneca_final}p ${addCmInfo(sts_muneca_final)}). Continúa hasta alcanzar ${pasadas_manga_cm.toFixed(1)} cm totales ${addRowInfoOnly(pasadas_manga_cm)}.`;
                    }
                }
            }

            const etiquetaDelantero = esChaqueta ? `Delanteros (${reparto.delantero}p c/u)` : `Delantero (${reparto.delantero}p)`;
            const etiquetaDelanteroFinal = esChaqueta ? `Delanteros (${sts_delantero_final_real}p c/u)` : `Delantero (${sts_delantero_final_real}p)`;

            jsonOutput = {
              "resumen": `(Tejido desde escote / Raglán) Monta **${neck_cast_on}** p ${addCmInfo(neck_cast_on)}. Reparto: E(${reparto.espalda}p), ${etiquetaDelantero}, M(${reparto.manga}p c/u). Teje el canesú aumentando hasta que la manga tenga **${sts_manga_final_real}p** ${addCmInfo(sts_manga_final_real)} (la línea de raglán medirá aprox. **${sisa_cm.toFixed(1)} cm**).`,
              "instrucciones": [
                `1. **Montaje del Cuello:** Monta **${neck_cast_on}** puntos ${addCmInfo(neck_cast_on)}.`,
                `2. **Borde de Cuello:** Teje tu punto de borde preferido (elástico, punto bobo...) durante 2-3 cm.`,
                `3. **Distribución de Puntos:** Coloca tus marcadores. ${esChaqueta ? `Teje ${reparto.delantero}p (Delantero Der, **${puntos_tapeta}p son de tapeta**), PM, 1p (Raglán), PM, ${reparto.manga}p (Manga 1), PM, 1p (Raglán), PM, ${reparto.espalda}p (Espalda), PM, 1p (Raglán), PM, ${reparto.manga}p (Manga 2), PM, 1p (Raglán), PM, ${reparto.delantero}p (Delantero Izq, **${puntos_tapeta}p son de tapeta**).` : `Teje ${reparto.delantero}p (Delantero), PM, 1p (Raglán), PM, ${reparto.manga}p (Manga 1), PM, 1p (Raglán), PM, ${reparto.espalda}p (Espalda), PM, 1p (Raglán), PM, ${reparto.manga}p (Manga 2), PM, 1p (Raglán).`}`,
                `4. **Aumentos Raglán:** Teje realizando aumentos (cada 2 pasadas) a ambos lados de las 4 líneas de raglán ${esChaqueta ? '(¡no aumentes en los bordes de la tapeta!)' : ''}. Continúa hasta que la **línea de raglán** mida **${sisa_cm.toFixed(1)} cm** en vertical ${addRowInfo(sisa_cm)}. (Tendrás que hacer ${rondas_necesarias} rondas de aumento).`,
                `5. **Separación de Piezas:** Tus puntos finales serán: ${etiquetaDelanteroFinal} ${addCmInfo(sts_delantero_final_real)}, Espalda (${sts_espalda_final_real}p) ${addCmInfo(sts_espalda_final_real)}, Mangas (${sts_manga_final_real}p) ${addCmInfo(sts_manga_final_real)} c/u.`,
                `6. **Tejer Manga 1 (Primero):** Pon los puntos del cuerpo en un hilo auxiliar. Quédate solo con los **${sts_manga_final_real}p** de la Manga 1.`,
                `7. **Montar Sisa Manga 1:** Sigue tejiendo: <ul><li>**Pasada 1:** **Monta ${puntos_sisa_mitad}p nuevos** al inicio. Teje hasta el final.</li><li>**Pasada 2:** **Monta ${puntos_sisa_mitad}p nuevos** al inicio. Teje hasta el final.</li></ul> (Total **${puntos_manga_total}p** ${addCmInfo(puntos_manga_total)} en la aguja).`,
                `8. **Continuar y Menguar Manga 1:** ${instruccion_menguado} Teje el borde del puño (aprox 3-4 cm) y cierra. Corta el hilo.`,
                `9. **Tejer Manga 2:** Retoma los **${sts_manga_final_real}p** de la Manga 2 y repite los pasos 7 y 8.`,
                `10. **Tejer Cuerpo:** Retoma los puntos del cuerpo que tenías en espera (${ (esChaqueta ? (sts_delantero_final_real * 2) : sts_delantero_final_real) + sts_espalda_final_real}p).`,
                `11. **Unir Cuerpo con Mangas:** Teje el primer delantero. **Recoge ${puntos_sisa_montar}p** del borde de la sisa de la Manga 1. Teje la Espalda. **Recoge ${puntos_sisa_montar}p** del borde de la sisa de la Manga 2. Teje el otro delantero. (Total **${puntos_cuerpo_total}p** ${addCmInfo(puntos_cuerpo_total)}).`,
                `12. **Continuar Cuerpo:** Teje recto por **${pasadas_cuerpo_cm.toFixed(1)} cm** ${addRowInfoOnly(pasadas_cuerpo_cm)}.`,
                `13. **Bajo:** Teje tu punto de borde (aprox 4-5 cm) y cierra todos los puntos.`
              ]
            };

        } else if (metodo === 'bottom-up') {
            // --- C.3 LÓGICA BOTTOM-UP (MANGA CAÍDA) ---
            const tallaData = SIZING_DATABASE[tallaId];
            if (!tallaData) throw new Error("Por favor, selecciona una talla.");

            // 1. Cálculos de Manga (Puño a Sisa)
            const puntos_puño_cm = tallaData.muneca + 2;
            const puntos_puño = Math.round((puntos_puño_cm * pts_cm) / 2) * 2;
            const puntos_brazo_final_cm = tallaData.contorno_brazo + ease_cm;
            const puntos_brazo_final = Math.round((puntos_brazo_final_cm * pts_cm) / 2) * 2;
            const puntos_a_aumentar_total = puntos_brazo_final - puntos_puño;
            const num_aumentos_pares = puntos_a_aumentar_total / 2;
            const pasadas_manga_total_cm = tallaData.manga + tallaData.sisa;
            const pasadas_para_aumentar_cm = pasadas_manga_total_cm - 4; // Dejar 4cm para puño
            
            let instruccion_aumento_manga = `Teje recto hasta alcanzar **${pasadas_manga_total_cm.toFixed(1)} cm** de largo total. Cierra.`;
            if (num_aumentos_pares > 0) {
                let freq_cm_manga = (pasadas_para_aumentar_cm / num_aumentos_pares).toFixed(1);
                instruccion_aumento_manga = `**Aumenta 1 punto a cada lado** cada **${freq_cm_manga} cm**. Repite esto **${num_aumentos_pares}** veces (hasta tener ${puntos_brazo_final}p ${addCmInfo(puntos_brazo_final)}). Continúa recto hasta alcanzar ${pasadas_manga_total_cm.toFixed(1)} cm. Cierra.`;
                
                if (hasRowsData) {
                    const pasadas_para_aumentar = Math.round(pasadas_para_aumentar_cm * rows_cm);
                    const frecuencia_aumento_manga = Math.floor(pasadas_para_aumentar / num_aumentos_pares);
                    if (frecuencia_aumento_manga > 1) {
                        instruccion_aumento_manga = `**Aumenta 1 punto a cada lado** cada **${frecuencia_aumento_manga} pasadas** (aprox. cada ${freq_cm_manga} cm). Repite **${num_aumentos_pares}** veces (hasta tener ${puntos_brazo_final}p ${addCmInfo(puntos_brazo_final)}). Continúa recto hasta ${pasadas_manga_total_cm.toFixed(1)} cm ${addRowInfoOnly(pasadas_manga_total_cm)}. Cierra.`;
                    }
                }
            }

            // 2. Cálculos de Cuerpo (Espalda y Delantero)
            const ancho_pieza_cm = (tallaData.pecho + ease_cm) / 2;
            const puntos_montaje_cuerpo = Math.round(ancho_pieza_cm * pts_cm);
            const largo_cuerpo_cm = tallaData.cuerpo;
            const largo_sisa_cm = tallaData.sisa;
            const largo_total_cuerpo_cm = largo_cuerpo_cm + largo_sisa_cm;
            const puntos_cierre_sisa_opcional = 3;
            
            // 3. Cálculos de Escote (Delantero) - Tu Fórmula
            const largo_inicio_escote_cm = largo_total_cuerpo_cm - tallaData.caida_escote;
            const puntos_escote_total = Math.round(tallaData.ancho_escote * pts_cm);
            const puntos_escote_central = Math.round(puntos_escote_total / 2); // 1/2 Central
            const puntos_escote_lados_total = puntos_escote_total - puntos_escote_central;
            const puntos_escote_lado = Math.floor(puntos_escote_lados_total / 2); // 1/4 para cada curva
            const puntos_escote_central_ajustado = puntos_escote_total - (puntos_escote_lado * 2);
            
            const menguado_3_2 = 5; // 3p + 2p
            let puntos_menguado_1p = puntos_escote_lado - menguado_3_2;
            if (puntos_menguado_1p < 0) puntos_menguado_1p = 0;
            
            const puntos_hombro = Math.floor((puntos_montaje_cuerpo - puntos_escote_total) / 2);
            
            // (NUEVO) Lógica de Tapeta
            let puntos_tapeta = 0;
            if (esChaqueta) {
                let tapeta_cm = 3.0; // Adulto
                if (tallaId.includes('m') || tallaId.includes('puesta')) tapeta_cm = 1.5; // Bebé
                else if (tallaId.includes('a')) tapeta_cm = 2.5; // Niño
                puntos_tapeta = Math.round(tapeta_cm * pts_cm);
            }

            // 4. Instrucciones condicionales (Jersey vs Chaqueta)
            let inst_espalda, inst_delantero, inst_escote, inst_tapeta_final = "";
            let resumen_piezas = "";

            if (esChaqueta) {
                const puntos_montaje_chaqueta_del = Math.round(puntos_montaje_cuerpo / 2) + puntos_tapeta;
                const ancho_delantero_cm = (puntos_montaje_chaqueta_del / pts_cm).toFixed(1);
                const puntos_hombro_chaqueta = puntos_montaje_chaqueta_del - puntos_escote_lado - puntos_tapeta;
                
                resumen_piezas = `**Espalda:** Monta **${puntos_montaje_cuerpo}p** ${addCmInfo(puntos_montaje_cuerpo)}. **Delanteros (x2):** Monta **${puntos_montaje_chaqueta_del}p** ${addCmInfo(puntos_montaje_chaqueta_del)} c/u.`;
                inst_espalda = `1. **Espalda:** Monta **${puntos_montaje_cuerpo}p** ${addCmInfo(puntos_montaje_cuerpo)}. Teje un borde (elástico, bobo...) por 2-3 cm y continúa recto.`;
                inst_delantero = `4. **Delanteros (Tejer 2):** Monta **${puntos_montaje_chaqueta_del}p** ${addCmInfo(puntos_montaje_chaqueta_del)}. Teje los primeros **${puntos_tapeta}p** en punto de tapeta (elástico, bobo...) y el resto igual que la espalda.`;
                inst_escote = `5. **Escote Delantero:** A los **${largo_inicio_escote_cm.toFixed(1)} cm** de largo ${addRowInfoOnly(largo_inicio_escote_cm)}, empieza el escote en el borde (lado *contrario* a la tapeta): mengua 3p, luego 2p, y luego 1p cada 2 pasadas (${puntos_menguado_1p} veces). Continúa recto con los **${puntos_hombro_chaqueta}p** del hombro y los **${puntos_tapeta}p** de la tapeta hasta alcanzar ${largo_total_cuerpo_cm.toFixed(1)} cm de largo total. Cierra.`;
                inst_tapeta_final = `9. **Acabado Chaqueta:** Cose la tapeta del escote de la espalda. Puedes tejerla un poco más y coserla por detrás del cuello de la espalda, o coserla justo al hombro. ¡Y no olvides hacer los ojales en una de las tapetas!`;
            
            } else { // Es Jersey (2 piezas)
                resumen_piezas = `**Espalda y Delantero:** Monta **${puntos_montaje_cuerpo}p** ${addCmInfo(puntos_montaje_cuerpo)} para cada pieza.`;
                inst_espalda = `1. **Espalda:** Monta **${puntos_montaje_cuerpo}p** ${addCmInfo(puntos_montaje_cuerpo)}. Teje un borde (elástico, bobo...) por 2-3 cm y continúa recto.`;
                inst_delantero = `4. **Delantero:** Monta **${puntos_montaje_cuerpo}p** ${addCmInfo(puntos_montaje_cuerpo)}. Teje igual que la espalda hasta el escote.`;
                inst_escote = `5. **Escote Delantero:** A los **${largo_inicio_escote_cm.toFixed(1)} cm** de largo ${addRowInfoOnly(largo_inicio_escote_cm)}, empieza el escote:
                <ul><li>Cierra los **${puntos_escote_central_ajustado}** puntos centrales.</li>
                <li>**Lado 1:** Mengua (lado escote) 3p, luego 2p, y luego 1p cada 2 pasadas (${puntos_menguado_1p} veces).</li>
                <li>Continúa recto con los **${puntos_hombro}p** del hombro hasta alcanzar ${largo_total_cuerpo_cm.toFixed(1)} cm de largo total. Cierra.</li>
                <li>**Lado 2:** Haz lo mismo en el otro lado.</li></ul>`;
                inst_tapeta_final = `9. **Acabado Jersey:** Cose un hombro. Para el cuello, puedes **Opción A:** Recoger puntos alrededor del escote y tejer el borde. **Opción B:** Tejer una tira de borde por separado y coserla. Cose el otro hombro y la tira.`;
            }

            jsonOutput = {
                "resumen": `(Tejido desde bajo / Manga Caída) ${resumen_piezas} Teje **${largo_total_cuerpo_cm.toFixed(1)} cm** de largo. **Mangas (x2):** Empieza con **${puntos_puño}p** ${addCmInfo(puntos_puño)} y aumenta hasta **${puntos_brazo_final}p** ${addCmInfo(puntos_brazo_final)}. Coser todo.`,
                "instrucciones": [
                    inst_espalda,
                    `2. **Sisa Espalda:** Al alcanzar **${largo_cuerpo_cm.toFixed(1)} cm** de largo total ${addRowInfoOnly(largo_cuerpo_cm)}, marca el inicio de la sisa. (Opcional: puedes cerrar ${puntos_cierre_sisa_opcional}p al inicio de las 2 siguientes pasadas).`,
                    `3. **Continuar Espalda:** Teje recto hasta que la sisa mida **${largo_sisa_cm.toFixed(1)} cm** (largo total ${largo_total_cuerpo_cm.toFixed(1)} cm ${addRowInfoOnly(largo_total_cuerpo_cm)}). Cierra todos los puntos.`,
                    inst_delantero,
                    inst_escote,
                    `6. **Mangas (Tejer 2):** Monta **${puntos_puño}** puntos ${addCmInfo(puntos_puño)}. Teje un borde de puño (3-4 cm).`,
                    `7. **Aumentos Manga:** ${instruccion_aumento_manga}`,
                    `8. **Montaje:** ${inst_tapeta_final}`,
                    `10. **Costuras Finales:** Cose las mangas al cuerpo (centrando la parte más ancha de la manga en la costura del hombro) y cierra las costuras de los costados y las mangas.`
                ].filter(Boolean) 
            };
            
        } else {
            throw new Error("Método no reconocido.");
        }
        
        // --- E. GENERAR SALIDA HTML ---
        
        const textoHTML = `
            <ol>
                ${jsonOutput.instrucciones.map(paso => `<li>${paso.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</li>`).join('')}
            </ol>
        `;

        mostrarResultados(jsonOutput, textoHTML);
    }

    // --- FUNCIONES DE VISUALIZACIÓN (Muestran resultados o error) ---

    function mostrarResultados(json, textoHTML) {
        // Limpiamos por si había un error previo
        const instruxBox = document.getElementById('instrucciones-texto');
        instruxBox.classList.remove('alert-critical');
        instruxBox.innerHTML = ''; // Limpiar
        
        // Usamos innerHTML para el resumen para que pille las negritas
        document.getElementById('resumen-texto').innerHTML = json.resumen.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        // Dejamos el JSON interno para depuración (está oculto por CSS)
        document.getElementById('json-output').textContent = JSON.stringify(json, null, 2); 
        // Ponemos las instrucciones
        instruxBox.innerHTML = textoHTML;
    }

    function mostrarError(mensaje) {
        document.getElementById('resumen-texto').textContent = "Error en el cálculo";
        document.getElementById('json-output').textContent = `{ "error": "${mensaje}" }`;
        // Mostramos el error en la caja de instrucciones
        const errorBox = document.getElementById('instrucciones-texto');
        errorBox.innerHTML = `<p>${mensaje}</p>`;
        errorBox.classList.add('alert-critical'); 
    }
});
