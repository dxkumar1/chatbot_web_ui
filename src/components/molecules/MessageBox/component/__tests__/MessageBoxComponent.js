import { render } from '@testing-library/react'
import MessageBoxComponent from '../MessageBoxComponent';

describe('MessageBox component', () => {
  it('should render without issues', () => {
    const { container } = render(<MessageBoxComponent />)
    expect(container).toMatchSnapshot()
  })

  it('chatbubble render test', () => {
    render(<MessageBoxComponent type={'text'} user={'hi'} text={'message'} dateString={'2022-11-24'}/>);
  })
})
