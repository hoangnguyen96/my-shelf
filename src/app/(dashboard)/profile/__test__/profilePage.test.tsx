import { render, waitFor } from "@testing-library/react";
import { getUserById } from "@app/features/dashboard/actions";
import { DATA_USER } from "@app/mocks/data";
import ProfilePage from "../page";
import { auth } from "@app/auth";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@app/auth", () => ({
  auth: jest.fn(),
}));

jest.mock("@app/features/dashboard/actions", () => ({
  getUserById: jest.fn(),
}));

describe("Profile Page", () => {
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
      dataUserById: DATA_USER[0],
    });
  });

  it("Should render correctly snapshot", async () => {
    const { container } = render(await ProfilePage());

    await waitFor(() => {
      expect(container).toMatchSnapshot();
    });
  });
});
