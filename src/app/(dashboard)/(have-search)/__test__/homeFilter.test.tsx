import { act, render, waitFor } from "@testing-library/react";
import { useSession } from "next-auth/react";
import { getAllBook, getBookByParams, getUserById } from "@app/api";
import { DATA_BOOKS, DATA_USER } from "@app/app/__mocks__/data";
import * as utils from "@app/utils";
import HomePage from "../home/[...slug]/page";

jest.mock("@app/api", () => ({
  getAllBook: jest.fn(),
  getBookByParams: jest.fn(),
  getUserById: jest.fn(),
  updateUserById: jest.fn(),
}));

jest.mock("next-auth/react", () => ({
  useSession: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@app/utils", () => ({
  ...jest.requireActual("@app/utils"),
  getTwelveItemData: jest.fn(),
}));

describe("Home Search Params", () => {
  const mockBooks = DATA_BOOKS.slice(0, 12);
  (useSession as jest.Mock).mockReturnValue({
    data: {
      user: {
        isAdmin: true,
        email: "admin@gmail.com",
        id: "3733403",
        name: "admin",
        image: "https://i.ibb.co/RHMqQGr/man-1.png",
      },
    },
    status: "authenticated",
  });

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(utils, "getTwelveItemData").mockReturnValue(mockBooks);
    (getAllBook as jest.Mock).mockResolvedValue(DATA_BOOKS);
    (getBookByParams as jest.Mock).mockResolvedValue(mockBooks);
    (getUserById as jest.Mock).mockResolvedValue(DATA_USER[0]);
  });

  it("should render correctly and match snapshot", async () => {
    await act(async () => {
      const { container } = render(
        <HomePage params={{ slug: ["title", "on"] }} />
      );
      expect(container).toMatchSnapshot();
    });
  });
});
