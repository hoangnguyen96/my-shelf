import "@testing-library/jest-dom";
import { fireEvent, render, waitFor } from "@testing-library/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ROUTES } from "@app/constants";
import { logout } from "@app/features/auth/actions";
import MenuProfile from "..";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@app/actions/auth", () => ({
  logout: jest.fn(),
}));

describe("MenuProfile", () => {
  const propsSession = {
    user: {
      isAdmin: true,
      email: "admin@gmail.com",
      id: "3733403",
      name: "admin",
      image: "https://i.ibb.co/RHMqQGr/man-1.png",
    },
    expires: "2024-12-31T23:59:59.999Z",
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Should render correctly snapshot", () => {
    expect(render(<MenuProfile session={propsSession} />)).toMatchSnapshot();
  });

  it("Should render correctly snapshot when data empty", () => {
    expect(render(<MenuProfile session={undefined} />)).toMatchSnapshot();
  });

  it("should call logout and redirect to login", async () => {
    const mockPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });

    const { getByText } = render(<MenuProfile session={propsSession} />);

    const logoutButton = getByText("Logout");
    fireEvent.click(logoutButton);

    await waitFor(() => {
      expect(logout).toHaveBeenCalled();
      expect(mockPush).toHaveBeenCalledWith(ROUTES.LOGIN);
    });
  });

  it("should redirect to profile", async () => {
    const mockPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });

    const { getByText } = render(<MenuProfile session={propsSession} />);

    const butRedirect = getByText("Profile");
    fireEvent.click(butRedirect);

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith(ROUTES.PROFILE);
    });
  });

  it("should redirect to profile", async () => {
    const mockPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });

    const { getByText } = render(<MenuProfile session={propsSession} />);

    const butRedirect = getByText("Favorites");
    fireEvent.click(butRedirect);

    // Use waitFor to ensure the async actions have been processed
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith(ROUTES.MY_BOOK_SHELF_FAVORITES);
    });
  });
});
