import { render, waitFor } from "@testing-library/react";
import {
  getTwelveItemBook,
  getUserById,
} from "@app/features/dashboard/actions";
import { DATA_BOOKS, DATA_USER } from "@app/mocks/data";
import HomePage from "../page";
import { auth } from "@app/auth";

jest.mock("@app/auth", () => ({
  auth: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@app/features/dashboard/actions", () => ({
  getTwelveItemBook: jest.fn(),
  getUserById: jest.fn(),
}));

describe("HomePage", () => {
  const mockBooks = DATA_BOOKS.slice(0, 12);
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
    (getUserById as jest.Mock).mockResolvedValue(DATA_USER[0]);
    (getTwelveItemBook as jest.Mock).mockResolvedValue(mockBooks);
  });

  it("Should render correctly snapshot", async () => {
    const { container } = render(await HomePage());

    await waitFor(() => {
      expect(container).toMatchSnapshot();
    });
  });
});
