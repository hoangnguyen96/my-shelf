import "@testing-library/jest-dom";
import { fireEvent, render } from "@testing-library/react";
import Input from "..";
import { PASSWORD } from "@app/constants";

describe("Input", () => {
  it("Should render correctly snapshot", () => {
    expect(render(<Input />)).toMatchSnapshot();
  });

  it("Should shows and hides password when toggle button is clicked", () => {
    const { getByRole } = render(<Input isTypePassword />);

    expect(getByRole("button")).toHaveAttribute("aria-label", PASSWORD.SHOW);

    fireEvent.click(getByRole("button"));

    expect(getByRole("button")).toHaveAttribute("aria-label", PASSWORD.HIDE);
  });
});
