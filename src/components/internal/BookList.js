import React, { useState, useEffect, useCallback } from 'react';
import { BookOpen } from 'lucide-react';
import { Button } from '../common/Button';
import { Table } from '../common/Table';
import { Message } from '../common/Message';
import { BookRow } from './BookRow';
import { AddBookModal } from './AddBookModal';

const API_HOST = process.env.REACT_APP_API_HOST || '';
const API_URL = `${API_HOST}/api/books`;

export const BookList = () => {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isAddingBook, setIsAddingBook] = useState(false);

  const fetchBooks = useCallback(async (isInitialLoad = false) => {
    if (isInitialLoad || books.length === 0) {
      setIsLoading(true);
    }
    setError(null);
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setBooks(data);
    } catch (err) {
      setError("Could not fetch books. Please ensure the server is running.");
    } finally {
      setIsLoading(false);
    }
  },
[books.length]);

  useEffect(() => {
    fetchBooks(true);
  },
[fetchBooks]);

  const handleAddBook = async (newBookData) => {
    setIsAddingBook(true);
    setError(null);
    try {
      const response = await fetch(API_URL,
{
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newBookData),
      });

      if (!response.ok) {
        throw new Error(`Failed to add book: ${response.status}`);
      }

      await fetchBooks();
      setShowModal(false);
    } catch (err) {
      console.error("Add book error:",
err);
      setError("Failed to add book. Please try again.");
    } finally {
      setIsAddingBook(false);
    }
  };

  const columns = [
    { header: "Title & Cover", className: "w-1/3" },
    { header: "Description", className: "w-1/2" },
    { header: "Actions", className: "w-1/6 text-center" },
  ];

  const renderContent = () => {
    if (error) {
      return <Message type="error" title="Data Error" message={error} className="max-w-lg mx-auto" />;
    }

    if (isLoading && books.length === 0) {
      return <Message type="loading" title="Loading Books" message="Fetching data from API..." className="max-w-lg mx-auto" />;
    }

    if (books.length === 0) {
      return (
        <div className="text-center p-12 bg-white rounded-xl shadow-md">
          <BookOpen className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No books found</h3>
          <p className="text-gray-500 mb-6">Use the 'Add Book' button to start building your library!</p>
          <Button variant="success" onClick={() => setShowModal(true)}>Add Your First Book</Button>
        </div>
      );
    }

    return (
      <Table
        columns={columns}
        data={books}
        loading={isLoading && books.length > 0}
        renderRow={(book) => (
          <BookRow
            key={book.id || book.title}
            imageURL={book.imageURL}
            title={book.title}
            description={book.description}
          />
        )}
      />
    );
  };

  return (
    <section className="max-w-5xl mx-auto">
      <header className="flex flex-col sm:flex-row justify-between items-center pb-6 mb-8 border-b-4 border-indigo-500 shadow-lg p-4 bg-white rounded-xl">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4 sm:mb-0 flex items-center">
          {/* <BookOpen className="w-8 h-8 mr-2 text-indigo-600" /> */}
          Book Inventory
        </h1>
        <Button variant="success" onClick={() => setShowModal(true)} disabled={isLoading && !isAddingBook}>
          Add Book
        </Button>
      </header>

      <main className="relative min-h-[50vh]">{renderContent()}</main>

      <AddBookModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onAdd={handleAddBook}
        isLoading={isAddingBook}
      />
    </section>
  );
};