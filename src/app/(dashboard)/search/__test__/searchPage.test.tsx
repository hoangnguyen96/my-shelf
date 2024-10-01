import { render, waitFor } from "@testing-library/react";
import { DATA_BOOKS, DATA_USER } from "@app/mocks/data";
import { getPaginatedBook, getUserById } from "@app/features/dashboard/actions";
import SearchPage from "../page";
import { auth } from "@app/auth";

jest.mock("@app/auth", () => ({
  auth: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@app/features/dashboard/actions", () => ({
  getPaginatedBook: jest.fn(),
  getUserById: jest.fn(),
}));

describe("Search Page", () => {
  const mockBooksPagination = [DATA_BOOKS];
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
    (getUserById as jest.Mock).mockReturnValue({
      favorites: DATA_USER[0].favorites,
    });
    (getPaginatedBook as jest.Mock).mockResolvedValue(mockBooksPagination);
  });

  it("Should render correctly snapshot", async () => {
    const { container } = render(await SearchPage());

    await waitFor(() => {
      expect(container).toMatchSnapshot();
    });
  });
});
