import { render } from "@testing-library/react";
import { ContributeUpdate } from "../contribute-update";
import { DATA_BOOKS } from "@app/mocks/data";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("Contribute Update", () => {
  it("Should render correctly snapshot", () => {
    const { container } = render(<ContributeUpdate book={DATA_BOOKS[0]} />);

    expect(container).toMatchSnapshot();
  });
});
