import express from 'express';
import PublicoController from '../controllers/PublicoController.js';

const router = express.Router();

// Rota que processa tanto a exibição inicial quanto a busca (GET)
router.get('/publico/catalogo', PublicoController.exibirCatalogo);

export default router;