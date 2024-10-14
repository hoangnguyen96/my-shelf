import { fireEvent, render } from "@testing-library/react";
import { DATA_BOOKS, DATA_USER } from "@app/mocks/data";
import { SearchList } from "..";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("../../../actions", () => ({
  updateUserById: jest.fn(),
}));

describe("Search List", () => {
  const props = {
    user: DATA_USER[0],
    totalPages: 2,
    list: [DATA_BOOKS],
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Should render correctly snapshot", () => {
    const { container } = render(<SearchList {...props} />);

    expect(container).toMatchSnapshot();
  });

  it("Should handle update favorite cart", () => {
    const { getAllByTestId } = render(<SearchList {...props} />);

    const buttons = getAllByTestId("handle-favorite");

    fireEvent.click(buttons[0]);
  });

  it("Should handle update favorite cart when data user no favorite", () => {
    const { getAllByTestId } = render(
      <SearchList {...props} user={DATA_USER[1]} />
    );

    const buttons = getAllByTestId("handle-favorite");

    fireEvent.click(buttons[2]);
  });
});
