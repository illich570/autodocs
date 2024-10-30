const HOST_API = {
  dev: import.meta.env.VITE_HOST_API_URL,
  production: import.meta.env.VITE_HOST_API_URL,
}

const BASE_PATH = process.env.NODE_ENV === 'production' ? HOST_API.production : HOST_API.dev

export { BASE_PATH }
