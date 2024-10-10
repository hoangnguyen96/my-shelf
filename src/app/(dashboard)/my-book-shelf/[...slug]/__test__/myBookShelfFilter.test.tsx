import { render, waitFor } from "@testing-library/react";
import { DATA_BOOKS, DATA_USER } from "@app/mocks/data";
import * as utils from "@app/utils";
import { getAllBook, getUserById } from "@app/features/dashboard/actions";
import MyBookShelfByParamsPage from "../page";
import { auth } from "@app/auth";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@app/auth", () => ({
  auth: jest.fn(),
}));

jest.mock("@app/features/dashboard/actions", () => ({
  getAllBook: jest.fn(),
  getUserById: jest.fn(),
}));

jest.mock("@app/utils", () => ({
  ...jest.requireActual("@app/utils"),
  filterBooksOnShelf: jest.fn(),
  filterBooksOnShelfByParams: jest.fn(),
}));

describe("My Book Shelf All Search", () => {
  const mockBooks = DATA_BOOKS.filter((item) =>
    DATA_USER[0].shelfBooks.includes(item.id)
  );
  const mockBooksByParams = mockBooks.filter((book) =>
    book.title.includes("on")
  );
  const mockSession = {
    user: {
      isAdmin: true,
      email: "admin@gmail.com",
      id: "3733403",
      name: "admin",
      image: "https://i.ibb.co/RHMqQGr/man-1.png",
    },
  };
  const params = { slug: ["title", "on"] };

  beforeEach(() => {
    jest.clearAllMocks();
    (auth as jest.Mock).mockResolvedValue(mockSession);
    (getAllBook as jest.Mock).mockReturnValue({
      data: DATA_BOOKS,
    });
    (getUserById as jest.Mock).mockReturnValue({
      data: DATA_USER[0],
    });
    jest.spyOn(utils, "filterBooksOnShelf").mockReturnValue(mockBooks);
    jest
      .spyOn(utils, "filterBooksOnShelfByParams")
      .mockReturnValue(mockBooksByParams);
  });

  it("Should render correctly snapshot", async () => {
    const { container } = render(await MyBookShelfByParamsPage({ params }));

    await waitFor(() => {
      expect(container).toMatchSnapshot();
    });
  });

  it("Should render correctly snapshot when user has no shelfBooks", async () => {
    (getUserById as jest.Mock).mockResolvedValue({
      data: { ...DATA_USER[0], shelfBooks: null },
    });
    const { container } = render(await MyBookShelfByParamsPage({ params }));

    await waitFor(() => {
      expect(container).toMatchSnapshot();
    });
  });
});
