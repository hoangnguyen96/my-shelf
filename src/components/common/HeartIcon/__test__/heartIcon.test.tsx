import "@testing-library/jest-dom";
import { fireEvent, render } from "@testing-library/react";
import HeartIcon from "..";

describe("HeartIcon", () => {
  it("Should render correctly snapshot", () => {
    expect(render(<HeartIcon id="1" isFavorite={true} />)).toMatchSnapshot();
  });

  it("Should calls onUpdateFavorites when clicked", () => {
    const mockOnUpdateFavorites = jest.fn();
    const { getByRole } = render(
      <HeartIcon id="1" onUpdateFavorites={mockOnUpdateFavorites} />
    );

    fireEvent.click(getByRole("button"));

    expect(mockOnUpdateFavorites).toHaveBeenCalledWith("1");
  });
});
