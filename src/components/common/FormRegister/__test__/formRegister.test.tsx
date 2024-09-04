import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import FormRegister from "..";

describe("FormRegister", () => {
  it("Should render correctly snapshot", () => {
    expect(render(<FormRegister />)).toMatchSnapshot();
  });
});
