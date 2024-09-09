import { render } from "@testing-library/react";
import MyBookShelfByParams from "../my-book-shelf/(main)/[...slug]/page";
import { useSession } from "next-auth/react";

jest.mock("next-auth/react", () => ({
  useSession: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("My Book Shelf All Search", () => {
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
    expect(
      render(<MyBookShelfByParams params={{ slug: ["title", "on"] }} />)
    ).toMatchSnapshot();
  });
});
