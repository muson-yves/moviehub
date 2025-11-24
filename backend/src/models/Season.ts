import { v4 as uuidv4 } from 'uuid';
import { runAsync, getAsync, allAsync } from '../config/database.js';

export interface Season {
  id: string;
  title: string;
  description?: string;
  year?: number;
  rating: number;
  imageUrl: string;
  episodes: number;
  createdAt: string;
  updatedAt: string;
}

export const Season = {
  async create(data: Omit<Season, 'id' | 'createdAt' | 'updatedAt'>): Promise<Season> {
    const id = uuidv4();
    const now = new Date().toISOString();
    
    await runAsync(
      `INSERT INTO seasons (id, title, description, year, rating, imageUrl, episodes, createdAt, updatedAt)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [id, data.title, data.description, data.year, data.rating, data.imageUrl, data.episodes, now, now]
    );
    
    return { ...data, id, createdAt: now, updatedAt: now } as Season;
  },

  async findById(id: string): Promise<Season | null> {
    return getAsync('SELECT * FROM seasons WHERE id = ?', [id]);
  },

  async findAll(limit: number = 50, offset: number = 0): Promise<Season[]> {
    return allAsync(
      'SELECT * FROM seasons ORDER BY createdAt DESC LIMIT ? OFFSET ?',
      [limit, offset]
    );
  },

  async search(query: string, limit: number = 20): Promise<Season[]> {
    const searchTerm = `%${query}%`;
    return allAsync(
      'SELECT * FROM seasons WHERE title LIKE ? OR description LIKE ? LIMIT ?',
      [searchTerm, searchTerm, limit]
    );
  },

  async update(id: string, data: Partial<Season>): Promise<Season | null> {
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
      `UPDATE seasons SET ${updates.join(', ')}, updatedAt = ? WHERE id = ?`,
      values
    );

    return this.findById(id);
  },

  async delete(id: string): Promise<boolean> {
    const result = await runAsync('DELETE FROM seasons WHERE id = ?', [id]);
    return result.changes > 0;
  }
};
