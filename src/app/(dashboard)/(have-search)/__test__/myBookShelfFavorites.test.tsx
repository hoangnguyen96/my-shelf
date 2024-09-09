import { render } from "@testing-library/react";
import MyBookShelfFavorites from "../my-book-shelf/(main)/favorites/page";
import { useSession } from "next-auth/react";

jest.mock("next-auth/react", () => ({
  useSession: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("My Book Shelf Favorites", () => {
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

  it("Should render correctly snapshot", () => {
    expect(render(<MyBookShelfFavorites />)).toMatchSnapshot();
  });
});
