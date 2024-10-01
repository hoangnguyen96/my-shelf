import "@testing-library/jest-dom";
import { act, fireEvent, render, waitFor } from "@testing-library/react";
import FormLogin from "..";
import { MESSAGES } from "@app/constants";

describe("FormLogin", () => {
  const mockOnSubmit = jest.fn();

  it("Should render correctly snapshot", () => {
    expect(render(<FormLogin onSubmit={mockOnSubmit} />)).toMatchSnapshot();
  });

  it("Should display validation error when email is empty", async () => {
    jest.mock("react-hook-form", () => ({
      ...jest.requireActual("react-hook-form"),
      Controller: () => <></>,
      useForm: () => ({
        control: () => ({}),
        handleSubmit: () => jest.fn(),
        formState: {
          errors: {
            email: {
              type: "required",
              message: "Email is required",
            },
            password: {
              type: "required",
              message: "Password is required",
            },
          },
          isValid: false,
          dirtyFields: {},
          isSubmitting: false,
        },
        clearErrors: jest.fn(),
        reset: jest.fn(),
      }),
    }));
    const { getByPlaceholderText, getAllByText } = render(
      <FormLogin onSubmit={mockOnSubmit} />
    );

    fireEvent.change(getByPlaceholderText(/email.../i), {
      target: { value: "" },
    });
    fireEvent.blur(getByPlaceholderText(/email.../i));

    fireEvent.change(getByPlaceholderText(/password.../i), {
      target: { value: "" },
    });
    fireEvent.blur(getByPlaceholderText(/password.../i));

    await waitFor(() => {
      expect(getAllByText("This field is required.")[0]).toBeInTheDocument();
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
});
