import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import CartBorrow from "..";
import { book1 } from "@app/assets/images";

// Mock Image component
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />,
}));

describe("CartBorrow", () => {
  it("Should render correctly snapshot", () => {
    expect(
      render(
        <CartBorrow
          title={"Don’t Make Me think"}
          author={"Steve Krug, "}
          publicationYear={1900}
          rating={4.5}
          imgUrl={`${book1}`}
          createDate={"11 Mar 2023 09:00 AM"}
          id={""}
          onReturnBook={() => {}}
        />
      )
    ).toMatchSnapshot();
  });
});
