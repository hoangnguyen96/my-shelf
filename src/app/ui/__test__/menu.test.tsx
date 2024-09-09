import "@testing-library/jest-dom";
import { fireEvent, render, waitFor } from "@testing-library/react";
import AccountMenu from "../menu";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { logout } from "@app/actions/auth";

jest.mock("next-auth/react", () => ({
  useSession: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@app/actions/auth", () => ({
  logout: jest.fn(),
}));

describe("Menu", () => {
  (useSession as jest.Mock).mockReturnValue({
    data: { user: { isAdmin: false } },
    status: "authenticated",
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Should render correctly snapshot", () => {
    expect(render(<AccountMenu />)).toMatchSnapshot();
  });

  it("should call logout and redirect to login", async () => {
    const mockPush = jest.fn();

    // Mock the session and router
    (useSession as jest.Mock).mockReturnValue({
      data: { user: { name: "John Doe", email: "john.doe@example.com" } },
    });

    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });

    const { getByText } = render(<AccountMenu />);

    const logoutButton = getByText("Logout");
    fireEvent.click(logoutButton);

    // Use waitFor to ensure the async actions have been processed
    await waitFor(() => {
      expect(logout).toHaveBeenCalled();
      expect(mockPush).toHaveBeenCalledWith("/login");
    });
  });
});
