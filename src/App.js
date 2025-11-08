import React from 'react';
import { BookList } from './components/internal/BookList';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-6 sm:p-10 font-sans text-gray-900">
      <BookList />
    </div>
  );
}