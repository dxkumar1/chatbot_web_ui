import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import renderer from "react-test-renderer";
import Label from "../Label";
afterEach(() => {
  cleanup();
});

test("Component Should display Please select one of the following:", () => {
  const { getByTestId } = render(
    <Label text="Please select one of the following:" />
  );
  const getbyids = getByTestId("labeldata");
  expect(getbyids).toBeTruthy();
});

test("Label snapshot test", () => {
  const component = renderer.create(<Label />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
