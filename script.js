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
    
    // 1. Inicializar Puntos
    let puntosEspalda, puntosDelantero, puntosManga;
    let puntosRaglan = 4; // Los 4 puntos de las líneas de raglán (1p en cada línea)
    
    if (totalPuntos <= (puntosRaglan + 3)) { 
        throw new Error(`Puntos de montaje insuficientes (${totalPuntos}p). Se necesita un mínimo de 8p para repartir. Revisa la muestra o el cuello.`);
    }
    
    let puntosARepartir = totalPuntos - puntosRaglan;

    // 2. Reparto inicial 1/3
    let parte = Math.floor(puntosARepartir / 3);
    let sobrante = puntosARepartir % 3; 

    // Inicialización base
    puntosEspalda = parte;
    puntosDelantero = parte; 
    puntosManga = parte;     

    // 3. Gestión del Sobrante
    if (sobrante === 1) {
        puntosEspalda += 1;
    } else if (sobrante === 2) {
        puntosDelantero += 1;
        puntosEspalda += 1;
    }

    // 4. Ajustar Delantero y Mangas
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

    // 5. Devolver Resultado
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
    
    // --- 3. LÓGICA DE CÁLCULO AL ENVIAR EL FORMULARIO ---

    form.addEventListener('submit', (e) => {
        e.preventDefault(); 
        
        try {
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            generarPatron(data);
            
            // Mostrar resultados y ocultar formulario
            form.style.display = 'none';
            resultadoContainer.style.display = 'block';
            window.scrollTo(0, 0); // Subir al inicio

        } catch (error) {
            console.error(error); 
            mostrarError(`Error crítico en el cálculo: ${error.message}`);
            // Mostrar resultados (con el error) y ocultar formulario
            form.style.display = 'none';
            resultadoContainer.style.display = 'block';
            window.scrollTo(0, 0); // Subir al inicio
        }
    });

    // --- 4. LÓGICA DEL BOTÓN "MODIFICAR DATOS" ---
    btnModificar.addEventListener('click', () => {
        // Ocultar resultados y mostrar formulario
        resultadoContainer.style.display = 'none';
        form.style.display = 'block';
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

        // --- B. COMPROBACIONES ---
        const tallaData = SIZING_DATABASE[tallaId];
        
        if (!tallaData) {
            throw new Error(`La talla seleccionada ('${tallaId}') no se encontró en la base de datos.`);
        }
        
        if (!pts10 || !rows10 || pts10 <= 0 || rows10 <= 0) {
             throw new Error("La muestra (puntos y pasadas) debe ser un número positivo.");
        }

        // --- C. LÓGICA DE CÁLCULO (Enrutador) ---
        
        let jsonOutput;
        const pts_cm = pts10 / 10;
        const rows_cm = rows10 / 10;
        // TODO: Leer holgura del 'data.ajuste'
        const ease_cm = 5.0; // Holgura "normal" (Simplificado)

        if (metodo === 'top-down') {
            // --- C.1 LÓGICA TOP-DOWN (RAGLÁN) ---
            
            const neck_cm = tallaData.cuello;
            const neck_cast_on = Math.round((neck_cm * pts_cm) / 2) * 2; 
            const reparto = distribuirRagland(neck_cast_on, esChaqueta);
            const sisa_pasadas = Math.round(tallaData.sisa * rows_cm);
            const aumentos_rondas = Math.floor(sisa_pasadas / 2); 
            
            let sts_delantero_final_real = 0;
            if (esChaqueta) {
                 sts_delantero_final_real = reparto.delantero + aumentos_rondas;
            } else {
                 sts_delantero_final_real = reparto.delantero + (aumentos_rondas * 2);
            }
            const sts_espalda_final_real = reparto.espalda + (aumentos_rondas * 2);
            const sts_manga_final_real = reparto.manga + (aumentos_rondas * 2);
            const total_sts_final_yoke = (esChaqueta ? (sts_delantero_final_real * 2) : sts_delantero_final_real) + sts_espalda_final_real + (sts_manga_final_real * 2) + 4;
            
            const puntos_sisa_montar = Math.round((pts_cm * 2) / 2) * 2;
            const puntos_sisa_mitad = puntos_sisa_montar / 2;
            const puntos_manga_total = sts_manga_final_real + puntos_sisa_montar;
            const puntos_cuerpo_total = (esChaqueta ? (sts_delantero_final_real * 2) : sts_delantero_final_real) + sts_espalda_final_real + (puntos_sisa_montar * 2);
            
            const pasadas_cuerpo = Math.round(tallaData.cuerpo * rows_cm);
            const pasadas_manga = Math.round(tallaData.manga * rows_cm);
            
            // Cálculo de Menguados de Manga (Top-Down)
            const sts_muneca_final = Math.round((tallaData.muneca + 2) * pts_cm / 2) * 2;
            let puntos_a_menguar = puntos_manga_total - sts_muneca_final;
            if (puntos_a_menguar < 0) puntos_a_menguar = 0;
            if (puntos_a_menguar % 2 !== 0) puntos_a_menguar -= 1;
            const num_menguados_pares = puntos_a_menguar / 2;
            
            let frecuencia_menguado = 0;
            let pasadas_para_menguar = pasadas_manga - 10; 
            if (num_menguados_pares > 0 && pasadas_para_menguar > 0) {
                frecuencia_menguado = Math.floor(pasadas_para_menguar / num_menguados_pares);
                if (frecuencia_menguado < 2) frecuencia_menguado = 2;
            }
            
            let instruccion_menguado = `Teje recto por **${pasadas_manga}** pasadas (aprox ${tallaData.manga} cm).`;
            if (num_menguados_pares > 0) {
                instruccion_menguado = `Para dar forma a la manga, **mengua 1 punto a cada lado** (al inicio y al final de la pasada) **cada ${frecuencia_menguado} pasadas**. Repite esto **${num_menguados_pares}** veces. (Quedarán ${sts_muneca_final}p). Continúa recto hasta alcanzar ${pasadas_manga} pasadas totales.`;
            }

            const etiquetaDelantero = esChaqueta ? `Delanteros (${reparto.delantero}p c/u)` : `Delantero (${reparto.delantero}p)`;
            const etiquetaDelanteroFinal = esChaqueta ? `Delanteros (${sts_delantero_final_real}p c/u)` : `Delantero (${sts_delantero_final_real}p)`;

            jsonOutput = {
              "resumen": `(Top-Down) Montar **${neck_cast_on}** puntos (Talla ${tallaData.display}). Reparto: E(${reparto.espalda}p), ${etiquetaDelantero}, M(${reparto.manga}p c/u). Tejer ${sisa_pasadas} pasadas de raglán (${aumentos_rondas} rondas) hasta **${total_sts_final_yoke}** puntos. Tejer mangas (montando ${puntos_sisa_montar}p en sisa) y luego el cuerpo.`,
              "instrucciones": [
                `1. **Montaje del Cuello:** Montar **${neck_cast_on}** puntos.`,
                `2. **Elástico:** Tejer elástico (1x1 o 2x2) durante 2-3 cm.`,
                `3. **Distribución de Puntos:** Colocar marcadores. ${esChaqueta ? `Tejer ${reparto.delantero}p (Delantero Der), PM, 1p (Raglán), PM, ${reparto.manga}p (Manga 1), PM, 1p (Raglán), PM, ${reparto.espalda}p (Espalda), PM, 1p (Raglán), PM, ${reparto.manga}p (Manga 2), PM, 1p (Raglán), PM, ${reparto.delantero}p (Delantero Izq).` : `Tejer ${reparto.delantero}p (Delantero), PM, 1p (Raglán), PM, ${reparto.manga}p (Manga 1), PM, 1p (Raglán), PM, ${reparto.espalda}p (Espalda), PM, 1p (Raglán), PM, ${reparto.manga}p (Manga 2), PM, 1p (Raglán).`}`,
                `4. **Aumentos Raglán:** Tejer durante ${sisa_pasadas} pasadas, realizando **${aumentos_rondas} rondas de aumento** (cada 2 pasadas) a ambos lados de las 4 líneas de raglán.`,
                `5. **Separación de Piezas:** Puntos finales: ${etiquetaDelanteroFinal}, Espalda (${sts_espalda_final_real}p), Mangas (${sts_manga_final_real}p c/u).`,
                `6. **Tejer Manga 1 (Primero):** Poner los puntos del cuerpo en espera. Quedarse con los **${sts_manga_final_real}p** de la Manga 1.`,
                `7. **Montar Sisa Manga 1:** Sigue tejiendo: <ul><li>**Pasada 1 (Derecho):** **Monta ${puntos_sisa_mitad}p nuevos** al inicio. Teje hasta el final.</li><li>**Pasada 2 (Revés):** **Monta ${puntos_sisa_mitad}p nuevos** al inicio. Teje hasta el final.</li></ul> (Total **${puntos_manga_total}p** en la aguja).`,
                `8. **Continuar y Menguar Manga 1:** ${instruccion_menguado} Teje elástico de puño y cierra. Corta el hilo.`,
                `9. **Tejer Manga 2:** Retoma los **${sts_manga_final_real}p** de la Manga 2 y repite los pasos 7 y 8.`,
                `10. **Tejer Cuerpo:** Retoma los puntos del cuerpo en espera (${ (esChaqueta ? (sts_delantero_final_real * 2) : sts_delantero_final_real) + sts_espalda_final_real}p).`,
                `11. **Unir Cuerpo con Mangas:** Teje el primer delantero. **Recoge ${puntos_sisa_montar}p** del borde de la sisa de la Manga 1. Teje la Espalda. **Recoge ${puntos_sisa_montar}p** del borde de la sisa de la Manga 2. Teje el otro delantero. (Total **${puntos_cuerpo_total}p**).`,
                `12. **Continuar Cuerpo:** Teje recto por **${pasadas_cuerpo}** pasadas (aprox ${tallaData.cuerpo} cm).`,
                `13. **Bajo:** Tejer elástico y cerrar todos los puntos.`
              ]
            };

        } else if (metodo === 'bottom-up') {
            // --- C.2 LÓGICA BOTTOM-UP (MANGA CAÍDA) ---
            
            // 1. Cálculos de Manga (Puño a Sisa)
            const puntos_puño = Math.round(((tallaData.muneca + 2) * pts_cm) / 2) * 2;
            const puntos_brazo_final = Math.round(((tallaData.contorno_brazo + ease_cm) * pts_cm) / 2) * 2;
            const puntos_a_aumentar_total = puntos_brazo_final - puntos_puño;
            const num_aumentos_pares = puntos_a_aumentar_total / 2;
            const pasadas_manga_total = Math.round((tallaData.manga + tallaData.sisa) * rows_cm);
            const pasadas_para_aumentar = pasadas_manga_total - 10;
            
            let frecuencia_aumento_manga = 0;
            if (num_aumentos_pares > 0) {
                 frecuencia_aumento_manga = Math.floor(pasadas_para_aumentar / num_aumentos_pares);
                 if (frecuencia_aumento_manga < 2) frecuencia_aumento_manga = 2;
            }
            
            let instruccion_aumento_manga = `Teje recto hasta alcanzar **${pasadas_manga_total}** pasadas. Cierra.`;
            if (num_aumentos_pares > 0) {
                instruccion_aumento_manga = `**Aumenta 1 punto a cada lado** (al inicio y al final de la pasada) **cada ${frecuencia_aumento_manga} pasadas**. Repite esto **${num_aumentos_pares}** veces (hasta tener ${puntos_brazo_final}p). Continúa recto hasta alcanzar ${pasadas_manga_total} pasadas. Cierra.`;
            }

            // 2. Cálculos de Cuerpo (Espalda y Delantero)
            const ancho_pieza_cm = (tallaData.pecho + ease_cm) / 2;
            const puntos_montaje_cuerpo = Math.round(ancho_pieza_cm * pts_cm);
            const pasadas_hasta_sisa = Math.round(tallaData.cuerpo * rows_cm);
            const pasadas_de_sisa = Math.round(tallaData.sisa * rows_cm);
            const pasadas_totales_cuerpo = pasadas_hasta_sisa + pasadas_de_sisa;
            const puntos_cierre_sisa_opcional = 3;
            
            // 3. Cálculos de Escote (Delantero) - Tu Fórmula
            const pasadas_inicio_escote = pasadas_totales_cuerpo - Math.round(tallaData.caida_escote * rows_cm);
            const puntos_escote_total = Math.round(tallaData.ancho_escote * pts_cm);
            const puntos_escote_central = Math.round(puntos_escote_total / 2); // 1/2 Central
            const puntos_escote_lados_total = puntos_escote_total - puntos_escote_central;
            const puntos_escote_lado = Math.floor(puntos_escote_lados_total / 2); // 1/4 para cada curva
            const puntos_escote_central_ajustado = puntos_escote_total - (puntos_escote_lado * 2);
            
            const menguado_3_2 = 5; // 3p + 2p
            let puntos_menguado_1p = puntos_escote_lado - menguado_3_2;
            if (puntos_menguado_1p < 0) puntos_menguado_1p = 0;
            
            const puntos_hombro = Math.floor((puntos_montaje_cuerpo - puntos_escote_total) / 2);

            // 4. Instrucciones condicionales (Jersey vs Chaqueta)
            let inst_espalda = `1. **Espalda:** Montar **${puntos_montaje_cuerpo}** puntos. Tejer elástico (2-3 cm) y continuar recto.`;
            let inst_delantero, inst_escote;

            if (esChaqueta) {
                const puntos_montaje_chaqueta_del = Math.round(puntos_montaje_cuerpo / 2);
                const puntos_hombro_chaqueta = puntos_montaje_chaqueta_del - puntos_escote_lado;
                
                inst_delantero = `4. **Delanteros (Tejer 2):** Montar **${puntos_montaje_chaqueta_del}** puntos. Tejer elástico y continuar recto, igual que la espalda.`;
                inst_escote = `5. **Escote Delantero:** A la **pasada ${pasadas_inicio_escote}**, en el borde del escote (el que no es la sisa), mengua 3p, luego 2p, y luego 1p cada 2 pasadas (${puntos_menguado_1p} veces). Continúa recto con los **${puntos_hombro_chaqueta}p** del hombro hasta la pasada ${pasadas_totales_cuerpo}. Cierra.`;
            
            } else { // Es Jersey
                inst_delantero = `4. **Delantero:** Montar **${puntos_montaje_cuerpo}** puntos. Tejer igual que la espalda hasta el escote.`;
                inst_escote = `5. **Escote Delantero:** A la **pasada ${pasadas_inicio_escote}**, para el escote:
                <ul><li>Cierra los **${puntos_escote_central_ajustado}** puntos centrales.</li>
                <li>**Lado 1:** Mengua (lado escote) 3p, luego 2p, y luego 1p cada 2 pasadas (${puntos_menguado_1p} veces).</li>
                <li>Continúa recto con los **${puntos_hombro}p** del hombro hasta la pasada ${pasadas_totales_cuerpo}. Cierra.</li>
                <li>**Lado 2:** Repite lo mismo en el otro lado.</li></ul>`;
            }

            jsonOutput = {
                "resumen": `(Bottom-Up) Tejer 4 piezas. **Espalda/Delantero:** Montar **${puntos_montaje_cuerpo}p** y tejer ${pasadas_totales_cuerpo} pasadas. **Mangas (x2):** Empezar con **${puntos_puño}p** y aumentar hasta **${puntos_brazo_final}p**. Coser todo al final.`,
                "instrucciones": [
                    inst_espalda,
                    `2. **Sisa Espalda:** A la **pasada ${pasadas_hasta_sisa}** (aprox ${tallaData.cuerpo} cm), marca el inicio de la sisa. Teje recto ${pasadas_de_sisa} pasadas más (hasta ${pasadas_totales_cuerpo} pasadas totales). (Opcional: puedes cerrar ${puntos_cierre_sisa_opcional}p al inicio de las 2 primeras pasadas de sisa).`,
                    `3. **Hombros Espalda:** Cierra todos los puntos.`,
                    inst_delantero,
                    inst_escote,
                    `6. **Mangas (Tejer 2):** Montar **${puntos_puño}** puntos. Tejer elástico (3-4 cm).`,
                    `7. **Aumentos Manga:** ${instruccion_aumento_manga}`,
                    `8. **Acabado y Montaje:** Cose un hombro. Para el cuello, puedes **Opción A:** Recoger puntos alrededor del escote y tejer el elástico. **Opción B:** Tejer una tira de elástico por separado y coserla. Cose el otro hombro y la tira. Coser las mangas al cuerpo y cerrar costados y mangas.`
                ]
            };
            
        } else {
            throw new Error("Método no reconocido.");
        }
        
        // --- D. AÑADIR TAPETA OPCIONAL (SI ES CHAQUETA) ---
        if (esChaqueta) {
            const puntos_tapeta_cm = 2.5; // Ancho estándar de tapeta
            const puntos_tapeta = Math.round(puntos_tapeta_cm * pts_cm);
            jsonOutput.instrucciones.push(`9. **Tapeta (Opcional):** Recoge puntos (aprox. 3p por cada 4 pasadas) a lo largo de ambos bordes delanteros. Teje en elástico (unos ${puntos_tapeta}p de ancho) la banda de botones y ojales.`);
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
