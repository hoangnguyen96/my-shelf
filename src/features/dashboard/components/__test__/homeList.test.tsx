import { fireEvent, render } from "@testing-library/react";
import { ListCart } from "../home-list";
import { DATA_BOOKS, DATA_USER } from "@app/mocks/data";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("../../actions", () => ({
  updateUserById: jest.fn(),
}));

describe("Home List", () => {
  const props = {
    user: DATA_USER[0],
    list: DATA_BOOKS,
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Should render correctly snapshot", () => {
    const { container } = render(<ListCart {...props} />);

    expect(container).toMatchSnapshot();
  });

  it("Should handle update favorite cart", () => {
    const { getAllByTestId } = render(<ListCart {...props} />);

    const buttons = getAllByTestId("update-favorite-cart");

    fireEvent.click(buttons[0]);
  });

  it("Should handle update favorite cart when data user no favorite", () => {
    const { getAllByTestId } = render(
      <ListCart {...props} user={DATA_USER[1]} />
    );

    const buttons = getAllByTestId("update-favorite-cart");

    fireEvent.click(buttons[2]);
  });
});
