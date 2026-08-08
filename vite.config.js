import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    // Camera access requires a secure context. Vite's dev server is fine on
    // localhost; if you test on a phone over LAN, use `vite --host` with
    // HTTPS (e.g. via a tunneling tool) or just test on the deployed URL.
    host: true
  }
})
