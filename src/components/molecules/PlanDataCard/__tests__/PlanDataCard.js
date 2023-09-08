import { render } from '@testing-library/react'
import PlanDataCard from '../PlanDataCard';

describe('PlanDataCard component', () => {
  it('should render without issues', () => {
    const { container } = render(<PlanDataCard />)
    expect(container).toMatchSnapshot()
  })
})
