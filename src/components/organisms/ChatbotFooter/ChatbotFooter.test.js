import React from "react";
import ChatbotFooter from "./ChatbotFooter";
import renderer from "react-test-renderer";
import { Provider } from "react-redux";
import store from "../../../shared/redux/store";
import { SignalRProvider } from "../../../shared/context/SignalRContext";
import {
  render,
  fireEvent,
  screen,
  waitFor,
  cleanup,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

jest.mock("broadcast-channel");

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

test("ChatbotFooter snapshot test", () => {
  const component = renderer.create(
    <SignalRProvider>
      <Provider store={store}>
        <ChatbotFooter />
      </Provider>
    </SignalRProvider>
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test("footer value testing", async () => {
  render(
    <SignalRProvider>
      <Provider store={store}>
        <ChatbotFooter />
      </Provider>
    </SignalRProvider>
  );
  userEvent.type(screen.getByTestId("inputvalid"), "");
  await waitFor(() => {
    expect(screen.getByTestId("inputvalid")).toHaveValue("");
  });
});

test("input keypress function key value true", async () => {
  render(
    <SignalRProvider>
      <Provider store={store}>
        <ChatbotFooter />
      </Provider>
    </SignalRProvider>
  );
  const inputEl = screen.getByTestId("inputvalid");
  fireEvent.keyPress(inputEl, { key: "Enter", charCode: 13, shiftKey: true });
  fireEvent.focusOut(inputEl);
});

test("input keypress function key value false", async () => {
  render(
    <SignalRProvider>
      <Provider store={store}>
        <ChatbotFooter />
      </Provider>
    </SignalRProvider>
  );
  const inputEl = screen.getByTestId("inputvalid");
  fireEvent.keyPress(inputEl, { key: "Enter", charCode: 13 });
  fireEvent.focusOut(inputEl);
});

test("button render test", () => {
  render(
    <SignalRProvider>
      <Provider store={store}>
        <ChatbotFooter />
      </Provider>
    </SignalRProvider>
  );
  const btnEl = screen.getByTestId("rebtnvalid");
  expect(btnEl).toBeInTheDocument();
});

test("button click event", () => {
  render(
    <SignalRProvider>
      <Provider store={store}>
        <ChatbotFooter />
      </Provider>
    </SignalRProvider>
  );
  const button = screen.getByTestId("rebtnvalid");
  fireEvent.click(button);
});

test("clicking the button toggles an answer on/off", () => {

  render(
    <SignalRProvider>
      <Provider store={store}>
        <ChatbotFooter />
      </Provider>
    </SignalRProvider>
  );
  const button = screen.getByTestId("close-button");
  fireEvent.click(button);
  expect(screen.getByText("Call Live Agent")).toBeInTheDocument();
});

test("onkeypress - function runs", () => {
  const input = "hello";
  const { getByTestId } = render(
    <SignalRProvider>
      <Provider store={store}>
        <ChatbotFooter
          input={input}
          setInput={input}
          onKeyPress={jest.fn()}
          clear={jest.fn()}
        />
      </Provider>
    </SignalRProvider>
  );
  const inputNode = getByTestId("inputvalid");
  fireEvent.change(inputNode, { target: { value: "hello" } });
  expect(inputNode.value).toBe("hello");
  fireEvent.keyPress(inputNode, { key: "Enter", keyCode: 13 });
});

afterEach(cleanup);

describe("<Search/>", () => {
  const input = "";

  test("onkeypress - function runs", () => {
    const { getByTestId } = render(
      <SignalRProvider>
        <Provider store={store}>
          <ChatbotFooter
            input={input}
            setInput={input}
            onKeyPress={jest.fn()}
            clear={jest.fn()}
          />
        </Provider>
      </SignalRProvider>
    );
    const inputNode = getByTestId("inputvalid");
    fireEvent.change(inputNode, { target: { value: "" } });
    expect(inputNode.value).toBe("");
    fireEvent.keyPress(inputNode, { key: "Enter", keyCode: 13 });
  });
});
