import { render, screen } from "@testing-library/react";
import Deductibles from "../Deductibles";

describe("ProgressBarCard component", () => {
  it("should render without issues", () => {
    const { container } = render(<Deductibles />);
    expect(container).toMatchSnapshot();
  });
});

test("should render completed Deductibles", () => {
  render(<Deductibles />);
  const Deductibleselement = screen.getByTestId("deductibles");
  expect(Deductibleselement).toBeInTheDocument();
});

test("Component Should display modal title)", () => {
  const { getByTestId, getByText,debug } = render(
    <Deductibles items={["data"]}/>
  );
  const getById = getByTestId("deductibles");
  expect(getById).toBeTruthy();
  expect(getById.tagName).toBe("DIV");

});

