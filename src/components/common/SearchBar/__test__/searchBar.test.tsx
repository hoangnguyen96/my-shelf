import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import SearchBar from "..";

describe("SearchBar", () => {
  const props = {
    typeSearch: "title",
    valueSearch: "on",
    onInputChange: jest.fn(),
    onSelectChange: jest.fn(),
    onSubmitSearch: jest.fn(),
  };

  it("Should render correctly snapshot", () => {
    expect(
      render(<SearchBar placeholder="search" {...props} />)
    ).toMatchSnapshot();
  });
});
