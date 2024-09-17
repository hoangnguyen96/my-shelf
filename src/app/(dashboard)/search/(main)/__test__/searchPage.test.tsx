import { act, fireEvent, render } from "@testing-library/react";
import { useSession } from "next-auth/react";
import * as utils from "@app/utils";
import { DATA_BOOKS, DATA_USER } from "@app/mocks/data";
import { getAllBook, getUserById } from "@app/api-request";
import SearchPage from "../page";

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
}));

jest.mock("@app/utils", () => ({
  ...jest.requireActual("@app/utils"),
  dividePaginationBooks: jest.fn(),
}));

jest.mock("@app/actions/auth", () => ({
  logout: jest.fn(),
}));

describe("Search Page", () => {
  const mockBooksPagination = [DATA_BOOKS];

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
    (getAllBook as jest.Mock).mockReturnValue({
      data: DATA_BOOKS,
    });
    (getUserById as jest.Mock).mockReturnValue({
      favorites: DATA_USER[0].favorites,
    });
  });

  it("Should render correctly snapshot", async () => {
    await act(async () => {
      const { container } = render(<SearchPage />);
      expect(container).toMatchSnapshot();
    });
  });

  it("Should render correctly snapshot when is shelfBook", async () => {
    (getUserById as jest.Mock).mockReturnValue({
      shelfBooks: DATA_USER[1].shelfBooks,
    });
    await act(async () => {
      const { asFragment } = render(<SearchPage />);
      expect(asFragment()).toMatchSnapshot();
    });
  });

  it("Should handle fetch data failed", async () => {
    (getAllBook as jest.Mock).mockRejectedValue(
      new Error("Failed to fetch books")
    );
    await act(async () => {
      const { asFragment } = render(<SearchPage />);
      expect(asFragment()).toMatchSnapshot();
    });
  });

  it("Should handle update favorite book", async () => {
    const { findAllByTestId } = render(<SearchPage />);

    const buttons = await findAllByTestId("handle-favorite");

    fireEvent.click(buttons[0]);
  });

  it("Should handle update favorite book when data favorites null", async () => {
    (getUserById as jest.Mock).mockReturnValue({
      favorites: null,
    });
    const { findAllByTestId } = render(<SearchPage />);

    const buttons = await findAllByTestId("handle-favorite");

    fireEvent.click(buttons[0]);
  });

  it("Should handle update favorite book when data favorites empty", async () => {
    (getUserById as jest.Mock).mockReturnValue({
      favorites: [],
    });
    const { findAllByTestId } = render(<SearchPage />);

    const buttons = await findAllByTestId("handle-favorite");

    fireEvent.click(buttons[0]);
  });
});
