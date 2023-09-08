import React from 'react';
import RetryButton from './RetryButton';
import renderer from 'react-test-renderer';
import { Provider } from "react-redux";
import store from "../../../shared/redux/store";
import { SignalRProvider } from "../../../shared/context/SignalRContext";
import {
    render, fireEvent,
    screen,
} from '@testing-library/react';


jest.mock('broadcast-channel');

jest.mock('next/router', () => ({
  useRouter: jest.fn()
}))

test("ChatbotFooter snapshot test", () => {
    const component = renderer.create(
        <SignalRProvider>
    <Provider store={store}>
      <RetryButton />
    </Provider>
  </SignalRProvider>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
})


test("button click event", () => {
  render(<SignalRProvider>
      <Provider store={store}>
        <RetryButton />
      </Provider>
    </SignalRProvider>);
  const button = screen.getByTestId('retry');
  fireEvent.click(button);
});
