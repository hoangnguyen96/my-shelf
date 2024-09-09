import { render } from "@testing-library/react";
import Heading from "../my-book-shelf/@heading/page";

jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}));

describe("My Book Shelf Favorites", () => {
  it("Should render correctly snapshot", () => {
    expect(render(<Heading />)).toMatchSnapshot();
  });
});
