import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import ModalSuccessProcess from "..";

describe("ModalSuccessProcess", () => {
  it("Should render correctly snapshot", () => {
    expect(
      render(<ModalSuccessProcess onClose={() => {}} />)
    ).toMatchSnapshot();
  });
});
