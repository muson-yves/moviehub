import { Request, Response } from 'express';
import { Season } from '../models/Season.js';

export const getSeasons = async (req: Request, res: Response) => {
  try {
    const { limit = 20, offset = 0 } = req.query;
    
    const seasons = await Season.findAll(Number(limit), Number(offset));
    
    res.json({
      success: true,
      data: seasons,
      count: seasons.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Internal server error'
    });
  }
};

export const getSeasonById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const season = await Season.findById(id);
    
    if (!season) {
      return res.status(404).json({
        success: false,
        error: 'Season not found'
      });
    }
    
    res.json({
      success: true,
      data: season
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Internal server error'
    });
  }
};

export const searchSeasons = async (req: Request, res: Response) => {
  try {
    const { q, limit = 20 } = req.query;
    
    if (!q) {
      return res.status(400).json({
        success: false,
        error: 'Search query is required'
      });
    }
    
    const seasons = await Season.search(q as string, Number(limit));
    
    res.json({
      success: true,
      data: seasons,
      count: seasons.length,
      query: q
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Internal server error'
    });
  }
};

export const createSeason = async (req: Request, res: Response) => {
  try {
    const { title, description, year, rating, imageUrl, episodes } = req.body;
    
    if (!title || !rating || !imageUrl || episodes === undefined) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: title, rating, imageUrl, episodes'
      });
    }
    
    const season = await Season.create({
      title,
      description,
      year,
      rating,
      imageUrl,
      episodes
    });
    
    res.status(201).json({
      success: true,
      data: season
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Internal server error'
    });
  }
};

export const updateSeason = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    const season = await Season.update(id, updateData);
    
    if (!season) {
      return res.status(404).json({
        success: false,
        error: 'Season not found'
      });
    }
    
    res.json({
      success: true,
      data: season
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Internal server error'
    });
  }
};

export const deleteSeason = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await Season.delete(id);
    
    if (!deleted) {
      return res.status(404).json({
        success: false,
        error: 'Season not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Season deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Internal server error'
    });
  }
};
