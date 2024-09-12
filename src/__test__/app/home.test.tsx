import { act, fireEvent, render } from "@testing-library/react";
import { useSession } from "next-auth/react";
import { getAllBook, getUserById } from "@app/api-request";
import { DATA_BOOKS, DATA_USER } from "@app/__mocks__/data";
import * as utils from "@app/utils";
import HomePage from "@app/app/(dashboard)/home/page";

jest.mock("@app/api-request", () => ({
  getAllBook: jest.fn(),
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

describe("HomePage", () => {
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
  });

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(utils, "getTwelveItemData").mockReturnValue(mockBooks);
    (getAllBook as jest.Mock).mockReturnValue({
      data: DATA_BOOKS,
    });
    (getUserById as jest.Mock).mockReturnValue({
      favorites: DATA_USER[0].favorites,
    });
  });

  it("Should render correctly snapshot", async () => {
    await act(async () => {
      const { container } = render(<HomePage />);
      expect(container).toMatchSnapshot();
    });
  });

  it("Should handle fetch data failed", async () => {
    (getAllBook as jest.Mock).mockRejectedValue(
      new Error("Failed to fetch books")
    );
    await act(async () => {
      const { asFragment } = render(<HomePage />);
      expect(asFragment()).toMatchSnapshot();
    });
  });

  it("Should handle update favorite", async () => {
    const { findAllByTestId } = render(<HomePage />);

    const buttons = await findAllByTestId("update-favorite-cart");

    fireEvent.click(buttons[0]);
  });
});
