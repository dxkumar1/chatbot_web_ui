import { render } from "@testing-library/react";
import Loader from "../Loader";

describe("Loader component", () => {
  it("should render without issues", () => {
    const { container } = render(<Loader />);
    expect(container).toMatchSnapshot();
  });
});

