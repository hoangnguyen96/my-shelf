import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import HeadingForm from "..";

describe("HeadingForm", () => {
  it("Should render correctly snapshot", () => {
    expect(
      render(<HeadingForm title="Login" description="Test Login" />)
    ).toMatchSnapshot();
  });
});
