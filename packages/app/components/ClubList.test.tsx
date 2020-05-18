import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import ClubList from "./ClubList";

describe("ClubList", () => {
  it("renders list", async () => {
    render(<ClubList clubs={[{ id: 2, name: "Scout", rating: 10 }]} />);
    expect(
      screen.getByText("The club Scout has a 10 rating")
    ).toBeInTheDocument();
  });

  it("renders placeholder", async () => {
    render(<ClubList clubs={[]} />);
    expect(screen.getByText("No clubs in the database")).toBeInTheDocument();
  });
});
