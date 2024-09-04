import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import FooterForm from "..";

describe("FooterForm", () => {
  it("Should render correctly snapshot", () => {
    expect(
      render(<FooterForm text="Name" textLink="Login" />)
    ).toMatchSnapshot();
  });
});
