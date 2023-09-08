import { render } from '@testing-library/react'
import MessageBox from '../MessageBox';

describe('MessageBox component', () => {
  it('should render without issues', () => {
    const { container } = render(<MessageBox />)
    expect(container).toMatchSnapshot()
  })

  it('chatbubble render test', () => {
    render(<MessageBox onSelect={jest.fn()} type={'text'} user={'hi'} text={'message'} dateString={'2022-11-24'}/>);
  })
})
