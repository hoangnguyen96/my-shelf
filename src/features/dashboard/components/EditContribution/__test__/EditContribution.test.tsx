import { render } from "@testing-library/react";
import { DATA_BOOKS } from "@app/mocks/data";
import { EditContribution } from "..";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("Edit Contribution", () => {
  it("Should render correctly snapshot", () => {
    const { container } = render(<EditContribution book={DATA_BOOKS[0]} />);

    expect(container).toMatchSnapshot();
  });
});
