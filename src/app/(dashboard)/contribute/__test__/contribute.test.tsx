import { render } from "@testing-library/react";
import ContributePage from "../page";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("Contribute Page", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Should render correctly snapshot", () => {
    expect(render(<ContributePage />)).toMatchSnapshot();
  });
});
