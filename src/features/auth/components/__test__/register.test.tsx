import { render } from "@testing-library/react";
import { Register } from "../register";
import { useRouter } from "next/navigation";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("Register", () => {
  const mockPush = jest.fn();

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
