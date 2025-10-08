import { useState, type FormEvent } from "react";
import { useAuth } from "../auth/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/signin.css"; // vamos criar já já

export default function Login() {
  const { login } = useAuth();
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
    } catch {
      setError("Falha ao autenticar. Verifique suas credenciais.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="d-flex align-items-center py-4 bg-body-tertiary vh-100">
      <main className="form-signin w-100 m-auto">
        <form onSubmit={handleSubmit} className="text-center">
          <img
            className="mb-4"
            src="/logo.svg" /* coloque seu logo em public/logo.svg se quiser */
            alt=""
            width="72"
            height="72"
          />
          <h1 className="h3 mb-3 fw-normal">Login</h1>

          {error && <div className="alert alert-danger py-2">{error}</div>}

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
          <p className="mt-5 mb-3 text-body-secondary">&copy; {new Date().getFullYear()}</p>
        </form>
      </main>
    </div>
  );
}
