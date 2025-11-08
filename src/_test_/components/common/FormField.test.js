import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { FormField } from "../../../components/common/FormField";

describe("FormField", () => {
  // Mock
  const mockRef = React.createRef();

  // Test : Renders with default input and label
  it("should render an input field and a label", () => {
    render(<FormField label="Username" id="username-field" ref={mockRef} />);

    // Check if label is present
    expect(screen.getByLabelText("Username")).toBeInTheDocument();

    // Check if the input is rendered with the correct default tag
    const input = screen.getByRole("textbox", { name: "Username" });
    expect(input).toBeInTheDocument();
    expect(input.tagName).toBe("INPUT");
  });
});
