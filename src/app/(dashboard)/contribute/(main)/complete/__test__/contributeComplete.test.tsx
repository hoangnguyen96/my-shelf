import { render } from "@testing-library/react";
import ContributeCompletePage from "../page";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("Contribute Complete Page", () => {
  it("Should render correctly snapshot", () => {
    expect(render(<ContributeCompletePage />)).toMatchSnapshot();
  });
});
