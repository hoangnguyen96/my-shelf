import { auth } from "@app/auth";
import { render } from "@testing-library/react";
import { getAllBook, getUserById } from "@app/api";
import { DATA_BOOKS, DATA_USER } from "@app/app/__mocks__/data";
import List from "../contribute/@list/page";
import { useEffect, useState } from "react";

jest.mock("@app/api", () => ({
  getAllBook: jest.fn(),
  getUserById: jest.fn(),
}));

jest.mock("@app/auth", () => ({
  auth: jest.fn(),
}));

const ListWrapper = () => {
  const [content, setContent] = useState<JSX.Element | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await List();
      setContent(result);
    };

    fetchData();
  }, []);

  return <>{content}</>;
};

describe("Contribute Three Top Book", () => {
  beforeEach(() => {
    (auth as jest.Mock).mockResolvedValue({
      user: {
        name: "admin",
        email: "admin@gmail.com",
        image: "https://i.ibb.co/RHMqQGr/man-1.png",
        picture: "https://i.ibb.co/RHMqQGr/man-1.png",
        sub: "3733403",
        id: "3733403",
        isAdmin: true,
        iat: 1725852964,
        exp: 1725939364,
        jti: "4786dc9c-641f-4e0e-9938-6ba1722348e9",
      },
      expires: "2024-09-10T03:36:04.771Z",
    });
    (getUserById as jest.Mock).mockResolvedValue(DATA_USER[0]);

    (getAllBook as jest.Mock).mockResolvedValue(DATA_BOOKS);
  });

  it("Should render correctly snapshot", () => {
    expect(render(<ListWrapper />)).toMatchSnapshot();
  });
});
