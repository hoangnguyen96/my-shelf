import { act, fireEvent, render, waitFor } from "@testing-library/react";
import { Login } from "../login";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { authenticate } from "../../actions";

jest.mock("../../actions", () => ({
  authenticate: jest.fn(),
}));

jest.mock("@chakra-ui/react", () => ({
  ...jest.requireActual("@chakra-ui/react"),
  useToast: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

const mockedAuthenticate = authenticate as jest.MockedFunction<
  typeof authenticate
>;

describe("Login", () => {
  const mockToast = jest.fn();
  const mockPush = jest.fn();

  beforeEach(() => {
    (useToast as jest.Mock).mockReturnValue(mockToast);
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
  });

  it("Should render correctly snapshot", () => {
    const { container } = render(<Login />);

    expect(container).toMatchSnapshot();
  });

  it("should handle submit login successful", async () => {
    const { getByPlaceholderText, getByTestId } = render(<Login />);

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

    const { getByPlaceholderText, getByTestId } = render(<Login />);

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
