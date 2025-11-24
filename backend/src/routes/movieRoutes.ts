import { Router } from 'express';
import * as movieController from '../controllers/movieController.js';

const router = Router();

// GET routes
router.get('/search', movieController.searchMovies);
router.get('/categories', movieController.getCategories);
router.get('/:id', movieController.getMovieById);
router.get('/', movieController.getMovies);

// POST route
router.post('/', movieController.createMovie);

// PUT route
router.put('/:id', movieController.updateMovie);

// DELETE route
router.delete('/:id', movieController.deleteMovie);

export default router;
