import { fireEvent, render } from "@testing-library/react";
import { DATA_BOOKS, DATA_USER } from "@app/mocks/data";
import { MyBookShelf } from "../my-book-shelf";
import { act } from "react";
import { getBookById, getUserById, updateBookById } from "../../actions";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("../../actions", () => ({
  getUserById: jest.fn(),
  getBookById: jest.fn(),
  updateUserById: jest.fn(),
  updateBookById: jest.fn(),
}));

describe("My Book Shelf", () => {
  const mockBooks = DATA_BOOKS.filter((item) =>
    DATA_USER[0].shelfBooks.includes(item.id)
  );
  const props = {
    user: DATA_USER[0],
    list: DATA_BOOKS,
  };

  it("Should render correctly snapshot", () => {
    const { container } = render(<MyBookShelf {...props} />);

    expect(container).toMatchSnapshot();
  });

  it("Should handle fetch data empty", async () => {
    await act(async () => {
      const { asFragment } = render(
        <MyBookShelf list={[]} user={DATA_USER[1]} />
      );
      expect(asFragment()).toMatchSnapshot();
    });
  });

  it("Should handle return book", async () => {
    (getUserById as jest.Mock).mockReturnValue({
      id: "3733403",
      shelfBooks: ["1", "6"],
    });
    (updateBookById as jest.Mock).mockResolvedValue({
      data: { ...mockBooks[0] },
    });
    const { findAllByTestId } = render(<MyBookShelf {...props} />);

    const buttons = await findAllByTestId("return-book");

    fireEvent.click(buttons[0]);

    expect(getBookById).toHaveBeenCalledWith(mockBooks[0].id.toString());
  });
});
