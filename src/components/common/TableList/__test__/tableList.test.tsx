import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import TableList from "..";

describe("TableList", () => {
  it("Should render correctly snapshot", () => {
    expect(render(<TableList />)).toMatchSnapshot();
  });
});
