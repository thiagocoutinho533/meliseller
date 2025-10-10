// src/pages/Login.tsx
import { useState, type FormEvent } from "react";
import { useAuth } from "../auth/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import "../styles/sign-in.css";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch {
      setError("Falha ao autenticar. Verifique suas credenciais.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-body-tertiary">
      <main className="form-signin w-100 m-auto">
        <form onSubmit={handleSubmit}>
          <img className="mb-4" src="/logo.svg" alt="" width="72" height="57" />
          <h1 className="h3 mb-3 fw-normal text-center">Login</h1>
          {error && <p className="text-danger text-center">{error}</p>}

          <div className="form-floating">
            <input
              type="email"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoFocus
            />
            <label htmlFor="floatingInput">E-mail</label>
          </div>

          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label htmlFor="floatingPassword">Senha</label>
          </div>

          <button className="btn btn-primary w-100 py-2 mt-2" type="submit" disabled={loading}>
            {loading ? "Entrando..." : "Entrar"}
          </button>

          <div className="text-center mt-3">
            <small>
              Não tem conta?{" "}
              <Link to="/register">Registre-se</Link>
            </small>
          </div>

          <p className="mt-5 mb-3 text-body-secondary text-center">&copy; {new Date().getFullYear()}</p>
        </form>
      </main>
    </div>
  );
}
