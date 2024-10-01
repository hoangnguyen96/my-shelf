import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import Logo from "..";

describe("Logo", () => {
  it("Should render correctly snapshot", () => {
    expect(render(<Logo user={{ id: "1" }} />)).toMatchSnapshot();
  });

  it("Should render correctly snapshot when no data", () => {
    expect(render(<Logo user={{}} />)).toMatchSnapshot();
  });
});
