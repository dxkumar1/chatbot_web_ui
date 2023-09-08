import { render } from '@testing-library/react'
import FileMessage from '../FileMessage';

describe('FileMessage component', () => {
  it('should render without issues', () => {
    const { container } = render(<FileMessage />)
    expect(container).toMatchSnapshot()
  })
})
