import multer from 'multer';
const storage = multer.memoryStorage();
const upload = multer({ storage });

import express from 'express';
const router = express.Router();
//Busca o FilmeController

import FilmeController from '../controllers/FilmeController.js'
const controle = new FilmeController();

const caminhobase = 'filme/'

router.get('/' + caminhobase + 'add', controle.openAdd)
router.post('/' + caminhobase + 'add',upload.single('capa'), controle.add)
router.get('/' + caminhobase + 'lst', controle.list)
router.post('/' + caminhobase + 'lst', controle.find)
router.get('/' + caminhobase + 'del/:id', controle.del)
router.get('/' + caminhobase + 'edt/:id', controle.openEdt)
router.post('/' + caminhobase + 'edt/:id', controle.edt)
export default router