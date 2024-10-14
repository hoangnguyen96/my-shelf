import { fireEvent, render } from "@testing-library/react";
import { DATA_BOOKS, DATA_USER } from "@app/mocks/data";
import { useRouter } from "next/navigation";
import { ContributeList } from "..";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("Contribute List", () => {
  const props = {
    user: DATA_USER[0],
    list: DATA_BOOKS,
  };
  const mockBack = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      back: mockBack,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Should render correctly snapshot", () => {
    const { container } = render(<ContributeList {...props} />);

    expect(container).toMatchSnapshot();
  });

  it("Should handle click back", () => {
    const { getByTestId } = render(<ContributeList {...props} />);
    const link = getByTestId("click-back");

    fireEvent.click(link);
  });
});
