import { act, fireEvent, render, waitFor } from "@testing-library/react";
import { useSession } from "next-auth/react";
import {
  getAllBook,
  getBookById,
  getUserById,
} from "@app/features/dashboard/actions";
import { DATA_BOOKS, DATA_USER } from "@app/mocks/data";
import * as utils from "@app/utils";
import MyBookShelfPage from "../page";
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
}));

describe("My Book Shelf", () => {
  const mockBooks = DATA_BOOKS.filter((item) =>
    DATA_USER[0].shelfBooks.includes(item.id)
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
  });

  it("Should render correctly snapshot", async () => {
    const { container } = render(await MyBookShelfPage({ searchParams: {} }));

    await waitFor(() => {
      expect(container).toMatchSnapshot();
    });
  });

  it("Should render correctly snapshot when user has no shelfBooks", async () => {
    (getUserById as jest.Mock).mockResolvedValue({
      data: { ...DATA_USER[0], shelfBooks: null },
    });

    const { container } = render(
      await MyBookShelfPage({ searchParams: { title: "on" } })
    );

    await waitFor(() => {
      expect(container).toMatchSnapshot();
    });
  });
});
