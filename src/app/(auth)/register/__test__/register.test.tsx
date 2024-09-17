import { act, fireEvent, render, waitFor } from "@testing-library/react";
import { addUser, getUserByEmail } from "@app/api-request";
import { useRouter } from "next/navigation";
import RegisterPage from "../page";
import { MESSAGES } from "@app/constants";
import { authenticate } from "@app/actions/auth";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@app/api-request", () => ({
  addUser: jest.fn(),
  getUserByEmail: jest.fn(),
}));

jest.mock("@app/actions/auth", () => ({
  authenticate: jest.fn(),
}));

describe("Register", () => {
  const mockPush = jest.fn();
  const mockedAuthenticate = authenticate as jest.MockedFunction<
    typeof authenticate
  >;

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
  });

  it("Should render correctly snapshot", async () => {
    await act(async () => {
      const { asFragment } = render(<RegisterPage />);
      expect(asFragment()).toMatchSnapshot();
    });
  });

  it("Should handle add user failed", async () => {
    (addUser as jest.Mock).mockRejectedValue(
      new Error("Authentication failed after registration.")
    );
    await act(async () => {
      const { asFragment } = render(<RegisterPage />);
      expect(asFragment()).toMatchSnapshot();
    });
  });

  it("Should call onSubmit success with correct data when form is valid", async () => {
    (getUserByEmail as jest.Mock).mockResolvedValue(undefined);
    (addUser as jest.Mock).mockResolvedValue({ success: true });
    mockedAuthenticate.mockResolvedValue("credentials");
    const { getByTestId, getByPlaceholderText, getByLabelText } = render(
      <RegisterPage />
    );

    await act(async () => {
      fireEvent.change(getByPlaceholderText(/username.../i), {
        target: { value: "hung" },
      });
      fireEvent.change(getByPlaceholderText(/email.../i), {
        target: { value: "hung77@gmail.com" },
      });
      fireEvent.change(getByLabelText("Password"), {
        target: { value: "Abc789()()" },
      });
      fireEvent.change(getByLabelText("Confirm Password"), {
        target: { value: "Abc789()()" },
      });

      fireEvent.click(getByTestId("submit-register"));
    });

    await waitFor(() => {
      expect(addUser).toHaveBeenCalledWith({
        username: "hung",
        email: "hung77@gmail.com",
        password: expect.any(String),
        isAdmin: false,
        phone: "",
        bio: "",
        avatar: "https://i.ibb.co/SKHPQYq/avatar-default.webp",
        favorites: [],
        shelfBooks: [],
        userId: expect.any(String),
      });
      expect(mockPush).toHaveBeenCalledWith("/home");
    });
  });

  it("Should call onSubmit failed with correct data when form is valid", async () => {
    mockedAuthenticate.mockRejectedValue("credentials");
    (addUser as jest.Mock).mockRejectedValue(
      new Error(MESSAGES.ADD_USER_FAILED)
    );
    const { getByTestId, getByPlaceholderText, getByLabelText } = render(
      <RegisterPage />
    );

    await act(async () => {
      fireEvent.change(getByPlaceholderText(/username.../i), {
        target: { value: "hung" },
      });
      fireEvent.change(getByPlaceholderText(/email.../i), {
        target: { value: "hung77@gmail.com" },
      });
      fireEvent.change(getByLabelText("Password"), {
        target: { value: "Abc789()()" },
      });
      fireEvent.change(getByLabelText("Confirm Password"), {
        target: { value: "Abc789()()" },
      });

      fireEvent.click(getByTestId("submit-register"));
    });
  });

  it("Should show error when email already exists", async () => {
    (getUserByEmail as jest.Mock).mockResolvedValue([
      { email: "hung77@gmail.com" },
    ]);

    const { getByPlaceholderText, getByTestId, getByText } = render(
      <RegisterPage />
    );

    await act(async () => {
      fireEvent.change(getByPlaceholderText(/email.../i), {
        target: { value: "hung77@gmail.com" },
      });

      fireEvent.click(getByTestId("submit-register"));
    });
  });
});
