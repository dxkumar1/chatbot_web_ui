import React from 'react';
import CallButton from './CallButton';
import renderer from 'react-test-renderer'
import {
    render, screen
  } from '@testing-library/react'

test("CallButton snapshot test", () => {
    const component = renderer.create(
        <CallButton />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

test('should render completed CallButton', () => {
    render(<CallButton />);
    const callElement = screen.getByTestId('callbutton');
    expect(callElement).toBeInTheDocument();
});

test('should render completed paragraph', () => {
    render(<CallButton/>);
    const paraElement = screen.getByTestId('paraonclick');
    expect(paraElement).toBeInTheDocument();
});

