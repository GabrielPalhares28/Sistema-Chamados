import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist", // Define a pasta de saída para o build
  },
  server: {
    port: 3000, // Configura a porta do servidor de desenvolvimento (opcional)
  },
  base: "/", // Certifica que o caminho base está correto
})
