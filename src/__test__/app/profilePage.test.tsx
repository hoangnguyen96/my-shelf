import { act, render } from "@testing-library/react";
import { useSession } from "next-auth/react";
import { getUserById } from "@app/api-request";
import { DATA_USER } from "@app/__mocks__/data";
import ProfilePage from "@app/app/(dashboard)/profile/page";

jest.mock("next-auth/react", () => ({
  useSession: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@app/api-request", () => ({
  getUserById: jest.fn(),
}));

jest.mock("@app/actions/auth", () => ({
  logout: jest.fn(),
}));

describe("Profile Page", () => {
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
    (getUserById as jest.Mock).mockReturnValue({
      data: DATA_USER[0],
    });
  });

  it("Should render correctly snapshot", async () => {
    await act(async () => {
      const { container } = render(<ProfilePage />);
      expect(container).toMatchSnapshot();
    });
  });

  it("Should handle getUserById error", async () => {
    (getUserById as jest.Mock).mockRejectedValue(
      new Error("Failed to fetch books")
    );
    await act(async () => {
      const { container } = render(<ProfilePage />);
      expect(container).toMatchSnapshot();
    });
  });
});
