import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import LoadingIndicator from "..";

describe("LoadingIndicator", () => {
  it("Should render correctly snapshot", () => {
    expect(render(<LoadingIndicator />)).toMatchSnapshot();
  });
});
