import { render, waitFor } from "@testing-library/react";
import { getBooksByLimit, getUserById } from "@app/features/dashboard/actions";
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
  getBooksByLimit: jest.fn(),
  getUserById: jest.fn(),
}));

describe("Home Search Params", () => {
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
    (getUserById as jest.Mock).mockResolvedValue({ data: DATA_USER[0] });
    (getBooksByLimit as jest.Mock).mockResolvedValue({ data: mockBooks });
  });

  it("should render correctly and match snapshot", async () => {
    const params = { slug: ["title", "on"] };
    const { container } = render(await HomePage({ params }));

    await waitFor(() => {
      expect(container).toMatchSnapshot();
    });
  });

  it("Should handle filter empty of books", async () => {
    const params = { slug: ["title", ""] };
    const { container } = render(await HomePage({ params }));

    await waitFor(() => {
      expect(container).toMatchSnapshot();
    });
  });
});
