import "@testing-library/jest-dom";
import { fireEvent, render } from "@testing-library/react";
import SearchBar from "..";
import { useRouter } from "next/navigation";

// Mock useRouter
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("SearchBar", () => {
  it("Should render correctly snapshot", () => {
    expect(render(<SearchBar placeholder="search" />)).toMatchSnapshot();
  });

  it("Should updates search term correctly", () => {
    const { getByPlaceholderText } = render(<SearchBar />);
    const inputElement = getByPlaceholderText("Search...");

    fireEvent.change(inputElement, {
      target: { value: "New search term" },
    });

    expect(inputElement).toHaveValue("New search term");
  });

  it("Should updates search type correctly", () => {
    const { getByRole } = render(<SearchBar />);

    fireEvent.change(getByRole("combobox"), {
      target: { value: "author" },
    });

    expect(getByRole("combobox")).toHaveValue("author");
  });

  it("calls router.push with correct query parameters on search", () => {
    const mockPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });

    const { getByPlaceholderText, getByRole } = render(<SearchBar />);
    const inputElement = getByPlaceholderText("Search...");
    const combobox = getByRole("combobox");

    fireEvent.change(inputElement, {
      target: { value: "Book" },
    });
    fireEvent.change(combobox, {
      target: { value: "title" },
    });

    fireEvent.click(getByRole("button", { name: /search/i }));

    expect(mockPush).toHaveBeenCalledWith("?type=title&query=Book");
  });
});
