import "@testing-library/jest-dom";
import { fireEvent, render, waitFor } from "@testing-library/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { logout } from "@app/actions/auth";
import MenuProfile from "..";
import { ROUTES } from "@app/constants";

jest.mock("next-auth/react", () => ({
  useSession: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@app/actions/auth", () => ({
  logout: jest.fn(),
}));

describe("MenuProfile", () => {
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

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Should render correctly snapshot", () => {
    expect(render(<MenuProfile />)).toMatchSnapshot();
  });

  it("Should render correctly snapshot when data empty", () => {
    (useSession as jest.Mock).mockReturnValue({
      data: {},
      status: "authenticated",
    });

    expect(render(<MenuProfile />)).toMatchSnapshot();
  });

  it("should call logout and redirect to login", async () => {
    const mockPush = jest.fn();
    (useSession as jest.Mock).mockReturnValue({
      data: { user: { name: "John Doe", email: "john.doe@example.com" } },
    });

    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });

    const { getByText } = render(<MenuProfile />);

    const logoutButton = getByText("Logout");
    fireEvent.click(logoutButton);

    await waitFor(() => {
      expect(logout).toHaveBeenCalled();
      expect(mockPush).toHaveBeenCalledWith(ROUTES.LOGIN);
    });
  });

  it("should redirect to profile", async () => {
    const mockPush = jest.fn();

    (useSession as jest.Mock).mockReturnValue({
      data: { user: { name: "John Doe", email: "john.doe@example.com" } },
    });

    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });

    const { getByText } = render(<MenuProfile />);

    const butRedirect = getByText("Profile");
    fireEvent.click(butRedirect);

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith(ROUTES.PROFILE);
    });
  });

  it("should redirect to profile", async () => {
    const mockPush = jest.fn();

    // Mock the session and router
    (useSession as jest.Mock).mockReturnValue({
      data: { user: { name: "", email: "john.doe@example.com" } },
    });

    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });

    const { getByText } = render(<MenuProfile />);

    const butRedirect = getByText("Favorites");
    fireEvent.click(butRedirect);

    // Use waitFor to ensure the async actions have been processed
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith(ROUTES.MY_BOOK_SHELF_FAVORITES);
    });
  });
});
