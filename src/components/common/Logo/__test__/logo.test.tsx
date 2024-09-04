import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import Logo from "..";

describe("Logo", () => {
  it("Should render correctly snapshot", () => {
    expect(render(<Logo />)).toMatchSnapshot();
  });
});
