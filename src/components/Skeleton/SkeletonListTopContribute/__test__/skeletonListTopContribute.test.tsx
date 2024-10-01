import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import SkeletonListTopContribute from "..";

describe("SkeletonListTopContribute", () => {
  it("Should render correctly snapshot", () => {
    expect(render(<SkeletonListTopContribute />)).toMatchSnapshot();
  });
});
