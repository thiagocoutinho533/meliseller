// src/pages/Register.tsx
import { useState, type FormEvent } from "react";
import { useAuth } from "../auth/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import "../styles/sign-in.css";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await register(name, email, password);
      navigate("/dashboard");
    } catch {
      setError("Falha ao registrar. Tente outro e-mail.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-body-tertiary">
      <main className="form-signin w-100 m-auto">
        <form onSubmit={handleSubmit}>
          <img className="mb-4" src="/logo.svg" alt="" width="72" height="57" />
          <h1 className="h3 mb-3 fw-normal text-center">Criar conta</h1>
          {error && <p className="text-danger text-center">{error}</p>}

          <div className="form-floating">
            <input
              className="form-control"
              id="floatingName"
              placeholder="Seu nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              autoFocus
            />
            <label htmlFor="floatingName">Nome</label>
          </div>

          <div className="form-floating">
            <input
              type="email"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
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
            {loading ? "Enviando..." : "Criar conta"}
          </button>

          <div className="text-center mt-3">
            <small>
              Já tem conta? <Link to="/login">Entrar</Link>
            </small>
          </div>

          <p className="mt-5 mb-3 text-body-secondary text-center">&copy; {new Date().getFullYear()}</p>
        </form>
      </main>
    </div>
  );
}
