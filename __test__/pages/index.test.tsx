import Home from "@/pages";
import "@testing-library/jest-dom";
import { render, screen,within } from "@testing-library/react";
import { debug } from "console";
import React from "react";


jest.mock("next/router", () => ({
  useRouter() {
    return {
      pathname: "",
      // ... whatever else you you call on `router`
    };
  },
}));

it("Home text", () => {
  render(<Home />);

  const elem = screen.getByText("Home");

  expect(elem).toBeInTheDocument();
});

// ForwardIconStyled
it("should change to the next song on next button click",  () => {
  render(<Home />);
  const butto =  screen.getByTestId('timedMessage');
    // const forButton = within(moviesCategory).getAllByRole("listitem");

  // const nextSongButton = screen.getAllByRole('button');
  expect(butto).toBeInTheDocument();
});


