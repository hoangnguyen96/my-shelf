import { fireEvent, render } from "@testing-library/react";
import { ContributeComplete } from "../contribute-complete";
import { useRouter } from "next/navigation";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("ContributeComplete", () => {
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
    const { container } = render(<ContributeComplete />);

    expect(container).toMatchSnapshot();
  });

  it("Should handle click back", () => {
    const { getByTestId } = render(<ContributeComplete />);
    const link = getByTestId("click-back");

    fireEvent.click(link);
  });
});
