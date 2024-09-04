import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import ContributeComplete from "..";

describe("ContributeComplete", () => {
  it("Should render correctly snapshot", () => {
    expect(render(<ContributeComplete />)).toMatchSnapshot();
  });
});
