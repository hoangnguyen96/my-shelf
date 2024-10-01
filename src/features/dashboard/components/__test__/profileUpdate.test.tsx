import { act, fireEvent, render } from "@testing-library/react";
import { DATA_BOOKS, DATA_USER } from "@app/mocks/data";
import { ProfileUpdate } from "../profile-update";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("../../actions", () => ({
  updateUserById: jest.fn(),
}));

describe("Update Profile", () => {
  const props = {
    imageUrl: "https://i.ibb.co/Xz1Zmb9/book3.webp",
    user: DATA_USER[0],
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Should render correctly snapshot", () => {
    const { container } = render(<ProfileUpdate {...props} />);

    expect(container).toMatchSnapshot();
  });
});
