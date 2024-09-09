import "@testing-library/jest-dom";
import { act, fireEvent, render, waitFor } from "@testing-library/react";
import { User } from "@app/models";
import FormLogin from "..";

describe("FormLogin", () => {
  const mockOnSubmit = jest.fn((data: Partial<User>) => Promise.resolve());

  it("Should render correctly snapshot", () => {
    expect(render(<FormLogin onSubmit={mockOnSubmit} />)).toMatchSnapshot();
  });

  it("Should display validation error when email is empty", async () => {
    const { getByTestId, getByText, getByPlaceholderText } = render(
      <FormLogin onSubmit={mockOnSubmit} />
    );

    fireEvent.change(getByPlaceholderText(/email.../i), {
      target: { value: "" },
    });

    fireEvent.change(getByPlaceholderText(/password.../i), {
      target: { value: "" },
    });

    act(() => {
      fireEvent.click(getByTestId("submit-login"));
    });
  });

  it("Should call onSubmit with correct data when form is valid", async () => {
    const { getByTestId, getByPlaceholderText } = render(
      <FormLogin onSubmit={mockOnSubmit} />
    );

    fireEvent.change(getByPlaceholderText(/email.../i), {
      target: { value: "admin@gmail.com" },
    });
    fireEvent.change(getByPlaceholderText(/password.../i), {
      target: { value: "Abc123___" },
    });

    act(() => {
      fireEvent.click(getByTestId("submit-login"));
    });

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        email: "admin@gmail.com",
        password: "Abc123___",
      });
    });
  });

  it("Should display error message when login fails", async () => {
    const { getByTestId, getByPlaceholderText, getByText } = render(
      <FormLogin onSubmit={mockOnSubmit} />
    );

    fireEvent.change(getByPlaceholderText(/email.../i), {
      target: { value: "test@gmail.com" },
    });
    fireEvent.change(getByPlaceholderText(/password.../i), {
      target: { value: "ValidPass123)" },
    });

    act(() => {
      fireEvent.click(getByTestId("submit-login"));
    });
  });
});
