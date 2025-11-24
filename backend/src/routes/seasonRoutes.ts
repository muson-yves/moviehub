import { Router } from 'express';
import * as seasonController from '../controllers/seasonController.js';

const router = Router();

// GET routes
router.get('/search', seasonController.searchSeasons);
router.get('/:id', seasonController.getSeasonById);
router.get('/', seasonController.getSeasons);

// POST route
router.post('/', seasonController.createSeason);

// PUT route
router.put('/:id', seasonController.updateSeason);

// DELETE route
router.delete('/:id', seasonController.deleteSeason);

export default router;
