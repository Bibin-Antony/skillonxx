import React, { useState } from 'react';
import { X } from 'lucide-react';

const MessageModal = ({ isOpen, onClose, onSend, studentCount }) => {
  const [message, setMessage] = useState('');
  
  if (!isOpen) return null;

  const handleSend = () => {
    onSend(message);
    setMessage('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <div className="relative bg-gray-800 rounded-lg w-full max-w-2xl m-4 p-6 shadow-xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6">
          <h3 className="text-lg font-semibold text-white mb-2">
            Send Message to Students
          </h3>
          <p className="text-gray-400">
            Composing message for {studentCount} student{studentCount !== 1 ? 's' : ''}
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-200 mb-1">
            Message
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 min-h-[200px]"
            placeholder="Type your message here..."
          />
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-700 text-white hover:bg-gray-600 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSend}
            disabled={!message.trim()}
            className="px-4 py-2 rounded-lg bg-teal-500 text-white hover:bg-teal-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Send Message
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageModal;