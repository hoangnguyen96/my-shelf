import "@testing-library/jest-dom";
import { fireEvent, render } from "@testing-library/react";
import Pagination from "..";

describe("Pagination", () => {
  const props = {
    pagination: 1,
    totalPages: 2,
    setPagination: jest.fn(),
  };

  it("Should render correctly snapshot", () => {
    expect(render(<Pagination {...props} />)).toMatchSnapshot();
  });

  it("Should handle previous pagination", () => {
    const { getByTestId } = render(<Pagination {...props} />);

    const button = getByTestId("prev-pagination");
    fireEvent.click(button);
  });

  it("Should handle click pagination", () => {
    const { getAllByTestId } = render(<Pagination {...props} />);

    const button = getAllByTestId("click-pagination");
    fireEvent.click(button[1]);
  });

  it("Should handle next pagination", () => {
    const { getByTestId } = render(<Pagination {...props} totalPages={4} />);

    const button = getByTestId("next-pagination");
    fireEvent.click(button);
  });
});
