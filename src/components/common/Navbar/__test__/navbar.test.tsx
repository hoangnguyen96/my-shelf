import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import Navbar from "..";

describe("Navbar", () => {
  it("Should render correctly snapshot", () => {
    expect(render(<Navbar />)).toMatchSnapshot();
  });
});
