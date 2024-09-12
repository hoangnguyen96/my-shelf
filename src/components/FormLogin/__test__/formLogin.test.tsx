import "@testing-library/jest-dom";
import { act, fireEvent, render, waitFor } from "@testing-library/react";
import { User } from "@app/models";
import FormLogin from "..";
import { MESSAGES } from "@app/constants";

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
    mockOnSubmit.mockRejectedValueOnce(new Error(MESSAGES.LOGIN_FAILED));

    const { getByTestId, getByPlaceholderText, getByText } = render(
      <FormLogin onSubmit={mockOnSubmit} />
    );

    await act(async () => {
      fireEvent.change(getByPlaceholderText(/email.../i), {
        target: { value: "test@gmail.com" },
      });
      fireEvent.change(getByPlaceholderText(/password.../i), {
        target: { value: "ValidPass123" },
      });

      fireEvent.click(getByTestId("submit-login"));
    });

    await waitFor(() => {
      expect(new Error(MESSAGES.LOGIN_FAILED)).toBeTruthy();
    });
  });

  it("Should toggle Remember Me checkbox correctly", async () => {
    const { getByRole } = render(<FormLogin onSubmit={mockOnSubmit} />);

    const checkbox = getByRole("checkbox");

    expect(checkbox).not.toBeChecked();

    fireEvent.click(checkbox);
    await waitFor(() => expect(checkbox).toBeChecked());

    fireEvent.click(checkbox);
    await waitFor(() => expect(checkbox).not.toBeChecked());
  });
});
