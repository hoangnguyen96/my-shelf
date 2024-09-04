import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import Cart from "..";

describe("Cart", () => {
  it("Should render correctly snapshot", () => {
    expect(
      render(
        <Cart
          title="Don't Make Me Think"
          author="Steve Krug"
          imageUrl="https://i.ibb.co/QbQgVtG/book1.png"
          publicationYear={2000}
          rating={4.5}
          isFavorite={true}
          id={""}
        />
      )
    ).toMatchSnapshot();
  });
});
