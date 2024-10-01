import "@testing-library/jest-dom";
import { act, fireEvent, render, waitFor } from "@testing-library/react";
import FormContribute from "..";
import { generateImageUpload } from "@app/features/dashboard/actions";

// Mock Image component
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />,
}));

jest.mock("@app/features/dashboard/actions", () => ({
  generateImageUpload: jest.fn().mockResolvedValue({
    success: true,
    url: "https://example.com/image.jpg",
  }),
}));

describe("Form Contribute", () => {
  const mockOnUpdate = jest.fn();
  const mockOnSubmit = jest.fn();
  const props = {
    itemUpdate: {
      title: "Don't Make Me Think",
      author: "Steve Krug",
      category: "SelfHelpBook",
      imageUrl: "https://i.ibb.co/QbQgVtG/book1.png",
      description: "description will update later",
      status: false,
      publicationYear: 2000,
      rating: 4.5,
      createdDate: "3 Sep 2024 9:07 PM",
      edition: "first",
      id: "1",
    },
    onSubmit: mockOnSubmit,
    onUpdate: mockOnUpdate,
  };

  it("Should render correctly snapshot", () => {
    expect(render(<FormContribute {...props} />)).toMatchSnapshot();
  });

  it("should render the form correctly with initial data", () => {
    const { getByPlaceholderText, getByTestId } = render(
      <FormContribute {...props} />
    );

    expect(getByPlaceholderText("Book name")).toHaveValue(
      "Don't Make Me Think"
    );
    expect(getByPlaceholderText("Author Name")).toHaveValue("Steve Krug");
    expect(getByPlaceholderText("Reason For Your Contribution")).toHaveValue(
      "description will update later"
    );
    expect(getByTestId("contribute-category")).toHaveValue("SelfHelpBook");
  });

  it("should update form fields on input change", () => {
    const { getByPlaceholderText, getByTestId } = render(
      <FormContribute {...props} />
    );

    const titleInput = getByPlaceholderText("Book name");
    fireEvent.change(titleInput, { target: { value: "Updated Book Title" } });
    expect(titleInput).toHaveValue("Updated Book Title");

    const authorInput = getByPlaceholderText("Author Name");
    fireEvent.change(authorInput, { target: { value: "Updated Author" } });
    expect(authorInput).toHaveValue("Updated Author");
  });

  it("should handle file input changes", async () => {
    (generateImageUpload as jest.Mock).mockResolvedValueOnce({
      success: true,
      data: {
        url: "http://mocked-image-url.com",
      },
    });

    const { getByTestId, getByAltText } = render(<FormContribute {...props} />);

    const mockURL = "https://i.ibb.co/QbQgVtG/book1.png";
    URL.createObjectURL = jest.fn(() => mockURL);

    const file = new File(["image"], "image.png", { type: "image/png" });

    // Trigger file input change event
    const input = getByTestId("input-file-contribute");
    fireEvent.change(input, { target: { files: [file] } });

    await waitFor(() => {
      expect(getByAltText("Upload Image")).toHaveAttribute("src", mockURL);
    });
  });

  // TODO: Will update later
  it("Should handle update book successful", async () => {
    const { getByPlaceholderText, getByTestId, getByText } = render(
      <FormContribute {...props} />
    );

    await act(() => {
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

      // const mockURL = "https://i.ibb.co/QbQgVtG/book1.png";
      // URL.createObjectURL = jest.fn(() => mockURL);
      // const input = getByTestId("input-file-contribute");
      // fireEvent.change(input, {
      //   target: {
      //     files: [new File(["image"], "image.png", { type: "image/png" })],
      //   },
      // });
      // (generateImageUpload as jest.Mock).mockResolvedValueOnce({
      //   success: true,
      //   data: {
      //     url: "http://mocked-image-url.com",
      //   },
      // });

      // // const { getByTestId, getByAltText } = render(
      // //   <FormContribute {...props} />
      // // );

      // const mockURL = "https://i.ibb.co/QbQgVtG/book5.png";
      // URL.createObjectURL = jest.fn(() => mockURL);

      // const file = new File(["image"], "image.png", { type: "image/png" });

      // // Trigger file input change event
      // const input = getByTestId("input-file-contribute");
      // fireEvent.change(input, { target: { files: [file] } });
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

  it("Should handle add book successful", async () => {
    const { getByPlaceholderText, getByTestId, getByRole } = render(
      <FormContribute />
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
      (generateImageUpload as jest.Mock).mockResolvedValueOnce({
        success: true,
        data: {
          url: "http://mocked-image-url.com",
        },
      });
      // const mockURL = "https://i.ibb.co/QbQgVtG/book1.png";
      // URL.createObjectURL = jest.fn(() => mockURL);
      // const input = getByTestId("input-file-contribute");
      // fireEvent.change(input, {
      //   target: {
      //     files: [new File(["image"], "image.png", { type: "image/png" })],
      //   },
      // });
    });

    fireEvent.click(getByTestId("submit-contribute"));
    // await act(async () => {
    // });
  });

  it("Should handle add book failed", async () => {
    const { getByPlaceholderText, getByTestId, getByRole } = render(
      <FormContribute />
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
      (generateImageUpload as jest.Mock).mockResolvedValueOnce({
        success: true,
        data: {
          url: "http://mocked-image-url.com",
        },
      });
      // const mockURL = "https://i.ibb.co/QbQgVtG/book1.png";
      // URL.createObjectURL = jest.fn(() => mockURL);
      // const input = getByTestId("input-file-contribute");
      // fireEvent.change(input, {
      //   target: {
      //     files: [new File(["image"], "image.png", { type: "image/png" })],
      //   },
      // });
    });

    fireEvent.click(getByTestId("submit-contribute"));
    // await act(async () => {
    // });
  });
});
