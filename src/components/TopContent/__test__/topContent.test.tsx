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
  (useSession as jest.Mock).mockReturnValue({
    data: {
      user: {
        isAdmin: true,
        email: "admin@gmail.com",
        id: "3733403",
        name: "admin",
        image: "https://i.ibb.co/RHMqQGr/man-1.png",
      },
      expires: "2024-12-31T23:59:59.999Z",
    },
    status: "authenticated",
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Should render correctly snapshot", () => {
    const { asFragment } = render(<TopContent />);

    expect(asFragment()).toMatchSnapshot();
  });

  it("Should render path correctly with pathname", () => {
    (usePathname as jest.Mock).mockReturnValue(ROUTES.CONTRIBUTE);
    (usePathname as jest.Mock).mockReturnValue(ROUTES.CONTRIBUTE_COMPLETE);
    (usePathname as jest.Mock).mockReturnValue(ROUTES.CONTRIBUTE_LIST);
    (usePathname as jest.Mock).mockReturnValue(ROUTES.PREVIEW);
    (usePathname as jest.Mock).mockReturnValue(ROUTES.PROFILE);

    const { container } = render(<TopContent />);

    const flexContainer = container.querySelector("div");
    expect(flexContainer).toHaveStyle("justify-content: flex-end");
  });
});
