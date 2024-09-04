import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import MenuProfile from "..";

describe("MenuProfile", () => {
  it("Should render correctly snapshot", () => {
    expect(render(<MenuProfile />)).toMatchSnapshot();
  });
});
