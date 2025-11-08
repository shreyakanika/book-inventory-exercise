import React, { useState, useEffect, useRef } from 'react';
import { Modal } from '../common/Modal';
import { FormField } from '../common/FormField';
import { Button } from '../common/Button';
import { Message } from '../common/Message';

export const AddBookModal = ({ isOpen, onClose, onAdd, isLoading }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [error, setError] = useState(null);
  const titleInputRef = useRef(null);

  useEffect(() => {
    if (isOpen && titleInputRef.current) {
      titleInputRef.current.focus();
    }
  },
[isOpen]);

  const validateImageUrl = (imageUrl) => {
      if (!imageUrl) return true; 
      
      try {
        const urlObject = new URL(imageUrl);
        // Check if protocol is http or https
        if (urlObject.protocol !== 'http:' && urlObject.protocol !== 'https:') {
          return false;
        }
        // Check if it has a valid hostname
        if (!urlObject.hostname) {
          return false;
        }
        return true;
      } catch (err) {
        return false;
      }
    };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      setError("Book title is required.");
      return;
    }

    const trimmedImageUrl = imageUrl.trim();
    if (trimmedImageUrl && !validateImageUrl(trimmedImageUrl)) {
      setError("Please enter a valid HTTP or HTTPS URL for the image (e.g., https://example.com/image.jpg)");
      return;
    }    

    onAdd({
      title: trimmedTitle,
      description: description.trim(),
      imageUrl: imageUrl.trim() || undefined,
    });

    // Reset form
    setTitle("");
    setDescription("");
    setImageUrl("");
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New Book" size="md">
      <form onSubmit={handleSubmit}>
        <FormField
          id="book-title"
          label="Title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          ref={titleInputRef}
          placeholder="Enter book title"
          required
        />

        <FormField
          id="book-description"
          label="Description"
          as="textarea"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="A brief summary of the book"
          rows={3}
        />

        <FormField
          id="book-image-url"
          label="Image URL"
          type="url"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="https://example.com/cover.jpg"
        />

        {error && <Message type="error" message={error} />}

        <div className="flex justify-end space-x-3 mt-6">
          <Button variant="secondary" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" loading={isLoading}>
            Add Book
          </Button>
        </div>
      </form>
    </Modal>
  );
};