import { render, fireEvent, waitFor, act } from "@testing-library/react";
import { useRouter } from "next/navigation";
import { useToast } from "@chakra-ui/react";
import { authenticate } from "@app/actions/auth";
import LoginPage from "../login/page";

jest.mock("@app/actions/auth", () => ({
  authenticate: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
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
