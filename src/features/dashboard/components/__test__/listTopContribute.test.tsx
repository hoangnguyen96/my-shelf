import { DATA_BOOKS, DATA_USER } from "@app/mocks/data";
import { getTopThreeBook, getUserById } from "../../actions";
import { auth } from "@app/auth";
import { render, waitFor } from "@testing-library/react";
import { ListTopContribute } from "../list-top-contribute";

jest.mock("@app/auth", () => ({
  auth: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("../../actions", () => ({
  getTopThreeBook: jest.fn(),
  getUserById: jest.fn(),
}));

describe("List Top Contribute", () => {
  const mockBooks = DATA_BOOKS.slice(0, 3);
  const mockUser = DATA_USER[0];
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
    (getUserById as jest.Mock).mockResolvedValue(mockUser);
    (getTopThreeBook as jest.Mock).mockResolvedValue(mockBooks);
  });

  it("Should render correctly snapshot", async () => {
    const { container } = render(await ListTopContribute());

    await waitFor(() => {
      expect(container).toMatchSnapshot();
    });
  });
});
