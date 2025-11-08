import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BookRow } from "../../../components/internal/BookRow";
import "@testing-library/jest-dom";

// Mocking the imported components to isolate BookRow's logic.
// Mocking Lucide icons
jest.mock("lucide-react", () => ({
  ChevronDown: () => <div data-testid="icon-down"></div>,
  ChevronUp: () => <div data-testid="icon-up"></div>,
  ListTodo: () => <div data-testid="icon-list"></div>
}));

// Mocking the Button component
jest.mock("../../../components/common/Button", () => ({
  Button: ({ children, onClick, icon: Icon, ...props }) => (
    <button onClick={onClick} {...props} data-testid="mock-button">
      {children}
      {Icon && <Icon data-testid="button-icon" />}
    </button>
  )
}));

// Mocking the BookImage component
jest.mock("../../../components/internal//BookImage", () => ({
  BookImage: ({ title }) => (
    <img alt={`Mock ${title}`} data-testid="mock-book-image" />
  )
}));

// --- Test Data ---
const shortDescription = "A concise summary of the plot.";
const longDescription = "A".repeat(200);
const truncatedDescriptionExpected = "A".repeat(147) + "...";

const mockBookProps = {
  imageURL: "http://example.com/cover.jpg",
  title: "Test Book Title"
};

//Helper function to render BookRow in a valid <table> structure
const renderBookRow = props => {
  return render(
    <table>
      <tbody>
        <BookRow {...props} />
      </tbody>
    </table>
  );
};

describe("BookRow Component", () => {
  // Test 1: Renders book with short description
  test("renders book title and short description correctly", () => {
    renderBookRow({
      ...mockBookProps,
      description: shortDescription
    });

    // Check if the title is visible
    expect(screen.getByText("Test Book Title")).toBeInTheDocument();
    // Check if the short description is visible
    expect(screen.getByText(shortDescription)).toBeInTheDocument();
    // Check if the 'View' button is present and uses icon
    expect(screen.getByRole("button", { name: /View/i })).toBeInTheDocument();
    expect(screen.getByTestId("icon-down")).toBeInTheDocument();
  });

  // Test 2: Handles missing description
  test('renders "No description" and no view button when description is missing', () => {
    renderBookRow({
      ...mockBookProps,
      description: ""
    });

    // Check for the 'No description' message
    expect(screen.getByText("No description")).toBeInTheDocument();
    // Check that the View button is NOT present
    expect(
      screen.queryByRole("button", { name: /View/i })
    ).not.toBeInTheDocument();
  });
});
