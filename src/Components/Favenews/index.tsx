import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useEffect, useState } from "react";
import { getFavoriteNews, removeFavoriteNews } from "../../redux/slices/slice";
import { Card } from "../Card";
import { Pagination } from "../Pagination";
import './styles.css'

const favoriteNewsPerPage = 10

export const FaveNews = () =>{
    const dispatch = useAppDispatch()
    const {favoriteNews}=useAppSelector(state => state.news)
    const [currentPage , setCurrentPage] = useState <number>(1)

    useEffect(()=>{
        dispatch(getFavoriteNews)
    },[])

    const handleFavoriteNews = (value: any) =>{
        if(!value.isFav){
            dispatch(removeFavoriteNews(value.id))
            if(favoriteNews.length<=(favoriteNewsPerPage+1)){
                setCurrentPage(1)
            }
        }
    }
    return (
        <>
        <div className="favcard">
            {
                favoriteNews.slice((favoriteNewsPerPage*currentPage)-favoriteNewsPerPage, currentPage* favoriteNewsPerPage).map(news =>(
                    <a href={news.story_url} key={news.objectID}>
                        <Card news={news} favoriteNews={favoriteNews} actionClick={value =>handleFavoriteNews(value)}/>
                    </a>
                ))
            }
            {
                favoriteNews.length == 0 && 
                <h1>You Don't have favorite news</h1> 
            }
        </div>
        <div className="paginationcontainer">
            <Pagination
            className="pagination"
            currentPage={currentPage}
            totalCount={favoriteNews.length}
            pageSize={favoriteNewsPerPage}
            onPageChange = {page => setCurrentPage(page)}
            />
        </div>
        </>
    )
}