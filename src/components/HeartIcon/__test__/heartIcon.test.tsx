import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import HeartIcon from "..";

describe("HeartIcon", () => {
  it("Should render correctly snapshot", () => {
    expect(render(<HeartIcon id="1" isFavorite={true} />)).toMatchSnapshot();
  });

  it("Should render correctly snapshot when favorite is false", () => {
    expect(render(<HeartIcon id="1" isFavorite={false} />)).toMatchSnapshot();
  });
});
