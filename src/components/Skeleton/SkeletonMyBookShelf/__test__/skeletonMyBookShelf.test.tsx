import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import SkeletonMyBookShelf from "..";

describe("SkeletonMyBookShelf", () => {
  it("Should render correctly snapshot", () => {
    expect(render(<SkeletonMyBookShelf />)).toMatchSnapshot();
  });
});
