import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy:{
      "/account":{
        target: 'http://localhost:5205',
        changeOrigin: true,
        secure: false,
      },
      "/user":{
        target: 'http://localhost:5205',
        changeOrigin: true,
        secure: false,
      },
      "/verify":{
        target: 'http://localhost:5205',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
