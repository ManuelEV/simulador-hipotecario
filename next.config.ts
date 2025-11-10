/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // 👈 necesario para GitHub Pages
  images: { unoptimized: true },
  basePath: "/simulador-hipotecario", // 👈 el nombre exacto de tu repo
  assetPrefix: "/simulador-hipotecario/",
  trailingSlash: true, // 👈 evita errores de rutas internas
};

export default nextConfig;
