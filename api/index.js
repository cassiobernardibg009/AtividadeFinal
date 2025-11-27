import { createServer } from 'http';

import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import routes from '../routes/route.js'; // rotas externas
import UsuarioRoutes from '../routes/UsuarioRoutes.js';
import AvaliaçãoRoutes from '../routes/AvaliacaoRoutes.js';
import CategoriaRoutes from '../routes/CategoriaRoutes.js';
import FilmesRoutes from '../routes/FilmeRoutes.js';


const app = express();

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// Caminho correto das views e public
const __filename = fileURLToPath(import.meta.url);

const __dirname = dirname(__filename);

// Servir arquivos estáticos
app.use(express.static(join(__dirname, '../public')));
app.set('views', join(__dirname, '../views'));


app.use(UsuarioRoutes)
app.use(AvaliaçãoRoutes)
app.use(CategoriaRoutes)
app.use(FilmesRoutes)
app.use(routes)
app.listen(3001)
// Exporta o handler compatível com Vercel
export default app;