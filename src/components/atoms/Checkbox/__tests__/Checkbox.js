import { render, fireEvent } from "@testing-library/react";
import Checkbox from "../../Checkbox/Checkbox";

describe("Checkbox component snapshot", () => {
  it("should render without issues", () => {
    const { container } = render(<Checkbox />);
    expect(container).toMatchSnapshot();
  });
});

//sj
describe("Checkbox component", () => {
  it("checkbox is checked/unchecked",  () => {
    const { getByTestId } = render(<Checkbox />);
    const checkbox =  getByTestId("check-boxid");
    expect(checkbox.checked).toEqual(false);
    fireEvent.click(checkbox);
    expect(checkbox.checked).toEqual(true);
  });
});

describe("Checkbox component", () => {
  it("Checkbox select called", () => {
    const onSelect = jest.fn();
    const { getByTestId } = render(
      <Checkbox
        type="checkbox"
        value="click"
        active={true}
        onClick={() => onSelect()}
      />
    );

    const myBtn = getByTestId("check-boxid");
    fireEvent.click(myBtn);
    expect(onSelect).toBeCalled();
  });
});
