import { fireEvent, render } from "@testing-library/react";
import { DATA_BOOKS, DATA_USER } from "@app/mocks/data";
import { HomeList } from "..";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("../../../actions", () => ({
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
    const { container } = render(<HomeList {...props} />);

    expect(container).toMatchSnapshot();
  });

  it("Should handle update favorite cart", () => {
    const { getAllByTestId } = render(<HomeList {...props} />);

    const buttons = getAllByTestId("update-favorite-cart");

    fireEvent.click(buttons[0]);
  });

  it("Should handle update favorite cart when data user no favorite", () => {
    const { getAllByTestId } = render(
      <HomeList {...props} user={DATA_USER[1]} />
    );

    const buttons = getAllByTestId("update-favorite-cart");

    fireEvent.click(buttons[2]);
  });
});
