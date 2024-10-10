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

describe("Search Page Params", () => {
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
      data: DATA_USER[0].favorites,
    });
    (getPaginatedBook as jest.Mock).mockResolvedValue({
      data: mockBooksPagination,
    });
  });

  it("Should render correctly snapshot", async () => {
    const params = { slug: ["title", "on"] };
    const { container } = render(await SearchPage({ params }));

    await waitFor(() => {
      expect(container).toMatchSnapshot();
    });
  });

  it("Should handle filter empty of search books", async () => {
    const params = { slug: ["title", ""] };
    const { container } = render(await SearchPage({ params }));

    await waitFor(() => {
      expect(container).toMatchSnapshot();
    });
  });
});
