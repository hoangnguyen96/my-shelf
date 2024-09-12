import { render } from "@testing-library/react";
import ChakraUIProviders from "..";

describe("ChakraUIProviders", () => {
  it("Should render children with ChakraProvider and custom theme", () => {
    const childContent = <div>Test Content</div>;

    const { getByText } = render(
      <ChakraUIProviders>{childContent}</ChakraUIProviders>
    );

    expect(getByText("Test Content")).toBeInTheDocument();
  });
});
