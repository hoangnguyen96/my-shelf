import { render, fireEvent, act } from "@testing-library/react";
import { useRouter } from "next/navigation";
import { authenticate } from "@app/actions/auth";
import LoginPage from "../../app/(auth)/login/page";

jest.mock("@app/actions/auth", () => ({
  authenticate: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("next-auth/react", () => ({
  signIn: jest.fn(),
}));

const mockedAuthenticate = authenticate as jest.MockedFunction<
  typeof authenticate
>;

describe("LoginPage", () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
  });

  it("Should render correctly snapshot", () => {
    expect(render(<LoginPage />)).toMatchSnapshot();
  });

  it("should handle submit login successful", async () => {
    const { getByPlaceholderText, getByTestId } = render(<LoginPage />);

    fireEvent.change(getByPlaceholderText("Email..."), {
      target: { value: "admin@gmail.com" },
    });
    fireEvent.change(getByPlaceholderText("Password..."), {
      target: { value: "Abc123___" },
    });

    await act(async () => {
      fireEvent.click(getByTestId("submit-login"));
    });

    expect(mockPush).toHaveBeenCalledWith("/home");
  });

  it("should handle submit login failed", async () => {
    mockedAuthenticate.mockResolvedValue("credentials");

    const { getByPlaceholderText, getByTestId } = render(<LoginPage />);

    fireEvent.change(getByPlaceholderText("Email..."), {
      target: { value: "admin@gmail.com" },
    });
    fireEvent.change(getByPlaceholderText("Password..."), {
      target: { value: "Abc123___" },
    });

    await act(async () => {
      fireEvent.click(getByTestId("submit-login"));
    });
  });
});
