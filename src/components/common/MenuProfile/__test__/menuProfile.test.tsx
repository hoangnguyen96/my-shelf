import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import MenuProfile from "..";

// Mock useRouter
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("MenuProfile", () => {
  const props = {
    user: {
      id: "123",
      name: "John Doe",
      email: "johndoe@example.com",
      image: "https://example.com/johndoe.jpg",
      isAdmin: true,
    },
    expires: "2024-12-31T23:59:59.999Z",
  };

  it("Should render correctly snapshot", () => {
    expect(
      render(
        <MenuProfile
          user={props}
          onRedirectFavorites={() => {}}
          onRedirectProfile={() => {}}
          onLogout={() => {}}
        />
      )
    ).toMatchSnapshot();
  });
});
