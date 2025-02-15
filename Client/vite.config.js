import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server : {
    proxy : {
      '/shopping' : 'http://localhost:7000'
    }
  },
  plugins: [react()],
})
 