import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { AddBookModal } from "../../../components/internal/AddBookModal";

// Mock all imported components to isolate AddBookModal's logic
jest.mock("../../../components/common/Modal", () => ({
  Modal: ({ isOpen, onClose, title, children }) => (
    <div data-testid="modal" onClick={onClose} aria-label={title}>
      {isOpen ? children : null}
    </div>
  )
}));
jest.mock("../../../components/common/Button", () => ({
  Button: ({ children, onClick, type, loading, disabled }) => (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      data-testid={`button-${children.replace(/\s+/g, "")}`}
    >
      {children} {loading && "(Loading)"}
    </button>
  )
}));
jest.mock("../../../components/common/Message", () => ({
  Message: ({ type, message }) => (
    <div data-testid="message-alert" role="alert">
      {type.toUpperCase()}: {message}
    </div>
  )
}));

describe("AddBookModal", () => {
  const mockOnClose = jest.fn();
  const mockOnAdd = jest.fn();
  const defaultProps = {
    isOpen: true,
    onClose: mockOnClose,
    onAdd: mockOnAdd,
    isLoading: false
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Helper to change form fields
  const changeField = (label, value) => {
    fireEvent.change(screen.getByLabelText(new RegExp(label)), {
      target: { value }
    });
  };

  // Test Case: Renders correctly when open
  it("should render the form fields when open", () => {
    render(<AddBookModal {...defaultProps} />);

    expect(screen.getByLabelText("Title *")).toBeInTheDocument();
    expect(screen.getByLabelText("Description")).toBeInTheDocument();
    expect(screen.getByLabelText("Image URL")).toBeInTheDocument();
    expect(screen.getByTestId("button-AddBook")).toBeInTheDocument();
  });

  // Test Case: Handles required Title validation on submit
  it("should show an error if the Title field is empty on submit", async () => {
    render(<AddBookModal {...defaultProps} />);

    // Submit with empty title
    fireEvent.click(screen.getByTestId("button-AddBook"));

    // Check for title error message
    expect(screen.getByTestId("message-alert")).toHaveTextContent(
      "ERROR: Book title is required."
    );
    expect(mockOnAdd).not.toHaveBeenCalled();
  });
});
