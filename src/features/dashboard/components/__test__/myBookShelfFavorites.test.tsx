import { act, fireEvent, render } from "@testing-library/react";
import { DATA_BOOKS, DATA_USER } from "@app/mocks/data";
import { MyBookShelfFavorites } from "../my-book-shelf-favorites";
import { getUserById, updateBookById } from "../../actions";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("../../actions", () => ({
  getUserById: jest.fn(),
  getBookById: jest.fn(),
  updateUserById: jest.fn(),
  updateBookById: jest.fn(),
}));

describe("My Book Shelf Favorites", () => {
  const mockBooks = DATA_BOOKS.filter((item) =>
    DATA_USER[2].favorites.includes(item.id)
  );
  const props = {
    user: DATA_USER[0],
    list: DATA_BOOKS,
  };

  it("Should render correctly snapshot", () => {
    const { container } = render(<MyBookShelfFavorites {...props} />);

    expect(container).toMatchSnapshot();
  });

  it("Should handle fetch data empty", () => {
    const { asFragment } = render(
      <MyBookShelfFavorites list={[]} user={DATA_USER[2]} />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("Should handle favorite book", async () => {
    const { findAllByTestId } = render(
      <MyBookShelfFavorites {...props} user={DATA_USER[1]} />
    );

    const buttons = await findAllByTestId("handle-favorite");

    fireEvent.click(buttons[0]);
  });

  it("Should handle favorite book when empty", async () => {
    (getUserById as jest.Mock).mockReturnValue({
      id: "3733403",
      favorites: DATA_USER[2].favorites,
    });
    (updateBookById as jest.Mock).mockResolvedValue({
      data: mockBooks,
    });
    const { findAllByTestId } = render(
      <MyBookShelfFavorites {...props} user={DATA_USER[2]} />
    );

    const buttons = await findAllByTestId("handle-favorite");

    fireEvent.click(buttons[0]);
  });
});
