import {
  render,
  fireEvent,
  screen
} from '@testing-library/react'
import "@testing-library/jest-dom/extend-expect";
import renderer from 'react-test-renderer';
import Action from '../Action'

test("Component Should display My Benefits", () => {

  const {
    debug,
    getByTestId,
    getByText
  } = render(< Action title='My Benefits' keyRef="data" />);

  const myBtn = getByTestId('button');
  fireEvent.click(myBtn);
  const getbyids = getByTestId("myactionbutton");
  getByText("My Benefits")
  expect(getbyids).toBeTruthy();
  expect(getbyids.tagName).toBe("SPAN");
});

describe('Action component', () => {
  it('should render without issues', () => {
    const { component } = render(< Action />)
    expect(component).toMatchSnapshot()
  })
})

describe('Action component', () => {
  it('should render without issues', () => {
    const { container } = render(<Action />)
    expect(container).toMatchSnapshot()
  })
})

describe("Action", () => {
  test("Action inputs is working", () => {
    const ActionData = "Request ID Card";
    const ActionWrapper = renderer.create(< Action value={
      ActionData
    }
    />).toJSON;
    expect(ActionWrapper).toMatchSnapshot();
  });
});


test("Component Should display Deductibles/MOOP(Maximum-Out-of-Pocket)", () => {

  const {
    debug,
    getByTestId,
    getByText
  } = render(< Action title='Deductibles/MOOP(Maximum-Out-of-Pocket)' keyRef="data" />);


  const myBtn = getByTestId('button');
  fireEvent.click(myBtn);
  const getbyids = getByTestId("myactionbutton");
  getByText("Deductibles/MOOP(Maximum-Out-of-Pocket)");
  expect(getbyids).toBeTruthy();
});

test("Component Should display Outpatient Services)", () => {

  const {
    debug,
    getByTestId,
    getByText
  } = render(< Action title='Outpatient Services' keyRef="data" />);

  const myBtn = getByTestId('button');
  fireEvent.click(myBtn);
  const getbyids = getByTestId("myactionbutton");
  getByText("Outpatient Services")

  expect(getbyids).toBeTruthy();
  expect(getbyids.tagName).toBe("SPAN");
});

test("Component Should display Outpatient Services)", () => {

  const {
    debug,
    getByTestId,
    getByText
  } = render(< Action title='Outpatient Services' keyRef="data" />);

  const myBtn = getByTestId('button');
  fireEvent.keyDown(myBtn, {
    key: "Enter",
    code: "Enter",
    keyCode: 33,
    charCode: 33
  });
  const getbyids = getByTestId("myactionbutton");
  getByText("Outpatient Services")

  expect(getbyids).toBeTruthy();
  expect(getbyids.tagName).toBe("SPAN");
});



test("button on the screen count", async () => {
  render(<Action />);
  const buttonList = await screen.findAllByRole("button");
  expect(buttonList).toHaveLength(1);
});
