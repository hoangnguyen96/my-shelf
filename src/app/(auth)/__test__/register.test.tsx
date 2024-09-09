import { act, fireEvent, render, waitFor } from "@testing-library/react";
import RegisterPage from "../register/page";
import { addUser, getUserByEmail } from "@app/api";
import { useRouter } from "next/navigation";
import { MESSAGES } from "@app/constants";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@app/api", () => ({
  addUser: jest.fn(),
  getUserByEmail: jest.fn(),
}));

describe("Register", () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
  });

  it("Should render correctly snapshot", () => {
    expect(render(<RegisterPage />)).toMatchSnapshot();
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
