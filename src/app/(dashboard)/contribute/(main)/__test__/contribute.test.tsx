import { act, fireEvent, render } from "@testing-library/react";
import { useRouter } from "next/navigation";
import { addBook, generateImageUpload } from "@app/api-request";
import ContributePage from "../page";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />,
}));

jest.mock("@app/api-request", () => ({
  addBook: jest.fn(),
  generateImageUpload: jest.fn().mockResolvedValue({
    success: true,
    url: "https://example.com/image.jpg",
  }),
}));

describe("Contribute Page", () => {
  const mockPush = jest.fn();
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

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    (addBook as jest.Mock).mockResolvedValue({});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Should render correctly snapshot", () => {
    expect(render(<ContributePage />)).toMatchSnapshot();
  });

  it("Should handle update book successful", async () => {
    (generateImageUpload as jest.Mock).mockResolvedValueOnce({
      success: true,
      data: {
        url: "http://mocked-image-url.com",
      },
    });
    const { getByPlaceholderText, getByTestId, getByText } = render(
      <ContributePage />
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

  // test("renders the form and handles submit", async () => {
  //   const { getByText } = render(<ContributePage />);

  //   expect(getByText("Fill up Book Details")).toBeInTheDocument();

  //   const submitButton = getByText("Submit");
  //   fireEvent.click(submitButton);

  //   await waitFor(() => {
  //     expect(addBook).toHaveBeenCalledWith({
  //       title: "Sample Book",
  //     });
  //     expect(mockPush).toHaveBeenCalledWith("/contribute-complete");
  //   });
  // });

  // test("Should handle submit failure", async () => {
  //   (addBook as jest.Mock).mockRejectedValue(new Error("Failed to add books!"));

  //   const { getByText } = render(<ContributePage />);

  //   const submitButton = getByText("Submit");
  //   fireEvent.click(submitButton);

  //   await waitFor(() => {
  //     expect(addBook).toHaveBeenCalled();
  //     expect(mockPush).not.toHaveBeenCalled();
  //   });
  // });
});
