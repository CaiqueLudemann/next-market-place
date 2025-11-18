import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Pagination } from '@/components/Pagination'

describe('Pagination', () => {
  it('should render pagination with correct page numbers', () => {
    const onPageChange = vi.fn()
    render(<Pagination currentPage={1} totalPages={5} onPageChange={onPageChange} />)

    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
    expect(screen.getByText('3')).toBeInTheDocument()
    expect(screen.getByText('4')).toBeInTheDocument()
    expect(screen.getByText('5')).toBeInTheDocument()
  })

  it('should highlight current page', () => {
    const onPageChange = vi.fn()
    render(<Pagination currentPage={3} totalPages={5} onPageChange={onPageChange} />)

    const currentPageButton = screen.getByRole('button', { name: 'Go to page 3' })
    expect(currentPageButton).toHaveAttribute('aria-current', 'page')
  })

  it('should disable previous button on first page', () => {
    const onPageChange = vi.fn()
    render(<Pagination currentPage={1} totalPages={5} onPageChange={onPageChange} />)

    const prevButton = screen.getByRole('button', { name: /previous/i })
    expect(prevButton).toBeDisabled()
  })

  it('should disable next button on last page', () => {
    const onPageChange = vi.fn()
    render(<Pagination currentPage={5} totalPages={5} onPageChange={onPageChange} />)

    const nextButton = screen.getByRole('button', { name: /next/i })
    expect(nextButton).toBeDisabled()
  })

  it('should call onPageChange when clicking page number', async () => {
    const user = userEvent.setup()
    const onPageChange = vi.fn()
    render(<Pagination currentPage={1} totalPages={5} onPageChange={onPageChange} />)

    const page3Button = screen.getByRole('button', { name: 'Go to page 3' })
    await user.click(page3Button)

    expect(onPageChange).toHaveBeenCalledWith(3)
  })

  it('should call onPageChange when clicking next button', async () => {
    const user = userEvent.setup()
    const onPageChange = vi.fn()
    render(<Pagination currentPage={2} totalPages={5} onPageChange={onPageChange} />)

    const nextButton = screen.getByRole('button', { name: /next/i })
    await user.click(nextButton)

    expect(onPageChange).toHaveBeenCalledWith(3)
  })

  it('should call onPageChange when clicking previous button', async () => {
    const user = userEvent.setup()
    const onPageChange = vi.fn()
    render(<Pagination currentPage={3} totalPages={5} onPageChange={onPageChange} />)

    const prevButton = screen.getByRole('button', { name: /previous/i })
    await user.click(prevButton)

    expect(onPageChange).toHaveBeenCalledWith(2)
  })

  it('should not call onPageChange when clicking current page', async () => {
    const user = userEvent.setup()
    const onPageChange = vi.fn()
    render(<Pagination currentPage={3} totalPages={5} onPageChange={onPageChange} />)

    const currentPageButton = screen.getByRole('button', { name: 'Go to page 3' })
    await user.click(currentPageButton)

    expect(onPageChange).not.toHaveBeenCalled()
  })

  it('should render ellipsis for large page counts', () => {
    const onPageChange = vi.fn()
    render(<Pagination currentPage={5} totalPages={20} onPageChange={onPageChange} />)

    // Should show ellipsis when there are too many pages
    const ellipses = screen.getAllByText('...')
    expect(ellipses.length).toBeGreaterThan(0)
  })

  it('should not render when totalPages is 0', () => {
    const onPageChange = vi.fn()
    const { container } = render(
      <Pagination currentPage={1} totalPages={0} onPageChange={onPageChange} />
    )

    expect(container.firstChild).toBeNull()
  })

  it('should not render when totalPages is 1', () => {
    const onPageChange = vi.fn()
    const { container } = render(
      <Pagination currentPage={1} totalPages={1} onPageChange={onPageChange} />
    )

    expect(container.firstChild).toBeNull()
  })
})
