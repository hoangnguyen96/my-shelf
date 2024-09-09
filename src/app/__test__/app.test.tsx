import { render } from "@testing-library/react";
import Main from "../page";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("App", () => {
  it("Should render correctly snapshot", () => {
    expect(render(<Main />)).toMatchSnapshot();
  });
});
