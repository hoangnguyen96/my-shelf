import { fireEvent, render } from "@testing-library/react";

// Components
import ErrorBoundary from "..";

const mockProps = {
  error: new Error("Test Error"),
  reset: jest.fn(),
};

describe("ErrorBoundary Component", () => {
  it("Should render ErrorBoundary Component correctly", () => {
    const component = render(<ErrorBoundary {...mockProps} />);

    expect(component).toMatchSnapshot();
  });

  it("renders error message and calls reset function when  button is clicked", () => {
    const { getByText } = render(<ErrorBoundary {...mockProps} />);

    const tryAgainButton = getByText("Try again");
    fireEvent.click(tryAgainButton);

    expect(mockProps.reset).toHaveBeenCalled();
  });
});
