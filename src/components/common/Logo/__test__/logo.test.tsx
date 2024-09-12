import "@testing-library/jest-dom";
import { useSession } from "next-auth/react";
import { render } from "@testing-library/react";
import Logo from "..";

jest.mock("next-auth/react", () => ({
  useSession: jest.fn(),
}));

describe("Logo", () => {
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

  it("Should render correctly snapshot", () => {
    expect(render(<Logo />)).toMatchSnapshot();
  });
});
