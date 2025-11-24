import { Request, Response } from 'express';
import { Movie } from '../models/Movie.js';

export const getMovies = async (req: Request, res: Response) => {
  try {
    const { category, limit = 20, offset = 0 } = req.query;
    
    let movies;
    if (category) {
      movies = await Movie.findByCategory(category as string, Number(limit), Number(offset));
    } else {
      movies = await Movie.findAll(Number(limit), Number(offset));
    }
    
    res.json({
      success: true,
      data: movies,
      count: movies.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Internal server error'
    });
  }
};

export const getMovieById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const movie = await Movie.findById(id);
    
    if (!movie) {
      return res.status(404).json({
        success: false,
        error: 'Movie not found'
      });
    }
    
    res.json({
      success: true,
      data: movie
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Internal server error'
    });
  }
};

export const searchMovies = async (req: Request, res: Response) => {
  try {
    const { q, limit = 20 } = req.query;
    
    if (!q) {
      return res.status(400).json({
        success: false,
        error: 'Search query is required'
      });
    }
    
    const movies = await Movie.search(q as string, Number(limit));
    
    res.json({
      success: true,
      data: movies,
      count: movies.length,
      query: q
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Internal server error'
    });
  }
};

export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await Movie.getCategories();
    
    res.json({
      success: true,
      data: categories,
      count: categories.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Internal server error'
    });
  }
};

export const createMovie = async (req: Request, res: Response) => {
  try {
    const { title, description, year, rating, category, imageUrl, duration, director, cast } = req.body;
    
    if (!title || !rating || !category || !imageUrl) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: title, rating, category, imageUrl'
      });
    }
    
    const movie = await Movie.create({
      title,
      description,
      year,
      rating,
      category,
      imageUrl,
      duration,
      director,
      cast
    });
    
    res.status(201).json({
      success: true,
      data: movie
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Internal server error'
    });
  }
};

export const updateMovie = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    const movie = await Movie.update(id, updateData);
    
    if (!movie) {
      return res.status(404).json({
        success: false,
        error: 'Movie not found'
      });
    }
    
    res.json({
      success: true,
      data: movie
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Internal server error'
    });
  }
};

export const deleteMovie = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await Movie.delete(id);
    
    if (!deleted) {
      return res.status(404).json({
        success: false,
        error: 'Movie not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Movie deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Internal server error'
    });
  }
};
