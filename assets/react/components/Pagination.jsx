import React from "react";

const Pagination = ({currentPage, itemsPerPage, length, onPageChanged}) => {

    const pagesCount = Math.ceil(length / itemsPerPage);
    let pages = [];
    const start = (currentPage * itemsPerPage - itemsPerPage) + 1;
    const end = start - 1 + itemsPerPage;

    if(pagesCount > 10) {
        const array1 = [1, 2, 3, 4]
        const array2 = [pagesCount-3, pagesCount-2, pagesCount-1, pagesCount]
        if(array1.includes(currentPage)){
            pages = [1, 2, 3, 4, 'XX1', pagesCount-1, pagesCount]
        } else if (array2.includes(currentPage)) {
            pages = [1, 2, 'XX1', pagesCount-3, pagesCount-2, pagesCount-1, pagesCount]
        } else {
            pages = [1, 2, 'XX1', currentPage-1, currentPage, currentPage+1, 'XX2', pagesCount-1, pagesCount]
        }
    } else {
        for(let i = 1; i <= pagesCount; i++) {
            pages.push(i)
        }
    }

    const handlePageChange = (page, event) => {
        event.preventDefault();
        setcurrentPage(page);
    }

    return (
        <>
            <div className="navigation text-center">
                <ul className="pagination">
                    {currentPage === 1 &&
                        <li className={"prev disabled"}>
                            <a className="page-link">
                                <i className="fa fw fa-arrow-left"></i>
                            </a>
                        </li>
                    }
                    {currentPage !== 1 &&
                        <li className={"prev"}>
                            <a className="page-link" onClick={() => onPageChanged(currentPage - 1)}>
                                <i className="fa fw fa-arrow-left"></i>
                            </a>
                        </li>
                    }

                    {pages.map(page => {
                        if(page === 'XX1' || page === 'XX2'){
                            return (
                                <li key={page} className={"page-item disabled"}>
                                    <a className="page-link">...</a>
                                </li>
                            )
                        }
                        return (
                            <li key={page} className={"page-item" + (currentPage === page && " active")}>
                                <a className="page-link" onClick={() => onPageChanged(page)}>{page}</a>
                            </li>
                        )
                    })}

                    {currentPage === pagesCount &&
                        <li className={"next disabled"}>
                            <a className="page-link">
                                <i className="fa fw fa-arrow-right"></i>
                            </a>
                        </li>
                    }
                    {currentPage !== pagesCount &&
                        <li className={"next"}>
                            <a className="page-link" onClick={() => onPageChanged(currentPage + 1)}>
                                <i className="fa fw fa-arrow-right"></i>
                            </a>
                        </li>
                    }
                </ul>
            </div>

            <span className={"mt-2"}>Afficher {start}-{end} sur {length}</span>
        </>
    );
};

Pagination.getData = (items, currentPage, itemsPerPage) => {
    const start = currentPage * itemsPerPage - itemsPerPage;
    return items.slice(start, start + itemsPerPage);
}

export default Pagination;