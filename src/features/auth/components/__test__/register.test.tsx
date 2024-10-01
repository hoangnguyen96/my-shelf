import { act, fireEvent, render, waitFor } from "@testing-library/react";
import { Register } from "../register";
import { authenticate } from "../../actions";
import { useRouter } from "next/navigation";
import { addUser, getUserByEmail } from "@app/features/dashboard/actions";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
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

  it("Should render correctly snapshot", () => {
    const { container } = render(<Register />);

    expect(container).toMatchSnapshot();
  });
});
