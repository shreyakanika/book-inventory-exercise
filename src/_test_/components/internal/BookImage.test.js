import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import { BookImage } from "../../../components/internal/BookImage";

describe("BookImage", () => {
  const mockTitle = "The Great Gatsby";
  const mockValidUrl = "https://example.com/cover.jpg";

  // Test: Renders image when URL is valid
  it("should render the image when a valid imageURL is provided", () => {
    render(<BookImage imageURL={mockValidUrl} title={mockTitle} />);

    const img = screen.getByRole("img", { name: `Cover for ${mockTitle}` });

    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", mockValidUrl);
    expect(screen.queryByTestId("icon-placeholder")).not.toBeInTheDocument();
  });
});
