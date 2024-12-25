import './Pagination.scss'

export default function Pagination({ totalItems, itemsPerPage = 5, currentPage = 1, onPageChange }) {
    const totalPages = Math.ceil(totalItems / itemsPerPage)

    const handlePrevClick = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1)
        }
    }

    const handleNextClick = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1)
        }
    }
    
    const handleDotsClick = () => {
        const newPage = Math.min(currentPage + 3, totalPages);
        onPageChange(newPage);
    };
    
    const handleDotsClick2 = () => {
        const newPage = Math.max(currentPage - 3, 1);
        onPageChange(newPage);
    };

    const renderPageNumbers = () => {
        const pages = []

        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(
                    <button
                        key={i}
                        onClick={() => onPageChange(i)}
                        className={`Pagination__Button Pagination__Text ${currentPage === i ? 'active' : ''}`}
                    >
                        {i}
                    </button>
                )
            }
        } else {
            // Always show first page
            pages.push(
                <button
                    key={1}
                    onClick={() => onPageChange(1)}
                    className={`Pagination__Button Pagination__Text ${currentPage === 1 ? 'active' : ''}`}
                >
                    1
                </button>
            )

            // Show dots or numbers
            if (currentPage > 3) {
                pages.push(<span key={"dots1"} onClick={handleDotsClick2} className={"Pagination__Button Pagination__Text"}>...</span>)
            }

            // Show current page and neighbors
            for (let i = Math.max(2, currentPage - 2); i <= Math.min(currentPage + 2, totalPages - 1); i++) {
                pages.push(
                    <button
                        key={i}
                        onClick={() => onPageChange(i)}
                        className={`Pagination__Button Pagination__Text ${currentPage === i ? 'active' : ''}`}
                    >
                        {i}
                    </button>
                )
            }

            // Show dots before last page
            if (currentPage < totalPages - 2) {
                pages.push(<span key={"dots2"} onClick={handleDotsClick} className={"Pagination__Button Pagination__Text"}>...</span>)
            }

            // Always show last page
            pages.push(
                <button
                    key={totalPages}
                    onClick={() => onPageChange(totalPages)}
                    className={`Pagination__Button Pagination__Text ${currentPage === totalPages ? 'active' : ''}`}
                >
                    {totalPages}
                </button>
            )
        }

        return pages
    }

    return (
        <div className={"Pagination"}>
            <button
                className={"Pagination__Arrow Pagination__Text"}
                onClick={handlePrevClick}
                disabled={currentPage === 1}
            >
                &lt;
            </button>

            {renderPageNumbers()}

            <button
                className={"Pagination__Arrow Pagination__Text"}
                onClick={handleNextClick}
                disabled={currentPage === totalPages}
            >
                &gt;
            </button>
        </div>
    )
}
