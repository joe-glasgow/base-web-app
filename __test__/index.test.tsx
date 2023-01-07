import { render, RenderResult } from "@testing-library/react";
import Home from "./index";

describe("Home page", () => {
  let page: RenderResult<
    typeof import("@testing-library/dom/types/queries"),
    HTMLElement,
    HTMLElement
  > | null;
  beforeEach(() => {
    page = render(<Home />);
  });
  afterEach(() => {
    page = null;
  });
  it("renders", () => {
    expect(page).toBeDefined();
    expect(page?.getByTestId("main-content")).toBeInTheDocument();
  });
});
