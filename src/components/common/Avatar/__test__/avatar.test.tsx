import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import Avatar from "..";

describe("Avatar", () => {
  it("Should render correctly snapshot", () => {
    expect(
      render(
        <Avatar
          image="https://i.ibb.co/88X1WfZ/avatar-default.png"
          width={100}
          height={100}
        />
      )
    ).toMatchSnapshot();
  });

  it("Should render correctly snapshot when image empty", () => {
    expect(
      render(<Avatar image="" width={100} height={100} />)
    ).toMatchSnapshot();
  });
});
