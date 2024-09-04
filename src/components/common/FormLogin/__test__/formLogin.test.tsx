import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import FormLogin from "..";

describe("FormLogin", () => {
  it("Should render correctly snapshot", () => {
    expect(render(<FormLogin />)).toMatchSnapshot();
  });
});
