import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import Input from "..";

describe("Input", () => {
  it("Should render correctly snapshot", () => {
    expect(render(<Input />)).toMatchSnapshot();
  });
});
