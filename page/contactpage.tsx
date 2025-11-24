import React, { useState } from 'react';
import { contactAPI } from '../src/api';

const ContactPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      await contactAPI.submit(formData.name, formData.email, formData.message);
      setSuccess(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send message');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto animate-fadeIn">
      <h1 className="text-4xl font-bold text-white text-center mb-8">Contact Us</h1>
      
      {success && (
        <div className="mb-6 p-4 bg-green-900/20 border border-green-500/50 rounded-lg text-green-400 text-center">
          Thank you for your message! We will get back to you soon.
        </div>
      )}
      
      {error && (
        <div className="mb-6 p-4 bg-red-900/20 border border-red-500/50 rounded-lg text-red-400 text-center">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 bg-gray-900 p-8 rounded-lg shadow-lg shadow-blue-900/20">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-300">Full Name</label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            value={formData.name}
            onChange={handleChange}
            required 
            className="mt-1 block w-full bg-gray-800 border border-gray-700 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300" 
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email Address</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            value={formData.email}
            onChange={handleChange}
            required 
            className="mt-1 block w-full bg-gray-800 border border-gray-700 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300" 
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-300">Message</label>
          <textarea 
            id="message" 
            name="message" 
            rows={4} 
            value={formData.message}
            onChange={handleChange}
            required 
            className="mt-1 block w-full bg-gray-800 border border-gray-700 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
          />
        </div>
        <div>
          <button 
            type="submit" 
            disabled={loading}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-gray-900 transition-all duration-300 transform hover:scale-105 active:scale-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Sending...' : 'Send Message'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactPage;