import { render } from "@testing-library/react";
import { useRouter } from "next/navigation";
import { RegisterForm } from "..";

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
    const { container } = render(<RegisterForm />);

    expect(container).toMatchSnapshot();
  });
});
