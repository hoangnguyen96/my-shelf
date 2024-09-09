import { render } from "@testing-library/react";
import { useSession } from "next-auth/react";
import NavbarBase from "../navbar";

jest.mock("next-auth/react", () => ({
  useSession: jest.fn(),
}));

describe("Navbar", () => {
  (useSession as jest.Mock).mockReturnValue({
    data: { user: { isAdmin: false } },
    status: "authenticated",
  });

  it("Should render correctly snapshot", () => {
    expect(render(<NavbarBase />)).toMatchSnapshot();
  });
});
