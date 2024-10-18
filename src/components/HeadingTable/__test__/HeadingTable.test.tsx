import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import HeadingTable from "..";

describe("HeadingTable", () => {
  it("Should render correctly snapshot", () => {
    expect(render(<HeadingTable />)).toMatchSnapshot();
  });
});
