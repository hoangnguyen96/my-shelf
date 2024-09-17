import { render } from "@testing-library/react";
import ContributeUpdate from "../page";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("Contribute Update", () => {
  it("Should render correctly snapshot", () => {
    expect(render(<ContributeUpdate params={{ id: "1" }} />)).toMatchSnapshot();
  });
});
