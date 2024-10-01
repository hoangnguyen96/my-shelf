import { render, waitFor } from "@testing-library/react";
import { getBookById, getUserById } from "@app/features/dashboard/actions";
import { DATA_BOOKS, DATA_USER } from "@app/mocks/data";
import PreviewBook from "../page";
import { auth } from "@app/auth";
import { notFound } from "next/navigation";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  notFound: jest.fn(),
}));

jest.mock("@app/auth", () => ({
  auth: jest.fn(),
}));

jest.mock("@app/features/dashboard/actions", () => ({
  getBookById: jest.fn(),
  getUserById: jest.fn(),
}));

describe("Preview book Page", () => {
  const mockSession = {
    user: {
      isAdmin: true,
      email: "admin@gmail.com",
      id: "3733403",
      name: "admin",
      image: "https://i.ibb.co/RHMqQGr/man-1.png",
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (auth as jest.Mock).mockResolvedValue(mockSession);
    (getBookById as jest.Mock).mockReturnValue({
      data: DATA_BOOKS[0],
    });
    (getUserById as jest.Mock).mockReturnValue({
      user: DATA_USER[0],
    });
  });

  it("Should render correctly snapshot", async () => {
    const params = { id: "1" };
    const { container } = render(await PreviewBook({ params }));

    await waitFor(() => {
      expect(container).toMatchSnapshot();
    });
  });

  it("Should call notFound when book is not found", async () => {
    (getBookById as jest.Mock).mockResolvedValue(null);
    const params = { id: "" };

    render(await PreviewBook({ params }));

    await waitFor(() => {
      expect(notFound).toHaveBeenCalled();
    });
  });
});
