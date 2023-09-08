import { render, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import renderer from "react-test-renderer";
import Notification from "../Notification";
afterEach(() => {
  cleanup();
});

test("Component Should display Please select one of the following:", () => {
  const { getByTestId } = render(
    <Notification text="Please select one of the following:" />
  );
  const getbyids = getByTestId("notificationdata");
  expect(getbyids).toBeTruthy();
});

test("Label snapshot test", () => {
  const component = renderer.create(<Notification />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
