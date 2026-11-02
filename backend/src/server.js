import 'dotenv/config';
import app from './app.js';
import { PORT } from './config/env.js';

app.listen(PORT, () => console.log(`QRForge API on :${PORT}`));
