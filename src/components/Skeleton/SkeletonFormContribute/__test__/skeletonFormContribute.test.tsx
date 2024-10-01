import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import SkeletonListFormContribute from "..";

describe("SkeletonListFormContribute", () => {
  it("Should render correctly snapshot", () => {
    expect(render(<SkeletonListFormContribute />)).toMatchSnapshot();
  });
});
