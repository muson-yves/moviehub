import { v4 as uuidv4 } from 'uuid';
import { runAsync, getAsync, allAsync } from '../config/database.js';

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  status: 'unread' | 'read' | 'replied';
  createdAt: string;
}

export const ContactMessage = {
  async create(data: Omit<ContactMessage, 'id' | 'createdAt' | 'status'>): Promise<ContactMessage> {
    const id = uuidv4();
    const now = new Date().toISOString();
    
    await runAsync(
      `INSERT INTO contact_messages (id, name, email, message, status, createdAt)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [id, data.name, data.email, data.message, 'unread', now]
    );
    
    return { ...data, id, status: 'unread', createdAt: now } as ContactMessage;
  },

  async findById(id: string): Promise<ContactMessage | null> {
    return getAsync('SELECT * FROM contact_messages WHERE id = ?', [id]);
  },

  async findAll(limit: number = 50, offset: number = 0): Promise<ContactMessage[]> {
    return allAsync(
      'SELECT * FROM contact_messages ORDER BY createdAt DESC LIMIT ? OFFSET ?',
      [limit, offset]
    );
  },

  async findByEmail(email: string): Promise<ContactMessage[]> {
    return allAsync(
      'SELECT * FROM contact_messages WHERE email = ? ORDER BY createdAt DESC',
      [email]
    );
  },

  async updateStatus(id: string, status: 'unread' | 'read' | 'replied'): Promise<ContactMessage | null> {
    await runAsync('UPDATE contact_messages SET status = ? WHERE id = ?', [status, id]);
    return this.findById(id);
  },

  async delete(id: string): Promise<boolean> {
    const result = await runAsync('DELETE FROM contact_messages WHERE id = ?', [id]);
    return result.changes > 0;
  },

  async getStats(): Promise<{ total: number; unread: number }> {
    const all = await allAsync('SELECT COUNT(*) as count FROM contact_messages');
    const unread = await allAsync('SELECT COUNT(*) as count FROM contact_messages WHERE status = "unread"');
    return {
      total: all[0]?.count || 0,
      unread: unread[0]?.count || 0
    };
  }
};
