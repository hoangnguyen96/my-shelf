import { act, fireEvent, render } from "@testing-library/react";
import { useSession } from "next-auth/react";
import * as utils from "@app/utils";
import { DATA_BOOKS, DATA_USER } from "@app/__mocks__/data";
import { BookType } from "@app/models";
import { getAllBook, getBookByParams, getUserById } from "@app/api-request";
import SearchPage from "@app/app/(dashboard)/search/(main)/[...slug]/page";

jest.mock("next-auth/react", () => ({
  useSession: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@app/api-request", () => ({
  getAllBook: jest.fn(),
  getUserById: jest.fn(),
  updateUserById: jest.fn(),
  getBookByParams: jest.fn(),
  getDataByParams: jest.fn(),
}));

jest.mock("@app/utils", () => ({
  ...jest.requireActual("@app/utils"),
  dividePaginationBooks: jest.fn(),
}));

jest.mock("@app/actions/auth", () => ({
  logout: jest.fn(),
}));

describe("Search Page Params", () => {
  const mockBooksPagination = DATA_BOOKS.reduce(
    (acc: BookType[][], _, i, self) => {
      if (!(i % 12)) {
        return [...acc, self.slice(i, i + 12)];
      }
      return acc;
    },
    []
  );

  const mockBooksPaginationByParams = DATA_BOOKS.filter((item) =>
    item.title.includes("on")
  ).reduce((acc: BookType[][], _, i, self) => {
    if (!(i % 12)) {
      return [...acc, self.slice(i, i + 12)];
    }
    return acc;
  }, []);

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
    jest
      .spyOn(utils, "dividePaginationBooks")
      .mockReturnValue(mockBooksPagination);
    jest
      .spyOn(utils, "getListDataByTypeAndValue")
      .mockReturnValue(mockBooksPaginationByParams[0]);
    jest
      .spyOn(utils, "getDataByParams")
      .mockReturnValue(mockBooksPaginationByParams);

    (getAllBook as jest.Mock).mockReturnValue({
      data: DATA_BOOKS,
    });
    (getBookByParams as jest.Mock).mockReturnValue({
      data: mockBooksPaginationByParams[0],
    });
    (getUserById as jest.Mock).mockReturnValue({
      favorites: DATA_USER[0].favorites,
    });
  });

  it("Should render correctly snapshot", async () => {
    await act(async () => {
      const { asFragment } = render(
        <SearchPage params={{ slug: ["title", "on"] }} />
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
        <SearchPage params={{ slug: ["title", "on"] }} />
      );
      expect(asFragment()).toMatchSnapshot();
    });
  });

  it("Should handle update favorite book", async () => {
    const { findAllByTestId } = render(
      <SearchPage params={{ slug: ["title", "on"] }} />
    );

    const buttons = await findAllByTestId("handle-favorite");

    fireEvent.click(buttons[0]);
  });
});
