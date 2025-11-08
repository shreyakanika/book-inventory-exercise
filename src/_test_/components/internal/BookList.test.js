import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { BookList } from "../../../components/internal/BookList";
import { BookOpen } from "lucide-react";
import "@testing-library/jest-dom";

// Mock API URL and fetch globally
const API_URL = `${process.env.REACT_APP_API_HOST || ""}/api/books`;

const mockBooks = [
  { id: 1, title: "Book One", description: "Desc 1", imageURL: "url1.jpg" },
  { id: 2, title: "Book Two", description: "Desc 2", imageURL: "url2.jpg" }
];

// Mocking child components to isolate BookList
jest.mock("../../../components/common/Table", () => ({
  Table: ({ data, loading, columns, renderRow }) => (
    <div data-testid="mock-table">
      {loading && <p>Table is updating...</p>}
      {data.map(book => (
        <div key={book.id} data-testid={`book-item-${book.id}`}>
          {book.title}
        </div>
      ))}
    </div>
  )
}));

jest.mock("../../../components/common/Button", () => ({
  Button: ({ children, onClick, disabled, loading, variant }) => (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      data-testid={`btn-${children.replace(/\s/g, "").toLowerCase()}`}
      data-variant={variant}
    >
      {loading ? "Loading..." : children}
    </button>
  )
}));

jest.mock("../../../components/common/Message", () => ({
  Message: ({ type, title, message }) => (
    <div data-testid={`message-${type}`}>
      <strong>{title}:</strong> {message}
    </div>
  )
}));

jest.mock("../../../components/internal/AddBookModal", () => ({
  AddBookModal: ({ isOpen, onClose, onAdd, isLoading }) => (
    <div
      data-testid="mock-add-modal"
      data-open={isOpen.toString()}
      data-loading={isLoading.toString()}
    >
      {/* Simulate a successful submission from the modal */}
      <button
        onClick={() =>
          onAdd({ title: "New Book", description: "desc", imageUrl: "new.jpg" })
        }
        data-testid="modal-add-btn"
      >
        Add Book
      </button>
      <button onClick={onClose} data-testid="modal-close-btn">
        Close
      </button>
    </div>
  )
}));

jest.mock("../../../components/internal/BookRow", () => ({
  BookRow: ({ title }) => (
    <div data-testid={`mock-book-row-${title}`}>{title}</div>
  )
}));

jest.mock("lucide-react", () => ({
  BookOpen: props => <div data-testid="book-open-icon" {...props} />
}));

describe("BookList", () => {
  let fetchSpy;

  beforeEach(() => {
    fetchSpy = jest.spyOn(global, "fetch");
    // Default mock for initial fetch success
    fetchSpy.mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockBooks),
        status: 200
      })
    );
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("renders error message on fetch failure", async () => {
    fetchSpy.mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        status: 500,
        statusText: "Internal Server Error"
      })
    );

    render(<BookList />);

    await waitFor(() => {
      const errorMessage = screen.getByTestId("message-error");
      expect(errorMessage).toBeInTheDocument();
      expect(errorMessage).toHaveTextContent(
        "Could not fetch books. Please ensure the server is running."
      );
    });

    expect(screen.queryByTestId("mock-table")).not.toBeInTheDocument();
  });

  test("renders empty state message when fetch returns empty array", async () => {
    fetchSpy.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([]),
        status: 200
      })
    );
    render(<BookList />);

    await waitFor(() => {
      expect(screen.getByText("No books found")).toBeInTheDocument();
      expect(screen.getByText("Add Your First Book")).toBeInTheDocument();
      expect(screen.queryByTestId("mock-table")).not.toBeInTheDocument();
    });
  });
});
