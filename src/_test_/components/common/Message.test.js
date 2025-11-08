import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { Message } from "../../../components/common/Message";

describe("Message", () => {
  const testTitle = "Attention";
  const testMessage = "Please review the system logs.";

  // Test: Renders title and message
  it("should render the title and message content", () => {
    render(<Message title={testTitle} message={testMessage} />);

    expect(screen.getByText(testTitle)).toBeInTheDocument();
    expect(screen.getByText(testMessage)).toBeInTheDocument();
  });
});
