export interface NoResultsProps {
  selectedCategory: string
}

export function NoResults({ selectedCategory }: NoResultsProps): React.ReactElement {
  const message =
    selectedCategory === 'all' ? 'No results found.' : 'No results found within selected category.'

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="text-center max-w-md">
        {/* Icon */}
        <div className="mb-4 flex justify-center">
          <svg
            className="w-16 h-16 text-neutral-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {/* Message */}
        <h3 className="text-xl font-semibold text-neutral-900 mb-2">No Products Found</h3>
        <p className="text-neutral-600">{message}</p>

        {/* Suggestion */}
        <p className="text-sm text-neutral-500 mt-4">
          Try adjusting your search or filter criteria to find what you&apos;re looking for.
        </p>
      </div>
    </div>
  )
}
