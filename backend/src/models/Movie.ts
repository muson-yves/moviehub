import { v4 as uuidv4 } from 'uuid';
import { runAsync, getAsync, allAsync } from '../config/database.js';

export interface Movie {
  id: string;
  title: string;
  description?: string;
  year?: number;
  rating: number;
  category: string;
  imageUrl: string;
  duration?: number;
  director?: string;
  cast?: string;
  createdAt: string;
  updatedAt: string;
}

export const Movie = {
  async create(data: Omit<Movie, 'id' | 'createdAt' | 'updatedAt'>): Promise<Movie> {
    const id = uuidv4();
    const now = new Date().toISOString();
    
    await runAsync(
      `INSERT INTO movies (id, title, description, year, rating, category, imageUrl, duration, director, cast, createdAt, updatedAt)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [id, data.title, data.description, data.year, data.rating, data.category, data.imageUrl, data.duration, data.director, data.cast, now, now]
    );
    
    return { ...data, id, createdAt: now, updatedAt: now } as Movie;
  },

  async findById(id: string): Promise<Movie | null> {
    return getAsync('SELECT * FROM movies WHERE id = ?', [id]);
  },

  async findByCategory(category: string, limit: number = 20, offset: number = 0): Promise<Movie[]> {
    return allAsync(
      'SELECT * FROM movies WHERE category = ? LIMIT ? OFFSET ?',
      [category, limit, offset]
    );
  },

  async findAll(limit: number = 50, offset: number = 0): Promise<Movie[]> {
    return allAsync(
      'SELECT * FROM movies ORDER BY createdAt DESC LIMIT ? OFFSET ?',
      [limit, offset]
    );
  },

  async search(query: string, limit: number = 20): Promise<Movie[]> {
    const searchTerm = `%${query}%`;
    return allAsync(
      'SELECT * FROM movies WHERE title LIKE ? OR description LIKE ? LIMIT ?',
      [searchTerm, searchTerm, limit]
    );
  },

  async update(id: string, data: Partial<Movie>): Promise<Movie | null> {
    const updates: string[] = [];
    const values: any[] = [];

    Object.entries(data).forEach(([key, value]) => {
      if (key !== 'id' && key !== 'createdAt' && key !== 'updatedAt') {
        updates.push(`${key} = ?`);
        values.push(value);
      }
    });

    if (updates.length === 0) return this.findById(id);

    values.push(new Date().toISOString());
    values.push(id);

    await runAsync(
      `UPDATE movies SET ${updates.join(', ')}, updatedAt = ? WHERE id = ?`,
      values
    );

    return this.findById(id);
  },

  async delete(id: string): Promise<boolean> {
    const result = await runAsync('DELETE FROM movies WHERE id = ?', [id]);
    return result.changes > 0;
  },

  async getCategories(): Promise<string[]> {
    const results = await allAsync('SELECT DISTINCT category FROM movies WHERE category IS NOT NULL ORDER BY category');
    return results.map(r => r.category);
  }
};
