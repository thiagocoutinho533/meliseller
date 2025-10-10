import axios from 'axios';
import type { Request, Response } from 'express';

const ML_AUTH_URL = 'https://auth.mercadolivre.com.br/authorization';
const ML_TOKEN_URL = 'https://api.mercadolibre.com/oauth/token';

function requiredEnv(key: string): string {
  const v = process.env[key];
  if (!v) throw new Error(`Missing env var: ${key}`);
  return v;
}

export async function getAuthUrl(_req: Request, res: Response) {
  try {
    const clientId = requiredEnv('ML_CLIENT_ID');
    const redirectUri = requiredEnv('ML_REDIRECT_URI');
    const state = 'login-' + Date.now();

    const url =
      `${ML_AUTH_URL}?response_type=code` +
      `&client_id=${encodeURIComponent(clientId)}` +
      `&redirect_uri=${encodeURIComponent(redirectUri)}` +
      `&state=${encodeURIComponent(state)}`;

    res.json({ url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao gerar URL' });
  }
}

export async function oauthCallback(req: Request, res: Response) {
  try {
    const code = req.query.code as string | undefined;
    if (!code) return res.status(400).send('Código não informado');

    const clientId = requiredEnv('ML_CLIENT_ID');
    const clientSecret = requiredEnv('ML_CLIENT_SECRET');
    const redirectUri = requiredEnv('ML_REDIRECT_URI');

    const params = new URLSearchParams();
    params.append('grant_type', 'authorization_code');
    params.append('client_id', clientId);
    params.append('client_secret', clientSecret);
    params.append('code', code);
    params.append('redirect_uri', redirectUri);

    const { data } = await axios.post(ML_TOKEN_URL, params, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });

    // data => { access_token, refresh_token, expires_in, user_id, ... }
    // TODO: salvar no seu banco associado ao usuário logado

    res.send(`
      <html><body style="font-family:sans-serif">
        <h3>Mercado Livre conectado com sucesso!</h3>
        <p>Você já pode fechar esta aba e voltar ao sistema.</p>
      </body></html>
    `);
  } catch (err: any) {
    console.error(err?.response?.data || err?.message || err);
    res.status(500).send('Erro no callback do Mercado Livre');
  }
}
