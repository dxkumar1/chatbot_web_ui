import React from "react";
import Input from "./Input";
import renderer from "react-test-renderer";
import userEvent from "@testing-library/user-event";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";

describe("Input component", () => {
  test("Input snapshot test", () => {
    const component = renderer.create(
      <Input multiline={false} maxHeight={200} minHeight={25} />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("Input input value testing", async () => {
    render(
      <Input
        defaultValue="hello"
        multiline={true}
        maxHeight={200}
        minHeight={25}
        onChangeEvent={jest.fn()}
      />
    );
    userEvent.type(screen.getByTestId("textvalid"), "hello");
    await waitFor(() => {
      expect(screen.getByTestId("textvalid")).toHaveValue("hello");
    });
  });

  test("Input input place holder testing",  () => {
    render(
      <Input
        placeholder={"Type a message"}
        multiline={true}
        maxHeight={200}
        minHeight={25}
      />
    );
    const inputEL = screen.getByPlaceholderText("Type a message");
    expect(inputEL).toBeInTheDocument();
  });

  test("Input input focus", async () => {
    const { getByTestId } = render(
      <Input multiline={true} maxHeight={200} minHeight={25} />
    );
    const input = getByTestId("textvalid");
    await userEvent.type(input, "text");
    fireEvent.focusOut(input);
  });

  test("calling function",  () => {
    const onChangeEvent = jest.fn();
    render(
      <Input
        onChangeEvent={onChangeEvent()}
        multiline={true}
        maxHeight={200}
        minHeight={25}
      />
    );
    expect(onChangeEvent).toBeCalled(); //toHaveBeenCalledTimes(1)
  });

  test("It should keep hello txt", () => {
    render(
      <Input value={"hello"} multiline={true} maxHeight={200} minHeight={25} />
    );
    expect(screen.getByRole("textval")).toHaveValue("hello");
  });

  test("render test input", () => {
    render(<Input multiline={false} maxHeight={200} minHeight={25} />);
    const inputEl = screen.getByTestId("inputvalid");
    expect(inputEl).toBeInTheDocument();
    expect(inputEl).toHaveAttribute("type", "text");
  });

  test("Input input with target", () => {
    render(<Input multiline={false} maxHeight={200} minHeight={25} />);
    const inputEl = screen.getByTestId("inputvalid");
    fireEvent.change(inputEl, { target: { value: "23" } });
    expect(inputEl.value).toBe("23");
  });
});
