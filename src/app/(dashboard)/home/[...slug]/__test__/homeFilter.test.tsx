import { act, fireEvent, render } from "@testing-library/react";
import { useSession } from "next-auth/react";
import { getAllBook, getBookByParams, getUserById } from "@app/api-request";
import { DATA_BOOKS, DATA_USER } from "@app/mocks/data";
import * as utils from "@app/utils";
import HomePage from "../page";

jest.mock("@app/api-request", () => ({
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

jest.mock("@app/actions/auth", () => ({
  logout: jest.fn(),
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
      expires: "2024-12-31T23:59:59.999Z",
    },
    status: "authenticated",
    signIn: jest.fn(),
    signOut: jest.fn(),
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

  it("Should handle fetch data failed", async () => {
    (getAllBook as jest.Mock).mockRejectedValue(
      new Error("Failed to fetch books")
    );
    await act(async () => {
      const { asFragment } = render(
        <HomePage params={{ slug: ["title", "on"] }} />
      );
      expect(asFragment()).toMatchSnapshot();
    });
  });

  it("Should handle update favorite", async () => {
    const { findAllByTestId } = render(
      <HomePage params={{ slug: ["title", "on"] }} />
    );

    const buttons = await findAllByTestId("update-favorite-cart");

    fireEvent.click(buttons[0]);
  });

  it("Should handle update favorite when id null", async () => {
    (getUserById as jest.Mock).mockReturnValue({
      favorites: [],
    });
    const { findAllByTestId } = render(
      <HomePage params={{ slug: ["title", "on"] }} />
    );

    const buttons = await findAllByTestId("update-favorite-cart");

    fireEvent.click(buttons[0]);
  });
});
