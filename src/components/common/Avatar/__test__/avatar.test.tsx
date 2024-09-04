import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import Avatar from "..";

describe("Avatar", () => {
  it("Should render correctly snapshot", () => {
    expect(render(<Avatar />)).toMatchSnapshot();
  });
});
