import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Modal } from "../../../components/common/Modal";

// Mock the lucide-react 'X' icon to simplify testing and avoid dependency issues
jest.mock("lucide-react", () => ({
  X: () => <div data-testid="x-icon" />
}));

describe("Modal", () => {
  const mockOnClose = jest.fn();
  const defaultProps = {
    isOpen: true,
    onClose: mockOnClose,
    title: "Test Modal Title",
    children: <div>Modal Content</div>
  };

  beforeEach(() => {
    // Clear all mock calls before each test
    mockOnClose.mockClear();
    // Ensure body overflow is reset before each test run
    document.body.style.overflow = "unset";
  });

  // Test non-rendering when closed
  it("should not render anything when isOpen is false", () => {
    const { container } = render(<Modal {...defaultProps} isOpen={false} />);
    expect(container.firstChild).toBeNull();
  });
});
