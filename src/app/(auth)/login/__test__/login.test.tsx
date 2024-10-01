import { render } from "@testing-library/react";
import LoginPage from "../page";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("LoginPage", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Should render correctly snapshot", () => {
    expect(render(<LoginPage />)).toMatchSnapshot();
  });
});
