import { fireEvent, render, waitFor } from "@testing-library/react";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import SearchBar from "..";
import { ROUTES } from "@app/constants";
import React from 'react';

jest.mock("next-auth/react", () => ({
  useSession: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
}));


describe("SearchBar", () => {
  (useSession as jest.Mock).mockReturnValue({
    data: {
      user: {
        isAdmin: true,
        email: "admin@gmail.com",
        id: "3733403",
        name: "admin",
        image: "https://i.ibb.co/RHMqQGr/man-1.png",
      },
      expires: "2024-12-31T23:59:59.999Z",
    },
    status: "authenticated",
  });

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      replace: jest.fn(),
    });
    (usePathname as jest.Mock).mockReturnValue(ROUTES.MY_BOOK_SHELF_FAVORITES);
  });

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

  it("Should updates search term not value", () => {
    const { getByPlaceholderText, getByRole } = render(<SearchBar />);

    const inputElement = getByPlaceholderText("Search...");
    const combobox = getByRole("combobox");
    fireEvent.change(inputElement, {
      target: { value: "" },
    });
    fireEvent.change(combobox, {
      target: { value: "" },
    });
    expect(inputElement).toHaveValue("");
  });

  it("Should updates search type correctly", () => {
    const { getByRole } = render(<SearchBar />);

    fireEvent.change(getByRole("combobox"), {
      target: { value: "author" },
    });

    expect(getByRole("combobox")).toHaveValue("author");
  });

  it("Should handle on submit search", () => {
    const mockReplace = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ replace: mockReplace });
    const { getByPlaceholderText, getByRole, getByTestId } = render(
      <SearchBar />
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

  it("Should handle on submit search when empty", () => {
    const mockReplace = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ replace: mockReplace });
    const { getByPlaceholderText, getByRole, getByTestId } = render(
      <SearchBar />
    );
    const inputElement = getByPlaceholderText("Search...");
    const combobox = getByRole("combobox");
    const searchButton = getByTestId("submit-search");

    fireEvent.change(inputElement, {
      target: { value: "" },
    });
    fireEvent.change(combobox, {
      target: { value: "" },
    });

    fireEvent.click(searchButton);
  });

  it("Should handle on submit search when empty", () => {
    (usePathname as jest.Mock).mockReturnValue("");
    const mockReplace = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ replace: mockReplace });
    const { getByPlaceholderText, getByRole, getByTestId } = render(
      <SearchBar />
    );
    const inputElement = getByPlaceholderText("Search...");
    const combobox = getByRole("combobox");
    const searchButton = getByTestId("submit-search");

    fireEvent.change(inputElement, {
      target: { value: "" },
    });
    fireEvent.change(combobox, {
      target: { value: "" },
    });

    fireEvent.click(searchButton);
  });

  it("Should handle on submit search when empty", () => {
    (usePathname as jest.Mock).mockReturnValue("");
    const mockReplace = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ replace: mockReplace });
    const { getByPlaceholderText, getByRole, getByTestId } = render(
      <SearchBar />
    );
    const inputElement = getByPlaceholderText("Search...");
    const combobox = getByRole("combobox");
    const searchButton = getByTestId("submit-search");

    fireEvent.change(inputElement, {
      target: { value: "Book" },
    });
    fireEvent.change(combobox, {
      target: { value: "" },
    });

    fireEvent.click(searchButton);
  });
});
