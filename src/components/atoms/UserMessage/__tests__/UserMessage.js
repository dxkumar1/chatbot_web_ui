import { render, cleanup } from "@testing-library/react";
import UserMessage from "../UserMessage";

afterEach(() => {
  cleanup();
});

test("Component Should display My Benefits", () => {
  const { getByTestId } = render(
    <UserMessage text="My Benefits" status="active" firstName="Bill Tores" />
  );
  const getbyids = getByTestId("actiondetail");
  expect(getbyids).toBeTruthy();
});

describe("UserMessage component", () => {
  it("should render without issues", () => {
    const { container } = render(<UserMessage />);
    expect(container).toMatchSnapshot();
  });
});

test("Component Should display Deductibles/MOOP(Maximum-Out-of-Pocket)", () => {
  const { getByTestId, getByText } = render(
    <UserMessage
      text="Deductibles/MOOP(Maximum-Out-of-Pocket)"
      status="active"
      firstName="Bill Tores"
    />
  );
  const getbyids = getByTestId("actiondetail");
  getByText("Deductibles/MOOP(Maximum-Out-of-Pocket)");
  expect(getbyids).toBeTruthy();
});

test("Component Should display Outpatient Services", () => {
  const { getByTestId } = render(
    <UserMessage
      text="Outpatient Services"
      status="active"
      firstName="Bill Tores"
    />
  );

  const getbyids = getByTestId("actiondetail");
  expect(getbyids).toBeTruthy();
});
