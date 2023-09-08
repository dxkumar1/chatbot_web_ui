import React from 'react';
import Plan from './Plan';
import { render, screen } from '@testing-library/react'

test("Plan snapshot test", () => {
    const { container } = render(<Plan data={[]} />)
    expect(container).toMatchSnapshot()
})

test("Plan load data and verify length", () => {
    const data = [{title: 'test1', value: 'test1', notes: 'test1'}]
    render(<Plan data={data} />)
    expect(screen.getAllByTestId('row')).toHaveLength(data.length)
})

test("Plan render data and find value", () => {
    const data = [{title: 'test1', value: 'test1', notes: 'test1'}]
    render(<Plan data={data} />)
    const inputEl = screen.getByTestId('row');
    expect(inputEl).toBeInTheDocument();
    expect(inputEl).toHaveTextContent('test1')
})
