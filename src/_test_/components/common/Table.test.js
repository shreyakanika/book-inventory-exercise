import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { Table } from "../../../components/common/Table";

// Mock
jest.mock("lucide-react", () => ({
  Loader2: () => <div data-testid="loader-icon" />
}));

describe("Table", () => {
  const mockColumns = [
    { header: "ID", accessor: "id" },
    { header: "Name", accessor: "name", className: "w-1/2" },
    { header: "Value", accessor: "value" }
  ];

  const mockData = [
    { id: 1, name: "Item A", value: 100 },
    { id: 2, name: "Item B", value: 200 }
  ];

  // renderRow function that renders a simple row
  const mockRenderRow = (item, index) => (
    <tr key={index} data-testid={`row-${item.id}`}>
      <td>{item.id}</td>
      <td>{item.name}</td>
      <td>{item.value}</td>
    </tr>
  );

  const defaultProps = {
    columns: mockColumns,
    data: mockData,
    renderRow: mockRenderRow
  };

  // Test : Renders message correctly

  it("should render the custom empty message when data is empty", () => {
    const customMessage = "No results matched your search.";
    render(<Table {...defaultProps} data={[]} emptyMessage={customMessage} />);

    // Check if the empty message is visible
    const cell = screen.getByText(customMessage);
    expect(cell).toBeInTheDocument();

    // Check if it spans the correct number of columns
    expect(cell).toHaveAttribute("colspan", mockColumns.length.toString());
  });
});
