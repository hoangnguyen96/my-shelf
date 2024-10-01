import "@testing-library/jest-dom";
import { fireEvent, render, waitFor } from "@testing-library/react";
import FormProfile from "..";

describe("Form Profile", () => {
  const mockOnUpdate = jest.fn();
  const props = {
    user: {
      username: "admin",
      email: "admin@gmail.com",
      password: "$2a$10$MwSZ9vWSX7DVJwJ4SF5Mzuj2zMFjY52XM9L11gGG0j79gybowaLfq",
      isAdmin: true,
      phone: "",
      bio: "",
      avatar: "https://i.ibb.co/RHMqQGr/man-1.png",
      favorites: ["3", "2", "1", "13", "4", "5", "6"],
      shelfBooks: ["1", "6"],
      userId: "3733403",
      id: "1",
    },
    onUpdate: mockOnUpdate,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Should render correctly snapshot", () => {
    expect(render(<FormProfile {...props} />)).toMatchSnapshot();
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
            phone: {
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
    const { getByPlaceholderText, getAllByText, getByTestId } = render(
      <FormProfile {...props} />
    );

    const editButton = getByTestId("click-un-read-only");
    fireEvent.click(editButton);

    fireEvent.change(getByPlaceholderText("Full name"), {
      target: { value: "" },
    });
    fireEvent.blur(getByPlaceholderText("Full name"));

    fireEvent.change(getByPlaceholderText("Email..."), {
      target: { value: "" },
    });
    fireEvent.blur(getByPlaceholderText("Email..."));

    fireEvent.change(getByPlaceholderText("Phone"), {
      target: { value: "" },
    });
    fireEvent.blur(getByPlaceholderText("Phone"));

    await waitFor(() => {
      expect(getAllByText("This field is required.")[0]).toBeInTheDocument();
    });
  });

  it("should call onUpdate with updated data when form is submitted", async () => {
    const { getByRole, getByPlaceholderText, getByTestId } = render(
      <FormProfile {...props} />
    );

    // Click the 'Edit' button to make the form editable
    const editButton = getByTestId("click-un-read-only");
    fireEvent.click(editButton);

    // Fill out the form with new data
    fireEvent.change(getByPlaceholderText("Full name"), {
      target: { value: "Jane Doe" },
    });
    fireEvent.change(getByPlaceholderText("Email..."), {
      target: { value: "jane.doe@example.com" },
    });
    fireEvent.change(getByPlaceholderText("Phone"), {
      target: { value: "0987654321" },
    });
    fireEvent.change(getByPlaceholderText("Reason For Your Contribution"), {
      target: { value: "Junior Developer" },
    });

    // Click the submit button to submit the form
    const submitButton = getByRole("button", { name: /update profile/i });
    fireEvent.click(submitButton);
    await new Promise((resolve) => setTimeout(resolve, 0));

    // Check that onUpdate was called with the expected data
    expect(mockOnUpdate).toHaveBeenCalledWith(props.user.id, {
      username: "Jane Doe",
      email: "jane.doe@example.com",
      phone: "0987654321",
      userId: "3733403",
      bio: "Junior Developer",
    });
    expect(submitButton).toBeDisabled();
  });
});
