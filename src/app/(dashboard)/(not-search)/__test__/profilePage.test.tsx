import { render } from "@testing-library/react";
import { useSession } from "next-auth/react";
import ProfilePage from "../profile/page";

jest.mock("next-auth/react", () => ({
  useSession: jest.fn(),
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
    },
    status: "authenticated",
  });

  it("Should render correctly snapshot", () => {
    expect(render(<ProfilePage />)).toMatchSnapshot();
  });
});
