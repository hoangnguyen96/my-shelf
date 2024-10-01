import { render } from "@testing-library/react";
import { DATA_BOOKS, DATA_USER } from "@app/mocks/data";
import ListContribute from "..";

describe("Contribute Three Top Book", () => {
  const props = {
    user: DATA_USER[0],
    list: DATA_BOOKS,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("Should render correctly snapshot", () => {
    const { container } = render(<ListContribute {...props} />);

    expect(container).toMatchSnapshot();
  });
});
