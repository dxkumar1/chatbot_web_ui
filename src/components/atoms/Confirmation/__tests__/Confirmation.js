import React from 'react';
import {
    render, screen
  } from '@testing-library/react'
import Confirmation from '../Confirmation';

test("User can see confirmation message", () => {
    render(
        <Confirmation text={""}/>
    );
    const confirmMessage = screen.getByTestId("confirmation")
    expect(confirmMessage).toBeInTheDocument();
})


