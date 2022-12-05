import 'dotenv/config';

import express from 'express';

import { api } from './api.mjs';
import { app } from './app.mjs';

const api_port = process.env.API_PORT;
const app_port = process.env.APP_PORT;

api.listen(api_port, () => {
  console.log(`Listening on port ${api_port}...`);
});

app.listen(app_port, () => {
  console.log(`Listening on port ${app_port}...`);
});
