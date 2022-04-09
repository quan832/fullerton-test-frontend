import React, { useState, useEffect, useCallback, Fragment } from "react";
import PropTypes from "prop-types";
// import { backButtonIcon, nextButtonIcon } from "helper/constant";

const defaultButton = props => <button {...props}>{props.children}</button>;

const Pagination = props => {
    const [visiblePages, setvisiblePages] = useState(null);
    const {
        PageButtonComponent = defaultButton,
        changeMethodFlag,
        onPageChange,
        page,
        resetMethodFlag
    } = props;
    const activePage = props.page + 1;

    const getVisiblePages = useCallback((page, total) => {
        if (total < 7) {
            return filterPages([1, 2, 3, 4, 5, 6], total);
        } else {
            if (page % 5 >= 0 && page > 4 && page + 2 < total) {
                return [1, page - 1, page, page + 1, total];
            } else if (page % 5 >= 0 && page > 4 && page + 2 >= total) {
                return [1, total - 3, total - 2, total - 1, total];
            } else {
                return [1, 2, 3, 4, 5, total];
            }
        }
    }, []);

    useEffect(() => {
        setvisiblePages(getVisiblePages(null, props.pages));
    }, [getVisiblePages, props.pages]);

    useEffect(() => {
        if (changeMethodFlag) {
            if (page === 0) {
                onPageChange(null);
                onPageChange(0);
            } else {
                onPageChange(0);
            }
            resetMethodFlag();
        }
    }, [changeMethodFlag, onPageChange, page, resetMethodFlag]);

    const filterPages = (visiblePages, totalPages) => {
        return visiblePages.filter(page => page <= totalPages);
    };

    const changePage = page => {
        const activePage = props.page + 1;

        if (page === activePage) {
            return;
        }
        const visiblePages = getVisiblePages(page, props.pages);

        setvisiblePages(filterPages(visiblePages, props.pages));
        props.onPageChange(page - 1);
    };

    return (
        <div className="pagination">
            <span className="table-text">
                Displaying of {props.rowsPerPage * activePage - (props.rowsPerPage - 1)} - {props.rowsPerPage * activePage} of {props.count} items
            </span>
            <div className="Table__pagination">
                <div className="Table__prevPageWrapper">
                    <PageButtonComponent
                        className="Table__pageButton_navigation"
                        onClick={() => {
                            if (activePage === 1) return;
                            changePage(activePage - 1);
                        }}
                        disabled={activePage === 1}
                    >
                        <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M0.761665 5.85988L0.784436 5.89071L0.814249 5.92568L0.831775 5.94395L5.05591 10.1681C5.29157 10.4038 5.67366 10.4038 5.90932 10.1681C6.13258 9.94483 6.14433 9.59016 5.94457 9.35307L5.90932 9.31469L2.7158 6.121L9.70675 6.1207C10.04 6.1207 10.3102 5.85053 10.3102 5.51725C10.3102 5.19913 10.064 4.9385 9.75179 4.91546L9.70675 4.9138L2.7152 4.91411L5.90932 1.71982C6.13258 1.49656 6.14433 1.14189 5.94457 0.904796L5.90932 0.866413C5.68606 0.643155 5.33139 0.631404 5.0943 0.831161L5.05591 0.866413L0.831775 5.09055C0.816965 5.10536 0.803086 5.12075 0.790138 5.13664L0.760858 5.17571L0.738545 5.21068L0.735349 5.21614C0.704488 5.26973 0.681561 5.32854 0.668273 5.39092L0.660151 5.43827L0.656039 5.48205L0.655029 5.51725L0.655735 5.54671L0.659078 5.58728L0.667279 5.63859L0.677837 5.68201L0.696219 5.73679L0.716632 5.78318C0.729782 5.80992 0.744853 5.83555 0.761665 5.85988Z" fill="#6B7B94" />
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M0.761665 5.85988L0.784436 5.89071L0.814249 5.92568L0.831775 5.94395L5.05591 10.1681C5.29157 10.4038 5.67366 10.4038 5.90932 10.1681C6.13258 9.94483 6.14433 9.59016 5.94457 9.35307L5.90932 9.31469L2.7158 6.121L9.70675 6.1207C10.04 6.1207 10.3102 5.85053 10.3102 5.51725C10.3102 5.19913 10.064 4.9385 9.75179 4.91546L9.70675 4.9138L2.7152 4.91411L5.90932 1.71982C6.13258 1.49656 6.14433 1.14189 5.94457 0.904796L5.90932 0.866413C5.68606 0.643155 5.33139 0.631404 5.0943 0.831161L5.05591 0.866413L0.831775 5.09055C0.816965 5.10536 0.803086 5.12075 0.790138 5.13664L0.760858 5.17571L0.738545 5.21068L0.735349 5.21614C0.704488 5.26973 0.681561 5.32854 0.668273 5.39092L0.660151 5.43827L0.656039 5.48205L0.655029 5.51725L0.655735 5.54671L0.659078 5.58728L0.667279 5.63859L0.677837 5.68201L0.696219 5.73679L0.716632 5.78318C0.729782 5.80992 0.744853 5.83555 0.761665 5.85988Z" fill="#6B7B94" />
                        </svg>
                        {/* <img src={backButtonIcon} /> */}
                    </PageButtonComponent>
                </div>
                <div className="Table__visiblePagesWrapper">
                    {visiblePages &&
                        visiblePages.map((page, index, array) => {
                            return (
                                <Fragment key={page}>
                                    {array[index - 1] + 1 < page && <button className="table-pagination-over">...</button>}
                                    <PageButtonComponent
                                        key={page}
                                        className={
                                            activePage === page
                                                ? "Table__pageButton Table__pageButton--active"
                                                : "Table__pageButton"
                                        }
                                        onClick={changePage.bind(null, page)}
                                    >
                                        {page}
                                    </PageButtonComponent>
                                </Fragment>
                            );
                        })}
                </div>
                <div className="Table__nextPageWrapper">
                    <PageButtonComponent
                        className="Table__pageButton_navigation ml-10"
                        onClick={() => {
                            if (activePage === props.pages) return;
                            changePage(activePage + 1);
                        }}
                        disabled={activePage === props.pages}
                    >
                        {/* <img src={nextButtonIcon} /> */}
                        <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M10.2382 5.85988L10.2155 5.89071L10.1856 5.92568L10.1681 5.94395L5.94398 10.1681C5.70832 10.4038 5.32624 10.4038 5.09058 10.1681C4.86732 9.94483 4.85557 9.59016 5.05533 9.35307L5.09058 9.31469L8.28409 6.121L1.29315 6.1207C0.95987 6.1207 0.689697 5.85053 0.689697 5.51725C0.689697 5.19913 0.935867 4.9385 1.24811 4.91546L1.29315 4.9138L8.2847 4.91411L5.09058 1.71982C4.86732 1.49656 4.85557 1.14189 5.05533 0.904796L5.09058 0.866413C5.31384 0.643155 5.66851 0.631404 5.9056 0.831161L5.94398 0.866413L10.1681 5.09055C10.1829 5.10536 10.1968 5.12075 10.2098 5.13664L10.239 5.17571L10.2614 5.21068L10.2645 5.21614C10.2954 5.26973 10.3183 5.32854 10.3316 5.39092L10.3397 5.43827L10.3439 5.48205L10.3449 5.51725L10.3442 5.54671L10.3408 5.58728L10.3326 5.63859L10.3221 5.68201L10.3037 5.73679L10.2833 5.78318C10.2701 5.80992 10.255 5.83555 10.2382 5.85988Z" fill="#6B7B94" />
                        </svg>
                    </PageButtonComponent>
                </div>
            </div>
        </div>
    );
};

Pagination.propTypes = {
    pages: PropTypes.number,
    page: PropTypes.number,
    PageButtonComponent: PropTypes.any,
    onPageChange: PropTypes.func,
    previousText: PropTypes.string,
    nextText: PropTypes.string
};

export default Pagination;
