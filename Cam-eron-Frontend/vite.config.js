import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig(
  {
    plugins: [react(), tailwindcss()],
    server: {
      proxy: {
        '/write_to_json': 'http://localhost:5000',
        '/update_claim': 'http://localhost:5000',
        "/get_claims": 'http://localhost:5000',
        "/create_user": 'http://localhost:5000'
      }
    }
  }
);
