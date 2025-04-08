// components/TextInput.js
'use client';

import { useState } from 'react';
import { Send } from 'lucide-react';

export default function TextInput({ value, onChange, onSubmit, placeholder }) {
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(value);
    };

    return (
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none h-14"
          rows={1}
      />
            <button
                type="submit"
                className={`p-3 rounded-lg ${
                    value.trim()
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
                disabled={!value.trim()}
            >
                <Send size={20} />
            </button>
        </form>
    );
}