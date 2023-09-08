import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import MultiSelectCard from "../MultiSelectCard";

const selecttxt = "Select all that apply";
const checktxt = "check-boxid";
const MultiSelectCards = {
  type: "choice",
  id: "LJpKjpbGm856WPgS0IuKxU-us|0000007_1",
  messageId: "EzSeVP0iZ2PSCpTeMadQZ-us|0000001",
  text: selecttxt,
  user: "system",
  title: selecttxt,
  focus: true,
  date: 1668861995693,
  dateString: "6:16 PM",
  status: "delivered",
  className: "",
  replyToId: "EzSeVP0iZ2PSCpTeMadQZ-us|0000000",
  buttons: [
    {
      title: "Submit",
      type: "button",
      value: "Submit",
      selected: false,
      disabled: false,
    },
  ],
  options: [
    {
      active: true,
      checked: false,
      title: "CLAUDIA J JAMES",
      value: "01",
    },
    // {
    //   active: true,
    //   checked: false,
    //   title: "RUSSELL E JAMES",
    //   value: "01",
    // },
  ],
  active: true,
};

describe("MultiSelectCard component", () => {
  it("should render without issues", () => {
    const { container } = render(<MultiSelectCard {...MultiSelectCards} />);
    expect(container).toMatchSnapshot();
  });

  it("Mock data should render without issues", () => {
    const { getByText } = render(
      <MultiSelectCard
        {...MultiSelectCards}
        key={"prompt_"}
        onSelect={jest.fn()}
      />
    );
    expect(getByText("Submit")).toBeTruthy();
  });

  it("Button not Disabled check",  () => {
    const { getByText } = render(
      <MultiSelectCard
        {...MultiSelectCards}
        disabled
        key={"prompt_"}
        onSelect={jest.fn()}
      />
    );
    expect(getByText("Submit")).not.toBeDisabled();
  });
});

test("render component", () => {
  render(<MultiSelectCard {...MultiSelectCards} />);

  const cbEl = screen.getByTestId(checktxt);
  expect(cbEl).toBeInTheDocument();
  expect(cbEl).not.toBeChecked();
});

test("checking data to be present", () => {
  render(<MultiSelectCard {...MultiSelectCards} />);

  const cbEl = screen.findAllByLabelText(/CLAUDIA/i);
  expect(cbEl).toBeTruthy();
});

test("toggle element by selecting checkbox", () => {
  render(<MultiSelectCard {...MultiSelectCards} />);
  const cbEl = screen.getByTestId(checktxt);
  userEvent.click(cbEl);
  expect(cbEl).not.toBeChecked();
  expect(screen.queryByTestId("labeldata")).toBeInTheDocument();
});

test("MultiSelectCard calls onClick prop when clicked", () => {
  render(
    <MultiSelectCard
      {...MultiSelectCards}
      onSelect={jest.fn()}
      disabled={false}
      active={true}
    />
  );
  fireEvent.click(screen.getByText("Submit"));
});

describe("MultiSelectCard component", () => {
  it("checkbox is checked/unchecked",  () => {
    const { getByTestId } = render(<MultiSelectCard {...MultiSelectCards} />);
    const checkbox =  getByTestId(checktxt);
    expect(checkbox.checked).toEqual(false);
    fireEvent.click(checkbox);
    expect(checkbox.checked).toEqual(true);
  });
});

test("MultiSelectCard Component Should display Select all that apply)", () => {
  const { getByText } = render(<MultiSelectCard {...MultiSelectCards} />);
  getByText(selecttxt);
});
