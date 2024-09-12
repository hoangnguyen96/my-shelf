import "@testing-library/jest-dom";
import { act, fireEvent, render, waitFor } from "@testing-library/react";
import FormRegister from "..";
import { User } from "@app/models";

describe("FormRegister", () => {
  const mockOnSubmit = jest.fn((data: Partial<User>) => {});

  it("Should render correctly snapshot", () => {
    expect(render(<FormRegister onSubmit={mockOnSubmit} />)).toMatchSnapshot();
  });

  it("Should call onSubmit with correct data when form is valid", async () => {
    const { getByTestId, getByPlaceholderText, getByLabelText } = render(
      <FormRegister onSubmit={mockOnSubmit} />
    );

    fireEvent.change(getByPlaceholderText(/username.../i), {
      target: { value: "hung" },
    });
    fireEvent.change(getByPlaceholderText(/email.../i), {
      target: { value: "hung@gmail.com" },
    });
    fireEvent.change(getByLabelText("Password"), {
      target: { value: "Abc789()()" },
    });
    fireEvent.change(getByLabelText("Confirm Password"), {
      target: { value: "Abc789()()" },
    });

    act(() => {
      fireEvent.click(getByTestId("submit-register"));
    });

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        username: "hung",
        email: "hung@gmail.com",
        password: "Abc789()()",
        confirmPassword: "Abc789()()",
      });
    });
  });
});
