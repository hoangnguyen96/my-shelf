import { fireEvent, render, waitFor } from "@testing-library/react";
import { useSession } from "next-auth/react";
import SearchBarBase from "../search";
import { useRouter } from "next/navigation";

jest.mock("next-auth/react", () => ({
  useSession: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
}));

describe("SearchBar", () => {
  (useSession as jest.Mock).mockReturnValue({
    data: { user: { isAdmin: false } },
    status: "authenticated",
  });

  it("Should render correctly snapshot", () => {
    expect(render(<SearchBarBase />)).toMatchSnapshot();
  });

  it("Should updates search term correctly", () => {
    const { getByPlaceholderText } = render(<SearchBarBase />);
    const inputElement = getByPlaceholderText("Search...");

    fireEvent.change(inputElement, {
      target: { value: "New search term" },
    });

    expect(inputElement).toHaveValue("New search term");
  });

  it("Should updates search type correctly", () => {
    const { getByRole } = render(<SearchBarBase />);

    fireEvent.change(getByRole("combobox"), {
      target: { value: "author" },
    });

    expect(getByRole("combobox")).toHaveValue("author");
  });

  it("Should handle on submit search", () => {
    const mockReplace = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ replace: mockReplace });
    const { getByPlaceholderText, getByRole, getByTestId } = render(
      <SearchBarBase />
    );
    const inputElement = getByPlaceholderText("Search...");
    const combobox = getByRole("combobox");
    const searchButton = getByTestId("submit-search");

    fireEvent.change(inputElement, {
      target: { value: "Book" },
    });
    fireEvent.change(combobox, {
      target: { value: "title" },
    });

    fireEvent.click(searchButton);
  });
});
