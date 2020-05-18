import React from "react";
import Home from "../pages/index";
import { render, screen, waitFor } from "@testing-library/react";

jest.mock("@template/api-client", () => ({
  API: {
    club: {
      index: jest
        .fn()
        .mockResolvedValue([{ id: 1, name: "Sandbox", rating: 10 }]),
    },
  },
}));

describe("index", () => {
  it("renders client side", async () => {
    render(<Home clubs={[]} />);
    await waitFor(() =>
      expect(
        screen.getByText("The club Sandbox has a 10 rating")
      ).toBeInTheDocument()
    );
  });

  it("renders server side", async () => {
    render(<Home clubs={[{ id: 2, name: "Scout", rating: 10 }]} />);
    await waitFor(() =>
      expect(
        screen.getByText("The club Scout has a 10 rating")
      ).toBeInTheDocument()
    );
  });
});
