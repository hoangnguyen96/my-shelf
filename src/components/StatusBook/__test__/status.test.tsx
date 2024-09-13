import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import StatusBook from "..";

describe("Status", () => {
  it("Should render correctly snapshot", () => {
    expect(render(<StatusBook status={true} />)).toMatchSnapshot();
  });

  it("Should render with status is false", () => {
    const { getByText } = render(<StatusBook />);

    expect(getByText("None")).toBeInTheDocument();
  });
});
