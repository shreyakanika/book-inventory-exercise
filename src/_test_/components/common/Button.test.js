import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Button } from "../../../components/common/Button";
import { Loader2, Plus } from "lucide-react";

describe("Button Component", () => {
  describe("Rendering", () => {
    it("renders with children text", () => {
      render(<Button>Click Me</Button>);
      expect(screen.getByText("Click Me")).toBeInTheDocument();
    });

    it("renders as a button element by default", () => {
      render(<Button>Test</Button>);
      expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("applies base styles", () => {
      render(<Button>Test</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass(
        "inline-flex",
        "items-center",
        "justify-center",
        "font-semibold",
        "rounded-full"
      );
    });
  });

  describe("Disabled State", () => {
    it("applies disabled attribute when disabled prop is true", () => {
      render(<Button disabled>Disabled</Button>);
      expect(screen.getByRole("button")).toBeDisabled();
    });

    it("applies disabled opacity class when disabled", () => {
      render(<Button disabled>Disabled</Button>);
      const button = screen.getByRole("button");
      expect(button).toHaveClass(
        "disabled:opacity-50",
        "disabled:cursor-not-allowed"
      );
    });

    it("is disabled when loading is true", () => {
      render(<Button loading>Loading</Button>);
      expect(screen.getByRole("button")).toBeDisabled();
    });
  });
});
