import { render, waitFor } from "@testing-library/react";
import ContributeUpdate from "../page";
import { DATA_BOOKS } from "@app/mocks/data";
import { getBookById } from "@app/features/dashboard/actions";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("@app/features/dashboard/actions", () => ({
  getBookById: jest.fn(),
}));

describe("Contribute Update", () => {
  const mockBook = DATA_BOOKS[0];

  beforeEach(() => {
    jest.clearAllMocks();
    (getBookById as jest.Mock).mockResolvedValue(mockBook);
  });

  it("Should render correctly snapshot", async () => {
    const { container } = render(
      await ContributeUpdate({ params: { id: "1" } })
    );

    await waitFor(() => {
      expect(container).toMatchSnapshot();
    });
  });
});
