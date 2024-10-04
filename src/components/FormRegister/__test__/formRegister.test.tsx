import "@testing-library/jest-dom";
import { act, fireEvent, render, waitFor } from "@testing-library/react";
import FormRegister from "..";
import { checkEmailExists } from "@app/utils";

jest.mock("@app/utils", () => ({
  ...jest.requireActual("@app/utils"),
  checkEmailExists: jest.fn(),
}));

const mockSubmit = jest.fn();

describe("FormRegister Component", () => {
  beforeEach(() => {
    mockSubmit.mockClear();
  });

  it("Should render correctly snapshot", () => {
    expect(
      render(<FormRegister itemUpdate={{}} onSubmit={mockSubmit} />)
    ).toMatchSnapshot();
  });

  it("Should renders the form with all fields", () => {
    const { getByLabelText, getByText } = render(
      <FormRegister itemUpdate={{}} onSubmit={mockSubmit} />
    );

    expect(getByLabelText(/Name/i)).toBeInTheDocument();
    expect(getByLabelText(/Email/i)).toBeInTheDocument();
    expect(getByLabelText("Password")).toBeInTheDocument();
    expect(getByLabelText("Confirm Password")).toBeInTheDocument();
    expect(getByText(/Register/i)).toBeInTheDocument();
  });

  it("Should display validation error when data is empty", async () => {
    jest.mock("react-hook-form", () => ({
      ...jest.requireActual("react-hook-form"),
      Controller: () => <></>,
      useForm: () => ({
        control: () => ({}),
        handleSubmit: () => jest.fn(),
        formState: {
          errors: {
            username: {
              type: "required",
              message: "Email is required",
            },
            email: {
              type: "required",
              message: "Email is required",
            },
            password: {
              type: "required",
              message: "Password is required",
            },
            confirmPassword: {
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
    const { getByLabelText, getAllByText } = render(
      <FormRegister itemUpdate={{}} onSubmit={mockSubmit} />
    );

    fireEvent.change(getByLabelText(/Name/i), {
      target: { value: "" },
    });
    fireEvent.blur(getByLabelText(/Name/i));

    fireEvent.change(getByLabelText(/Email/i), {
      target: { value: "" },
    });
    fireEvent.blur(getByLabelText(/Email/i));

    fireEvent.change(getByLabelText("Password"), {
      target: { value: "" },
    });
    fireEvent.blur(getByLabelText("Password"));

    fireEvent.change(getByLabelText("Confirm Password"), {
      target: { value: "" },
    });
    fireEvent.blur(getByLabelText("Confirm Password"));

    await waitFor(() => {
      expect(getAllByText("This field is required.")[0]).toBeInTheDocument();
    });
  });

  it("Should shows password mismatch error if confirmPassword does not match password", async () => {
    const { getByLabelText, getByText } = render(
      <FormRegister itemUpdate={{}} onSubmit={mockSubmit} />
    );

    fireEvent.change(getByLabelText(/Name/i), {
      target: { value: "John Doe" },
    });
    fireEvent.change(getByLabelText(/Email/i), {
      target: { value: "john@example.com" },
    });
    fireEvent.change(getByLabelText("Password"), {
      target: { value: "Password123" },
    });
    fireEvent.change(getByLabelText("Confirm Password"), {
      target: { value: "Password123" },
    });
    fireEvent.click(getByText(/Register/i));

    await waitFor(() => {
      expect(
        getByText(
          /Password must have minimum 8 characters and at least one uppercase letters, lowercase letters, numbers, and symbols/i
        )
      ).toBeInTheDocument();
    });
  });

  it("Should calls onSubmit when form is filled correctly", async () => {
    (checkEmailExists as jest.Mock).mockResolvedValue(false);
    const { getByLabelText, getByText } = render(
      <FormRegister itemUpdate={{}} onSubmit={mockSubmit} />
    );

    fireEvent.change(getByLabelText(/Name/i), {
      target: { value: "John Doe" },
    });
    fireEvent.change(getByLabelText(/Email/i), {
      target: { value: "john.doe@gmail.com" }, // Change email to a valid one
    });
    fireEvent.change(getByLabelText("Password"), {
      target: { value: "Abc123___" },
    });
    fireEvent.change(getByLabelText("Confirm Password"), {
      target: { value: "Abc123___" },
    });

    fireEvent.click(getByText(/Register/i));
  });
});
