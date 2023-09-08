import { render, fireEvent, screen } from "@testing-library/react";
import ActionCard from "../ActionCard";
import { actioncardMock } from "../../../../shared/utils/__mock__/actionCard";

const benifittxt = "My Benefits";
describe("ActionCard component", () => {
  it("should render without issues", () => {
    const { container } = render(<ActionCard />);
    expect(container).toMatchSnapshot();
  });

  it("Mock data should render without issues", () => {
    const { getByText } = render(
      <ActionCard {...actioncardMock} key={"prompt_"} onSelect={jest.fn()} />
    );
    expect(getByText(benifittxt)).toBeTruthy();
  });

  it("Button not Disabled check",  () => {
    const { getByText } = render(
      <ActionCard
        {...actioncardMock}
        disabled
        key={"prompt_"}
        onSelect={jest.fn()}
      />
    );
     expect(getByText(benifittxt)).not.toBeDisabled();
  });
});

test("Component Should display Please select one of the following: text)", () => {
  const { getByText } = render(
    <ActionCard text="Please select one of the following:" />
  );
  getByText("Please select one of the following:");
});

test("calls onClick prop when clicked", () => {
  render(
    <ActionCard
      {...actioncardMock}
      onSelect={jest.fn()}
      disabled={false}
      active={true}
    />
  );
  fireEvent.click(screen.getByText(benifittxt));
});
