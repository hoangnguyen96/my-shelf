import { render } from "@testing-library/react";
import ContributePage from "../contribute/(main)/page";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("Contribute Page", () => {
  it("Should render correctly snapshot", () => {
    expect(render(<ContributePage />)).toMatchSnapshot();
  });
});
