import { auth } from "@app/auth";
import { act, render } from "@testing-library/react";
import { getAllBook, getUserById } from "@app/api-request";
import * as utils from "@app/utils";
import { DATA_BOOKS, DATA_USER } from "@app/__mocks__/data";
import ListContribute from "..";
import { useSession } from "next-auth/react";

jest.mock("next-auth/react", () => ({
  useSession: jest.fn(),
}));

jest.mock("@app/api-request", () => ({
  getAllBook: jest.fn(),
  getUserById: jest.fn(),
}));

jest.mock("@app/utils", () => ({
  ...jest.requireActual("@app/utils"),
  getThreeTopBook: jest.fn(),
}));

jest.mock("@app/actions/auth", () => ({
  logout: jest.fn(),
}));

describe("Contribute Three Top Book", () => {
  const mockThreeTopBook = DATA_BOOKS.sort((a, b) => {
    return (
      new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime()
    );
  }).slice(0, 3);

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
    (getUserById as jest.Mock).mockResolvedValue(DATA_USER[0]);

    (getAllBook as jest.Mock).mockResolvedValue(DATA_BOOKS);
    jest.spyOn(utils, "getThreeTopBook").mockReturnValue(mockThreeTopBook);
  });

  it("Should render correctly snapshot", async () => {
    await act(async () => {
      const { container } = render(<ListContribute />);
      expect(container).toMatchSnapshot();
    });
  });
});
