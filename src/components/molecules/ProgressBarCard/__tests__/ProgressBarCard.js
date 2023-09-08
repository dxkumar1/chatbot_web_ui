import { render, screen } from "@testing-library/react";
import ProgressBarCard from "../ProgressBarCard";

const data = [
  {
    current: 0,
    max: 50,
    completed: 20,
    title: "Progress"
 }
];
describe("ProgressBarCard component", () => {
  it("should render without issues", () => {
    const { container } = render(<ProgressBarCard />);
    expect(container).toMatchSnapshot();
  });
});

test("button click event", () => {

  render(<ProgressBarCard items={data} />);
  const button = screen.getByTestId("progress_bar");
  expect(button).toBeTruthy();
  expect(button.tagName).toBe("DIV");
});
