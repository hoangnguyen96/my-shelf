import { render } from "@testing-library/react";
import MyBookShelfFavorites from "../my-book-shelf/(main)/favorites/[...slug]/page";
import { useSession } from "next-auth/react";
import { getAllBook, getUserById } from "@app/api";
import { DATA_BOOKS, DATA_USER } from "@app/app/__mocks__/data";

jest.mock("@app/api", () => ({
  getUserById: jest.fn(),
  getAllBook: jest.fn(),
}));

jest.mock("next-auth/react", () => ({
  useSession: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("My Book Shelf Favorites Search", () => {
  (useSession as jest.Mock).mockReturnValue({
    data: {
      user: {
        isAdmin: true,
        email: "admin@gmail.com",
        id: "3733403",
        name: "admin",
        image: "https://i.ibb.co/RHMqQGr/man-1.png",
      },
    },
    status: "authenticated",
  });

  (getUserById as jest.Mock).mockResolvedValue(DATA_USER[0]);
  (getAllBook as jest.Mock).mockResolvedValue(DATA_BOOKS);

  it("Should render correctly snapshot", () => {
    expect(
      render(<MyBookShelfFavorites params={{ slug: ["title", "on"] }} />)
    ).toMatchSnapshot();
  });
});
