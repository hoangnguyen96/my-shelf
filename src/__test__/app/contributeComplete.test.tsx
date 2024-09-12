import ContributeCompletePage from "@app/app/(dashboard)/contribute/(main)/complete/page";
import { render } from "@testing-library/react";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("Contribute Complete Page", () => {
  it("Should render correctly snapshot", () => {
    expect(render(<ContributeCompletePage />)).toMatchSnapshot();
  });
});
