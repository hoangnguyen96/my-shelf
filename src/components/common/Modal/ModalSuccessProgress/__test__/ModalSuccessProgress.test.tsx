import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import ModalSuccessProgress from "..";

describe("ModalSuccessProgress", () => {
  it("Should render correctly snapshot", () => {
    expect(render(<ModalSuccessProgress />)).toMatchSnapshot();
  });
});
