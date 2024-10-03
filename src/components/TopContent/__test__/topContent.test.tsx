import { render } from "@testing-library/react";
import TopContent from "..";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { ROUTES } from "@app/constants";

jest.mock("next-auth/react", () => ({
  useSession: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
}));

jest.mock("@app/actions/auth", () => ({
  logout: jest.fn(),
}));

describe("TopContent component", () => {
  const propsSession = {
    user: {
      isAdmin: true,
      email: "admin@gmail.com",
      id: "3733403",
      name: "admin",
      image: "https://i.ibb.co/RHMqQGr/man-1.png",
    },
    expires: "2024-12-31T23:59:59.999Z",
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Should render correctly snapshot", () => {
    const { asFragment } = render(<TopContent session={propsSession} />);

    expect(asFragment()).toMatchSnapshot();
  });

  it("Should render path correctly with pathname contribute", () => {
    (usePathname as jest.Mock).mockReturnValue(ROUTES.CONTRIBUTE);

    const { container } = render(<TopContent session={propsSession} />);

    const flexContainer = container.querySelector("div");
    expect(flexContainer).toHaveStyle("justify-content: flex-end");
  });

  it("Should render path correctly with pathname contribute complete", () => {
    (usePathname as jest.Mock).mockReturnValue(ROUTES.CONTRIBUTE_COMPLETE);

    const { container } = render(<TopContent session={propsSession} />);

    const flexContainer = container.querySelector("div");
    expect(flexContainer).toHaveStyle("justify-content: flex-end");
  });

  it("Should render path correctly with pathname contribute list", () => {
    (usePathname as jest.Mock).mockReturnValue(ROUTES.CONTRIBUTE_LIST);

    const { container } = render(<TopContent session={propsSession} />);

    const flexContainer = container.querySelector("div");
    expect(flexContainer).toHaveStyle("justify-content: flex-end");
  });

  it("Should render path correctly with pathname preview", () => {
    (usePathname as jest.Mock).mockReturnValue(ROUTES.PREVIEW);

    const { container } = render(<TopContent session={propsSession} />);

    const flexContainer = container.querySelector("div");
    expect(flexContainer).toHaveStyle("justify-content: flex-end");
  });

  it("Should render path correctly with pathname profile", () => {
    (usePathname as jest.Mock).mockReturnValue(ROUTES.PROFILE);

    const { container } = render(<TopContent session={propsSession} />);

    const flexContainer = container.querySelector("div");
    expect(flexContainer).toHaveStyle("justify-content: flex-end");
  });
});
