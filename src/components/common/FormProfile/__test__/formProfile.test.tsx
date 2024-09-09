import "@testing-library/jest-dom";
import { fireEvent, render, waitFor } from "@testing-library/react";
import FormProfile from "..";

describe("Button", () => {
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

  it("should call onUpdate with updated data when form is submitted", async () => {
    const { getByRole, getByPlaceholderText, getByLabelText } = render(
      <FormProfile {...props} />
    );

    // Click the 'Edit' button to make the form editable
    const editButton = getByRole("button", { name: /Update Profile/i });
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
  });
});
