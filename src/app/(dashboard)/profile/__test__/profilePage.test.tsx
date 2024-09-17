import { act, fireEvent, render } from "@testing-library/react";
import { useSession } from "next-auth/react";
import { getUserById } from "@app/api-request";
import { DATA_USER } from "@app/mocks/data";
import ProfilePage from "../page";

jest.mock("next-auth/react", () => ({
  useSession: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@app/api-request", () => ({
  getUserById: jest.fn(),
}));

jest.mock("@app/actions/auth", () => ({
  logout: jest.fn(),
}));

describe("Profile Page", () => {
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
    jest.clearAllMocks();
    (getUserById as jest.Mock).mockReturnValue({
      dataUserById: DATA_USER[0],
    });
  });

  it("Should render correctly snapshot", async () => {
    (useSession as jest.Mock).mockReturnValue({
      data: {
        user: {
          isAdmin: true,
          email: "admin@gmail.com",
          id: "3733403",
          name: "admin",
          image: "",
        },
        expires: "2024-12-31T23:59:59.999Z",
      },
      status: "authenticated",
    });

    await act(async () => {
      const { container } = render(<ProfilePage />);
      expect(container).toMatchSnapshot();
    });
  });

  it("Should handle getUserById error", async () => {
    (getUserById as jest.Mock).mockRejectedValue(
      new Error("Failed to fetch books")
    );
    await act(async () => {
      const { container } = render(<ProfilePage />);
      expect(container).toMatchSnapshot();
    });
  });

  // TODO: Will update later
  // it("should handle update user", async () => {
  //   (getUserById as jest.Mock).mockResolvedValue({
  //     dataUserById: DATA_USER[0],
  //   });
  //   const { container, getByRole, getByPlaceholderText, getByTestId } = render(
  //     <ProfilePage />
  //   );

  //   await act(async () => {

  //     // Click the 'Edit' button to make the form editable
  //     const editButton = getByTestId("click-un-read-only");
  //     fireEvent.click(editButton);

  //     // Fill out the form with new data
  //     fireEvent.change(getByPlaceholderText("Full name"), {
  //       target: { value: "Jane Doe" },
  //     });
  //     fireEvent.change(getByPlaceholderText("Email..."), {
  //       target: { value: "jane.doe@example.com" },
  //     });
  //     fireEvent.change(getByPlaceholderText("Phone"), {
  //       target: { value: "0987654321" },
  //     });
  //     fireEvent.change(getByPlaceholderText("Reason For Your Contribution"), {
  //       target: { value: "Junior Developer" },
  //     });

  //     // Click the submit button to submit the form
  //     const submitButton = getByRole("button", { name: /update profile/i });
  //     fireEvent.click(submitButton);

  //     expect(submitButton).toBeDisabled();
  //   });
  // });
});
