/*********************************************************************
 * File Name: TimeOutModal.js
 * Date Created: 21-Dev-2022
 * Date Modified: 21-Dec-2022
 * Description: unit testing for completing scenario on TimeOutModal.feature
 * Sample Output: 100%
 * Original Author: Arunachalamoorthy
 * Current Author: Arunachalamoorthy
 **********************************************************************/

import React from 'react';
import renderer, { act } from 'react-test-renderer';
import TimeOutModal from '../TimeOutModal';
import { render, screen } from '@testing-library/react';

test("User can see the Popup", () => {
  const component = renderer.create(<TimeOutModal 
      testIcon="icon"
      timeOutCountDown={10} 
      onTimeOutCompletion={jest.fn()}
      onTimeOutCancel={jest.fn()}
      onEndSession={jest.fn}
      modalType="timeout"
    />
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
})

test("Component Should display modal title)", () => {
  const { getByTestId, getByText } = render(
    <TimeOutModal testIcon="icon" timeOutCountDown={10}  modalType="timeout"/>
  );
  const getById = getByTestId("modal_data");
  getByText("Are you still there?");
  expect(getById).toBeTruthy();
  expect(getById.tagName).toBe("DIV");
});

test("Value of clock after 1s", async () => {
  render(<TimeOutModal dealy={10} setDealy= {jest.fn()} hideClose={true} testIcon="icon" onTimeOutCompletion={jest.fn()} timeOutCountDown={10} modalType="timeout"/>);
  expect(screen.getByText("00:10")).toBeInTheDocument();
  setTimeout(() => {
    setDelay(delay - 1);
    expect(screen.getByText(9)).toBeInTheDocument();
  }, 1000);
});

describe('Timeout Modal', () => {
  afterEach(() => {
    jest.useRealTimers();
  });
  it('clearInterval uisng count', () => {
    jest.useFakeTimers();
    render(<TimeOutModal delay={10} setDelay= {jest.fn()} hideClose={true} testIcon="icon" onTimeOutCompletion={jest.fn()} timeOutCountDown={10} modalType="timeout" />);
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    const message = screen.getByText("00:09");
    expect(message).toBeInTheDocument();
  });
});

describe('Timeout Modal', () => {
  afterEach(() => {
    jest.useRealTimers();
  });
  it('clearInterval uisng count', () => {
    jest.useFakeTimers();
    render(<TimeOutModal dealy={0} setDealy= {jest.fn()} hideClose={true} testIcon="icon" onTimeOutCompletion={jest.fn()} timeOutCountDown={0} modalType="timeout"/>);
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    const message = screen.getByText("00:00");
    expect(message).toBeInTheDocument();
  });
});