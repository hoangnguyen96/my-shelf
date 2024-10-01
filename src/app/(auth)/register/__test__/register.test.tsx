import { render } from "@testing-library/react";
import RegisterPage from "../page";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("RegisterPage", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Should render correctly snapshot", () => {
    expect(render(<RegisterPage />)).toMatchSnapshot();
  });
});
