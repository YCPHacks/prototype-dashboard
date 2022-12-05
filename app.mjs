import path from 'path';
import { fileURLToPath } from 'url';

import cors from 'cors';
import express from 'express';

const app = express();

app.set('view engine', 'pug');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/static', express.static(path.join(__dirname, 'public')));

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.render('dashboard');
});

app.get('/roles', async (req, res) => {
  let response = await fetch(`http://localhost:3001/api/users/auth0|6389525ebc99c67d7151fd81/roles`);
  let json     = await response.json();

  res.locals.roles = json;

  res.render('roles');
});

export { app }
