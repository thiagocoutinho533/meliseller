const API_BASE = (import.meta.env.VITE_API_URL as string) || "/api";

export function withAuthHeaders(init: RequestInit = {}) {
  const t = localStorage.getItem("auth_token");
  return {
    ...init,
    headers: {
      ...(init.headers || {}),
      ...(t ? { Authorization: `Bearer ${t}` } : {}),
    },
  };
}

export async function get<T = unknown>(path: string, init?: RequestInit) {
  const res = await fetch(`${API_BASE}${path}`, withAuthHeaders(init));
  if (!res.ok) throw new Error(await res.text());
  return (await res.json()) as T;
}

export async function post<T = unknown>(path: string, body: unknown, init?: RequestInit) {
  const res = await fetch(`${API_BASE}${path}`, withAuthHeaders({
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    ...init,
  }));
  if (!res.ok) throw new Error(await res.text());
  return (await res.json()) as T;
}
