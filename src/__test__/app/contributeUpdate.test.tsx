import ContributeUpdate from "@app/app/(dashboard)/contribute/(main)/[id]/page";
import { render } from "@testing-library/react";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("Contribute Update", () => {
  it("Should render correctly snapshot", () => {
    expect(render(<ContributeUpdate params={{ id: "1" }} />)).toMatchSnapshot();
  });
});
