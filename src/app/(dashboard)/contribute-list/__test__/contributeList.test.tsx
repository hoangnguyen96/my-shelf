import { render, waitFor } from "@testing-library/react";
import { DATA_BOOKS, DATA_USER } from "@app/mocks/data";
import { getAllBook, getUserById } from "@app/features/dashboard/actions";
import ContributeList from "../page";
import { auth } from "@app/auth";

jest.mock("@app/auth", () => ({
  auth: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@app/features/dashboard/actions", () => ({
  getAllBook: jest.fn(),
  getUserById: jest.fn(),
}));

describe("Contribute List Page", () => {
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
    (getAllBook as jest.Mock).mockResolvedValue({ data: DATA_BOOKS });
    (getUserById as jest.Mock).mockResolvedValue({ data: DATA_USER[0] });
  });

  it("Should render correctly snapshot", async () => {
    const { container } = render(await ContributeList());

    await waitFor(() => {
      expect(container).toMatchSnapshot();
    });
  });
});
