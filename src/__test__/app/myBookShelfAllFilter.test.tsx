import { act, fireEvent, render } from "@testing-library/react";
import { useSession } from "next-auth/react";
import { DATA_BOOKS, DATA_USER } from "@app/__mocks__/data";
import * as utils from "@app/utils";
import { getAllBook, getBookById, getUserById } from "@app/api-request";
import MyBookShelfByParams from "@app/app/(dashboard)/my-book-shelf/(main)/[...slug]/page";

jest.mock("next-auth/react", () => ({
  useSession: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@app/api-request", () => ({
  getAllBook: jest.fn(),
  getUserById: jest.fn(),
  getBookById: jest.fn(),
  updateBookById: jest.fn(),
}));

jest.mock("@app/utils", () => ({
  ...jest.requireActual("@app/utils"),
  filterBooksOnShelf: jest.fn(),
  filterBooksOnShelfByParams: jest.fn(),
}));

jest.mock("@app/actions/auth", () => ({
  logout: jest.fn(),
}));

describe("My Book Shelf All Search", () => {
  const mockBooks = DATA_BOOKS.filter((item) =>
    DATA_USER[0].shelfBooks.includes(item.id)
  );

  const mockBooksByParams = mockBooks.filter((book) =>
    book.title.includes("on")
  );

  (useSession as jest.Mock).mockReturnValue({
    data: {
      user: {
        isAdmin: true,
        email: "admin@gmail.com",
        id: "3733403",
        name: "admin",
        image: "https://i.ibb.co/RHMqQGr/man-1.png",
      },
      expires: "2024-12-31T23:59:59.999Z",
    },
    status: "authenticated",
    signIn: jest.fn(),
    signOut: jest.fn(),
  });

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(utils, "filterBooksOnShelf").mockReturnValue(mockBooks);
    jest
      .spyOn(utils, "filterBooksOnShelfByParams")
      .mockReturnValue(mockBooksByParams);

    (getAllBook as jest.Mock).mockReturnValue({
      data: DATA_BOOKS,
    });
    (getUserById as jest.Mock).mockReturnValue({
      data: DATA_USER[0],
    });
    (getBookById as jest.Mock).mockReturnValue({
      data: mockBooks[0],
    });
  });

  it("Should render correctly snapshot", async () => {
    await act(async () => {
      const { asFragment } = render(
        <MyBookShelfByParams params={{ slug: ["title", "on"] }} />
      );
      expect(asFragment()).toMatchSnapshot();
    });
  });

  it("Should handle fetch data failed", async () => {
    (getAllBook as jest.Mock).mockRejectedValue(
      new Error("Failed to fetch books")
    );
    await act(async () => {
      const { asFragment } = render(
        <MyBookShelfByParams params={{ slug: ["title", "on"] }} />
      );
      expect(asFragment()).toMatchSnapshot();
    });
  });

  it("Should handle return book", async () => {
    const { findAllByTestId } = render(
      <MyBookShelfByParams params={{ slug: ["title", "on"] }} />
    );

    const buttons = await findAllByTestId("return-book");

    fireEvent.click(buttons[0]);

    expect(getBookById).toHaveBeenCalledWith(mockBooks[0].id.toString());
  });
});
