import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import ModalDeleteBook from "..";

describe("ModalDeleteBook", () => {
  it("Should render correctly snapshot", () => {
    expect(
      render(
        <ModalDeleteBook
          isOpen={true}
          onClose={() => {}}
          onConfirm={() => {}}
        />
      )
    ).toMatchSnapshot();
  });
});
