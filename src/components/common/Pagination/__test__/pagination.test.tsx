import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import Pagination from "..";

describe("Pagination", () => {
  const props = {
    pagination: 1,
    setPagination: jest.fn(),
    data: [
      [
        {
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
        {
          title: "Rich Dad Poor Dad",
          author: "Robert T. Kiyosaki",
          category: "SelfHelpBook",
          imageUrl: "https://i.ibb.co/9qHTtQF/book2.png",
          description:
            "Steve Krug is a usability consultant who has more than 30 years of experience as a user advocate for companies like Apple, Netscape, AOL, Lexus, and others. Based in part on the success of his first book, Don't Make Me Think, he has become a highly sought-after speaker on usability design.",
          status: false,
          publicationYear: 1997,
          rating: 4.5,
          createdDate: "3 Sep 2024 8:47 PM",
          edition: "second",
          id: "2",
        },
      ],
    ],
  };

  it("Should render correctly snapshot", () => {
    expect(render(<Pagination {...props} />)).toMatchSnapshot();
  });
});
