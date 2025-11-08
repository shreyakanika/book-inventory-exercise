import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../App";
import { BookList } from "../components/internal/BookList";
import "@testing-library/jest-dom";

// Mock the BookList component
jest.mock("../components/internal/BookList", () => ({
  BookList: () => <div data-testid="mock-book-list" />
}));

describe("App", () => {
  test("renders the application wrapper and the BookList component", () => {
    render(<App />);

    // Verify the main application is rendered
    const appWrapper = screen.getByText((content, element) => {
      return (
        element.tagName.toLowerCase() === "div" &&
        element.className.includes("min-h-screen")
      );
    });

    expect(appWrapper).toBeInTheDocument();

    // Verify the BookList component is rendered
    const bookListElement = screen.getByTestId("mock-book-list");

    expect(bookListElement).toBeInTheDocument();
  });
});
