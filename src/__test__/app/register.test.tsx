import { act, fireEvent, render, waitFor } from "@testing-library/react";
import RegisterPage from "../../app/(auth)/register/page";
import { addUser, getUserByEmail } from "@app/api-request";
import { useRouter } from "next/navigation";

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

  it("Should call onSubmit with correct data when form is valid", async () => {
    (getUserByEmail as jest.Mock).mockResolvedValue(undefined);
    (addUser as jest.Mock).mockResolvedValue({ success: true });
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
        password: expect.any(String), // Password hash
        isAdmin: false,
        phone: "",
        bio: "",
        avatar: "https://i.ibb.co/88X1WfZ/avatar-default.png",
        favorites: [],
        shelfBooks: [],
        userId: expect.any(String), // userId generated from generateSevenDigitUUID
      });
      expect(mockPush).toHaveBeenCalledWith("/home");
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
