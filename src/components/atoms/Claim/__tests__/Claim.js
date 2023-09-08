import React from 'react';
import {
    render, screen
  } from '@testing-library/react'
import Claim from '../Claim';

const data = [{claimId: 'test1', claimStatus: 'test1', claimDate: 'test1', provider: '',claimAmount: '',owedAmount: '' }]
test("User can see claim data", () => {
    render(
        <Claim data={data}/>
    );
    expect(screen.getAllByTestId('claim-data')).toHaveLength(data.length)
})


