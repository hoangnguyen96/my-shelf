import "@testing-library/jest-dom";
import { fireEvent, render } from "@testing-library/react";
import TableItem from "..";
import { useRouter } from "next/navigation";

// Mock useRouter
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

// Mock Image component
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />,
}));

describe("TableItem", () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
  });

  it("Should render correctly snapshot", () => {
    expect(
      render(
        <TableItem
          id={"1"}
          title={"Test"}
          author={"Test"}
          imageUrl={"Test"}
          category={"Test"}
          edition={"Test"}
          publicationYear={0}
          rating={0}
          isFavorite={false}
        />
      )
    ).toMatchSnapshot();
  });

  it("Should render correctly snapshot when imageUrl is empty", () => {
    expect(
      render(
        <TableItem
          id=""
          title=""
          author=""
          imageUrl=""
          category=""
          edition=""
          publicationYear={0}
          rating={0}
          isFavorite={false}
        />
      )
    ).toMatchSnapshot();
  });

  it("Should render correctly snapshot when is contribute", () => {
    expect(
      render(
        <TableItem
          id="1"
          title="Test"
          author="Test"
          imageUrl=""
          category="Test"
          edition="Test"
          isContribute={true}
          publicationYear={0}
          rating={0}
          isFavorite={false}
        />
      )
    ).toMatchSnapshot();
  });

  it("Should handle redirect Preview", () => {
    const { getByTestId } = render(
      <TableItem
        id="1"
        title="Test"
        author="Test"
        imageUrl=""
        category="Test"
        edition="Test"
        isContribute={true}
        publicationYear={0}
        rating={0}
        isFavorite={false}
      />
    );

    const button = getByTestId("redirect-preview");

    fireEvent.click(button);
  });

  it("Should handle redirect Preview when contribute false", () => {
    const { getByTestId } = render(
      <TableItem
        id="1"
        title="Test"
        author="Test"
        imageUrl=""
        category="Test"
        edition="Test"
        isContribute={false}
        publicationYear={0}
        rating={0}
        isFavorite={false}
      />
    );

    const button = getByTestId("redirect-preview");

    fireEvent.click(button);
  });

  it("Should handle delete book", () => {
    const { getByTestId } = render(
      <TableItem
        id="1"
        title="Test"
        author="Test"
        imageUrl=""
        category="Test"
        edition="Test"
        isContribute={true}
        publicationYear={0}
        rating={0}
        isFavorite={false}
      />
    );

    const button = getByTestId("delete-book");

    fireEvent.click(button);
  });
});
