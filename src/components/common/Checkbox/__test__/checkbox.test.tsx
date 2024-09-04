import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import Checkbox from "..";

describe("Checkbox", () => {
  it("Should render correctly snapshot", () => {
    expect(render(<Checkbox />)).toMatchSnapshot();
  });
});
