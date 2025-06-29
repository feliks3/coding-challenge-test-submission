import React from "react";
import { render, screen } from "@testing-library/react";
import ErrorMessage from "./ErrorMessage";

describe("ErrorMessage", () => {
  it("renders the message when provided", () => {
    render(<ErrorMessage message="An error occurred" />);
    expect(screen.getByText("An error occurred")).toBeInTheDocument();
  });

  it("renders nothing when message is empty", () => {
    const { container } = render(<ErrorMessage message="" />);
    expect(container.firstChild).toBeNull();
  });
});
