import React, {useState} from "react";
import s from "./Paginator.module.css"
import cn from "classnames"


type PaginatorPropsType = {
    pageSize: number
    totalItemsCount: number
    currentPage: number
    onPageChanged: (page: number) => void
    portionSize: number
};

const Paginator = ({pageSize, totalItemsCount, currentPage, onPageChanged, portionSize = 10}: PaginatorPropsType) => {

    let pagesCount = Math.ceil(totalItemsCount / pageSize);
    let pages = [];

    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    let portionCount = Math.ceil(pagesCount / portionSize);
    let [portionNumber, setPortionNumber] = useState<number>(1);
    let leftPortionNumber = (portionNumber - 1) * portionSize + 1;
    let rightPortionNumber = portionNumber * portionSize;

    return <div className={s.paginator}>
        {portionNumber > 1 &&
		<button onClick={() => setPortionNumber(portionNumber - 1)}>Prev</button>}
        {
            pages
                .filter((p) => p >= leftPortionNumber && p <= rightPortionNumber)
                .map(p => {
                    return <span className={cn({
                        [s.selectedPage]: currentPage === p
                    }, s.pageNumber)}
                                 onClick={(e) => {
                                     onPageChanged(p)
                                 }}>{p}</span>
                })
        }
        {portionCount > portionNumber &&
		<button onClick={() => setPortionNumber(portionNumber + 1)}>Next</button>}
    </div>

}

export default Paginator
