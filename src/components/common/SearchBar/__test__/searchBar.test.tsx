import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import SearchBar from "..";

describe("SearchBar", () => {
  it("Should render correctly snapshot", () => {
    expect(render(<SearchBar />)).toMatchSnapshot();
  });
});
