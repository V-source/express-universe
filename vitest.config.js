
// vitest.config.js
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // 🔑 Habilita describe, test, y expect como globales (como en Jest)
    globals: true, 
    // Opcional: Especifica el entorno de Node
    environment: 'node', 
    // Opcional: Define archivos que se ejecutan antes de cada suite (setup files)
    // setupFiles: ['./vitest.setup.js'], 
    exclude: ['**/node_modules/**'],
  },
});


// Q: como ejecutar tests unitarios y que son primeramente.
//
// Q: como ejectar tests por segmentos.
// R: crea una carpeta test y dentro las carpetas unitarios e integracion
