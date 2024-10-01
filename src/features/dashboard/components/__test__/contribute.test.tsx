import { act, fireEvent, render } from "@testing-library/react";
import { Contribute } from "../contribute";
import { generateImageUpload } from "../../actions";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("../../actions", () => ({
  generateImageUpload: jest.fn(),
}));

describe("Contribute", () => {
  it("Should render correctly snapshot", () => {
    const { container } = render(<Contribute />);

    expect(container).toMatchSnapshot();
  });

  it("Should handle update book successful", async () => {
    (generateImageUpload as jest.Mock).mockResolvedValueOnce({
      success: true,
      data: {
        url: "http://mocked-image-url.com",
      },
    });
    const { getByPlaceholderText, getByTestId, getByText } = render(
      <Contribute />
    );

    await act(async () => {
      fireEvent.change(getByPlaceholderText("Book name"), {
        target: { value: "Test Book" },
      });
      fireEvent.change(getByPlaceholderText("Author Name"), {
        target: { value: "Test Author" },
      });
      fireEvent.change(getByPlaceholderText("Reason For Your Contribution"), {
        target: { value: "Test Description" },
      });
      const categorySelect = getByTestId("contribute-category");

      fireEvent.change(categorySelect, { target: { value: "SelfHelpBook" } });

      const mockURL = "https://i.ibb.co/QbQgVtG/book1.png";
      URL.createObjectURL = jest.fn(() => mockURL);
      const input = getByTestId("input-file-contribute");
      fireEvent.change(input, {
        target: {
          files: [new File(["image"], "image.png", { type: "image/png" })],
        },
      });
    });

    fireEvent.click(getByTestId("submit-contribute"));

    // await waitFor(() => {
    //   expect(mockOnSubmit).toHaveBeenCalledWith({
    //     title: "Test Book",
    //     author: "Test Author",
    //     category: "SelfHelpBook",
    //     imageUrl: "https://i.ibb.co/QbQgVtG/book1.png",
    //     description: "Test Description",
    //   });
    // });
  });
});
