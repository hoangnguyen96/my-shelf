import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import Navbar from "..";
import { useSession } from "next-auth/react";

// Mock next-auth
jest.mock("next-auth/react", () => ({
  useSession: jest.fn(),
}));

describe("Navbar", () => {
  const props = {
    user: {
      id: "123",
      name: "John Doe",
      email: "johndoe@example.com",
      image: "https://example.com/johndoe.jpg",
      isAdmin: true,
    },
    expires: "2024-12-31T23:59:59.999Z",
  };

  (useSession as jest.Mock).mockReturnValue({
    data: { user: { isAdmin: false } },
    status: "authenticated",
  });

  it("Should render correctly snapshot", () => {
    expect(render(<Navbar user={props} />)).toMatchSnapshot();
  });
});
