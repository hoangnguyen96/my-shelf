import { act, render } from "@testing-library/react";
import { useSession } from "next-auth/react";
import { getBookById, getUserById } from "@app/api-request";
import { DATA_BOOKS, DATA_USER } from "@app/mocks/data";
import PreviewBook from "../page";

jest.mock("next-auth/react", () => ({
  useSession: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@app/api-request", () => ({
  getBookById: jest.fn(),
  getUserById: jest.fn(),
  updateUserById: jest.fn(),
}));

jest.mock("@app/actions/auth", () => ({
  logout: jest.fn(),
}));

describe("Preview book Page", () => {
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
    (getBookById as jest.Mock).mockReturnValue({
      data: DATA_BOOKS[0],
    });
    (getUserById as jest.Mock).mockReturnValue({
      shelfBooks: DATA_USER[0].shelfBooks,
    });
  });

  it("Should render correctly snapshot", async () => {
    await act(async () => {
      const { container } = render(<PreviewBook params={{ id: "1" }} />);
      expect(container).toMatchSnapshot();
    });
  });
});
