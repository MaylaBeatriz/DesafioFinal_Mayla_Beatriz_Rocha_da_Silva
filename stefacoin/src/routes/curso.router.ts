import express, { NextFunction, Request, Response } from 'express';
import CursoController from '../controllers/curso.controller';
import Curso from '../entities/curso.entity';
import Mensagem from '../utils/mensagem';

const router = express.Router();

router.post('/curso', async (req: Request, res: Response, next: NextFunction) => {
  try {
    // @ts-ignore
    const { tipo } = req.uid;
    const mensagem: Mensagem = await new CursoController().incluir(req.body, tipo);
    res.json(mensagem);
  } catch (e) {
    next(e);
  }
});

router.post('/curso/:id/matricular', async (req: Request, res: Response, next: NextFunction) => {
  try {
    // @ts-ignore
    const { email } = req.uid;
    const { id } = req.params;
    const mensagem: Mensagem = await new CursoController().matricular(Number(id), email);
    res.json(mensagem);
  } catch (e) {
    next(e);
  }
});

router.put('/curso/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    // @ts-ignore
    const { tipo } = req.uid;
    const { id } = req.params;
    const mensagem: Mensagem = await new CursoController().alterar(Number(id), req.body, tipo);
    res.json(mensagem);
  } catch (e) {
    next(e);
  }
});

router.delete('/curso/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    // @ts-ignore
    const { tipo } = req.uid;
    const { id } = req.params;
    const mensagem: Mensagem = await new CursoController().excluir(Number(id), tipo);
    res.json(mensagem);
  } catch (e) {
    next(e);
  }
});

router.get('/curso/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const curso: Curso = await new CursoController().obterPorId(Number(id));
    res.json(curso);
  } catch (e) {
    next(e);
  }
});

router.get('/curso', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cursos: Curso[] = await new CursoController().listar();
    res.json(cursos);
  } catch (e) {
    next(e);
  }
});

export default router;
