import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import TableList from "..";

// Mock useRouter
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

// Mock Image component
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />,
}));

describe("TableList", () => {
  it("Should render correctly snapshot", () => {
    expect(
      render(
        <TableList
          id={"1"}
          title={"Test"}
          author={"Test"}
          imageUrl={"Test"}
          category={"Test"}
          edition={"Test"}
          publicationYear={0}
          rating={0}
          idFavorite={false}
        />
      )
    ).toMatchSnapshot();
  });
});
