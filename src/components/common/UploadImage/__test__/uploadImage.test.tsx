import "@testing-library/jest-dom";
import { fireEvent, render, waitFor } from "@testing-library/react";
import { UploadImage } from "../..";
import { User } from "@app/models";
import * as api from "@app/api";

// Mock toàn bộ module
jest.mock("@app/api", () => ({
  generateImageUpload: jest.fn(), // Mock các hàm
  updateUserById: jest.fn(),
}));

describe("UploadImage", () => {
  const mockUser: User = {
    id: "123",
    avatar: "https://i.ibb.co/88X1WfZ/avatar-default.png",
    userId: "",
    username: "",
    email: "",
    password: "",
    isAdmin: false,
    phone: "",
    bio: "",
    favorites: [],
    shelfBooks: [],
  };

  beforeEach(() => {
    // Mock lại giá trị trả về trong mỗi test
    (api.generateImageUpload as jest.Mock).mockResolvedValue({
      success: true,
      data: {
        url: "https://i.ibb.co/RHMqQGr/man-1.png",
      },
    });

    (api.updateUserById as jest.Mock).mockResolvedValue({
      success: true,
    });
  });

  it("Should render correctly snapshot", () => {
    expect(
      render(<UploadImage image={mockUser.avatar} user={mockUser} />)
    ).toMatchSnapshot();
  });

  it("should open file input when clicking upload button", () => {
    const { getByTestId, getByText } = render(
      <UploadImage image={mockUser.avatar} user={mockUser} />
    );

    const fileInput = getByTestId("fileInput");
    const uploadButton = getByText(/Upload New photo/i);
    const spyClick = jest.spyOn(fileInput, "click");

    fireEvent.click(uploadButton);

    expect(spyClick).toHaveBeenCalled();
  });
});
