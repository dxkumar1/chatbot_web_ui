import React from "react";
import ChatbotHeader from "./ChatbotHeader";
import renderer from "react-test-renderer";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import store from "../../../shared/redux/store";
import { SignalRProvider } from "../../../shared/context/SignalRContext";

jest.mock('broadcast-channel');


jest.mock('next/router', () => ({
  useRouter: jest.fn()
}))

test("ChatbotHeader snapshot test", () => {
  const component = renderer.create(<SignalRProvider>
    <Provider store={store}>
      
      <ChatbotHeader />
    </Provider>
  </SignalRProvider>);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test("It should check the HeaderElement present or no in the screen", () => {
  render(<SignalRProvider>
    <Provider store={store}>
      <ChatbotHeader />
    </Provider>
  </SignalRProvider>);
  const HeaderElement = screen.getByText("Customer Care Healthbot");
  expect(HeaderElement).toBeInTheDocument();
});
  test("render the two button on the screen", async () => {
    render(<SignalRProvider>
      <Provider store={store}>
        <ChatbotHeader />
      </Provider>
    </SignalRProvider>);
    const buttonList = await screen.findAllByRole("button");
    expect(buttonList).toHaveLength(2);
  });

  test('render the minimize button on the screen', () => {
    render(<SignalRProvider>
      <Provider store={store}>
        <ChatbotHeader />
      </Provider>
    </SignalRProvider>);
    const button = screen.getByTestId('minimize-button')
    fireEvent.click(button)
    expect(screen.getByText('Customer Care Healthbot')).toBeInTheDocument()
  })

  test('render the close button on the screen', () => {
    render(<SignalRProvider>
      <Provider store={store}>
        <ChatbotHeader />
      </Provider>
    </SignalRProvider>);
    const button = screen.getByTestId('close-button')
    fireEvent.click(button)
    expect(screen.getByText('Customer Care Healthbot')).toBeInTheDocument()
  })
  test('render the close button sessionTransfer on the screen', () => {
    render(<SignalRProvider>
      <Provider store={store}>
        <ChatbotHeader />
      </Provider>
    </SignalRProvider>);
    const sessionReducer = {
      isEnded:true,
      isSessionTransfer: true
    }
    const check = sessionReducer.isEnded || sessionReducer.isSessionTransfer;
    expect(check).toEqual(true);
  })