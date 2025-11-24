import { Request, Response } from 'express';
import { ContactMessage } from '../models/ContactMessage.js';

export const submitContactForm = async (req: Request, res: Response) => {
  try {
    const { name, email, message } = req.body;
    
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: name, email, message'
      });
    }
    
    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid email address'
      });
    }
    
    const contactMessage = await ContactMessage.create({
      name,
      email,
      message
    });
    
    res.status(201).json({
      success: true,
      data: contactMessage,
      message: 'Thank you for your message! We will get back to you soon.'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Internal server error'
    });
  }
};

export const getContactMessages = async (req: Request, res: Response) => {
  try {
    const { limit = 50, offset = 0 } = req.query;
    
    const messages = await ContactMessage.findAll(Number(limit), Number(offset));
    
    res.json({
      success: true,
      data: messages,
      count: messages.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Internal server error'
    });
  }
};

export const getContactMessageById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const message = await ContactMessage.findById(id);
    
    if (!message) {
      return res.status(404).json({
        success: false,
        error: 'Message not found'
      });
    }
    
    // Mark as read
    if (message.status === 'unread') {
      await ContactMessage.updateStatus(id, 'read');
    }
    
    res.json({
      success: true,
      data: message
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Internal server error'
    });
  }
};

export const updateContactMessageStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    if (!['unread', 'read', 'replied'].includes(status)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid status. Must be one of: unread, read, replied'
      });
    }
    
    const message = await ContactMessage.updateStatus(id, status);
    
    if (!message) {
      return res.status(404).json({
        success: false,
        error: 'Message not found'
      });
    }
    
    res.json({
      success: true,
      data: message
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Internal server error'
    });
  }
};

export const deleteContactMessage = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await ContactMessage.delete(id);
    
    if (!deleted) {
      return res.status(404).json({
        success: false,
        error: 'Message not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Message deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Internal server error'
    });
  }
};

export const getContactStats = async (req: Request, res: Response) => {
  try {
    const stats = await ContactMessage.getStats();
    
    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error instanceof Error ? error.message : 'Internal server error'
    });
  }
};
