'use client'

import { useState, useEffect, useRef } from 'react'

export type SortOption = 'default' | 'price-asc' | 'price-desc'

export interface ProductSortProps {
  selectedSort: SortOption
  onSortChange: (sort: SortOption) => void
}

const SORT_OPTIONS = [
  { value: 'price-desc' as const, label: 'Most Expensive' },
  { value: 'price-asc' as const, label: 'Cheapest' },
]

export function ProductSort({ selectedSort, onSortChange }: ProductSortProps): React.ReactElement {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const getSortLabel = (sort: SortOption): string => {
    const option = SORT_OPTIONS.find((opt) => opt.value === sort)
    return option?.label ?? 'Sort by'
  }

  const handleOptionClick = (value: SortOption): void => {
    onSortChange(value)
    setIsOpen(false)
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="true"
        aria-expanded={isOpen}
        className="px-4 py-2 text-sm font-medium text-neutral-700 bg-white border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors flex items-center gap-2"
      >
        {getSortLabel(selectedSort)}
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-neutral-200 rounded-lg shadow-lg z-10">
          <div className="py-1">
            {SORT_OPTIONS.map((option) => (
              <button
                key={option.value}
                onClick={() => handleOptionClick(option.value)}
                aria-current={selectedSort === option.value ? 'true' : undefined}
                className="w-full px-4 py-2 text-left text-sm text-neutral-700 hover:bg-neutral-50 transition-colors flex items-center justify-between"
              >
                <span>{option.label}</span>
                {selectedSort === option.value && (
                  <svg
                    className="w-4 h-4 text-primary-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
