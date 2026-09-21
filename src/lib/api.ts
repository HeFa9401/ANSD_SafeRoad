const API_BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:8000/api'

export class ApiError extends Error {
  status: number
  constructor(message: string, status: number) {
    super(message)
    this.status = status
  }
}

interface LoginResponse {
  access: string
  refresh?: string
}

/**
 * Authentification — branche sur l'endpoint JWT du backend Django/DRF.
 * Adapter le chemin ('/auth/login/') et la forme de la réponse une fois
 * l'API réelle connue (ex. djangorestframework-simplejwt renvoie
 * { access, refresh } par défaut sur /api/token/).
 */
export async function login(email: string, password: string): Promise<LoginResponse> {
  const res = await fetch(`${API_BASE}/auth/login/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })

  if (!res.ok) {
    const body = await res.json().catch(() => null)
    throw new ApiError(body?.detail ?? 'Email ou mot de passe incorrect.', res.status)
  }

  return res.json()
}
