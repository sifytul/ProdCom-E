import { screen, render } from '@testing-library/react'
import PromotionBanner from '@/components/shared/banner/PromotionBanner'


describe('PromotionBanner', () => {
  it('renders PromotionBanner component', () => {
    render(<PromotionBanner />)
    expect(screen.getByText(/promotion/i)).toBeInTheDocument()
  })
})