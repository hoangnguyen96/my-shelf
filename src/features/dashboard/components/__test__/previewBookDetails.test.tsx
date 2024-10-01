import { act, fireEvent, render } from "@testing-library/react";
import { PreviewBookDetails } from "../preview-book-details";
import { DATA_BOOKS, DATA_USER } from "@app/mocks/data";
import { useRouter } from "next/navigation";
import { useDisclosure } from "@chakra-ui/react";
import { updateBookById, updateUserById } from "../../actions";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@chakra-ui/react", () => ({
  ...jest.requireActual("@chakra-ui/react"),
  useDisclosure: jest.fn(),
}));

jest.mock("../../actions", () => ({
  updateBookById: jest.fn(),
  updateUserById: jest.fn(),
}));

describe("Preview Book", () => {
  const mockBooks = DATA_BOOKS.filter((item) =>
    DATA_USER[0].shelfBooks.includes(item.id)
  );
  const props = {
    user: DATA_USER[0],
    book: DATA_BOOKS[0],
  };
  const mockRouter = {
    back: jest.fn(),
    refresh: jest.fn(),
  };
  const onOpenMock = jest.fn();
  const onCloseMock = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    (useDisclosure as jest.Mock).mockReturnValue({
      isOpen: false,
      onOpen: onOpenMock,
      onClose: onCloseMock,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Should render correctly snapshot", () => {
    const { container } = render(<PreviewBookDetails {...props} />);

    expect(container).toMatchSnapshot();
  });

  it("Should handle click back", () => {
    const { getByTestId } = render(
      <PreviewBookDetails {...props} book={{ ...props.book, imageUrl: "" }} />
    );
    const link = getByTestId("click-back");

    fireEvent.click(link);
  });

  it("should close modal when onClose is called", async () => {
    // Set `isOpen` to true to simulate the modal being open
    (useDisclosure as jest.Mock).mockReturnValue({
      isOpen: true,
      onOpen: onOpenMock,
      onClose: onCloseMock,
    });

    const { getByTestId } = render(<PreviewBookDetails {...props} />);

    const close = getByTestId("close-modal");
    // Simulate closing the modal
    act(() => {
      fireEvent.click(close);
    });

    expect(mockRouter.refresh).toHaveBeenCalled();
  });

  it("Should disable the borrow button if the user already borrowed the book", () => {
    const { getByText } = render(<PreviewBookDetails {...props} />);

    const borrowButton = getByText("BORROW");
    expect(borrowButton).toBeDisabled();
  });

  it("Should handle borrow book", async () => {
    (updateBookById as jest.Mock).mockResolvedValue({
      data: { ...mockBooks[0] },
    });
    (updateUserById as jest.Mock).mockResolvedValue({
      data: DATA_USER[1],
    });
    (useDisclosure as jest.Mock).mockReturnValue({
      isOpen: true,
      onOpen: onOpenMock,
      onClose: onCloseMock,
    });

    const { getByText } = render(
      <PreviewBookDetails {...props} user={DATA_USER[2]} />
    );

    const borrowButton = getByText("BORROW");
    fireEvent.click(borrowButton);
    expect(updateBookById).toHaveBeenCalledWith(
      mockBooks[0].id,
      expect.any(Object)
    );
  });

  it("Should handle borrow book when user have id", async () => {
    (useDisclosure as jest.Mock).mockReturnValue({
      isOpen: true,
      onOpen: onOpenMock,
      onClose: onCloseMock,
    });

    const { getByText } = render(<PreviewBookDetails {...props} />);

    const borrowButton = getByText("BORROW");
    fireEvent.click(borrowButton);

    expect(getByText("BORROW")).toBeInTheDocument();
  });
});
