import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import TableList from "..";

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
