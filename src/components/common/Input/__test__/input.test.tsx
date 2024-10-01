import "@testing-library/jest-dom";
import { fireEvent, render } from "@testing-library/react";
import Input from "..";
import { PASSWORD } from "@app/constants";
import React from "react";

describe("Input", () => {
  beforeEach(() => {
    jest.spyOn(React, "useState").mockImplementation(() => [true, jest.fn()]);
  });

  it("Should render correctly snapshot", () => {
    expect(render(<Input />)).toMatchSnapshot();
  });

  it("Should hides password when toggle button is clicked", () => {
    const { getByRole } = render(<Input isTypePassword />);

    fireEvent.click(getByRole("button"));
    expect(getByRole("button")).toHaveAttribute("aria-label", PASSWORD.HIDE);
  });

  it("Should shows password when toggle button is clicked", () => {
    jest.spyOn(React, "useState").mockImplementation(() => [false, jest.fn()]);
    const { getByRole } = render(<Input isTypePassword />);

    fireEvent.click(getByRole("button"));
    expect(getByRole("button")).toHaveAttribute("aria-label", PASSWORD.SHOW);
  });
});
