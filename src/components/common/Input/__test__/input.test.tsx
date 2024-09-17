import "@testing-library/jest-dom";
import { fireEvent, render } from "@testing-library/react";
import Input from "..";
import { PASSWORD } from "@app/constants";
import React from "react";

jest.spyOn(React, "useState").mockImplementation(() => [true, jest.fn()]);

describe("Input", () => {
  it("Should render correctly snapshot", () => {
    expect(render(<Input />)).toMatchSnapshot();
  });

  it("Should shows and hides password when toggle button is clicked", () => {
    const { getByRole } = render(<Input isTypePassword />);

    fireEvent.click(getByRole("button"));
    expect(getByRole("button")).toHaveAttribute("aria-label", PASSWORD.HIDE);
  });
});
