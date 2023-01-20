import './style.css'
import { Card } from '../Card'
import { Dropdown } from '../Dropdown'
import { Pagination } from '../Pagination'
import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { getHackerNews } from '../../Services'
import { addFavoriteNews, getFavoriteNews, removeFavoriteNews } from '../../redux/slices/slice'
import angularimg from '../../assets/angularimg.png'
import reactimg from '../../assets/reactimg.png'
import vueimg from '../../assets/vueimg.png'
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { DropdownItem } from '../Dropdown/dropItem'


const selectFilterOptions = ['Angular', 'React', 'Vue']

export const News = () =>{
    const dispatch = useAppDispatch();
    const {actualNews, favoriteNews, loading, msg} = useAppSelector( state => state.news);
    const {nbPages, hitsPerPage, hits: newsList = []} = actualNews;
  
    const [selectedFilter, setSelectedFilter] = useState(localStorage.getItem('selectedFilter') || null);
    const [currentPage, setCurrentPage] = useState<number>(1);
  
    useEffect( () => {
      const args = {
        query: selectedFilter,
        page: currentPage,
      };
      dispatch(getHackerNews(args));
    }, [currentPage, selectedFilter]);
  
    useEffect( () => {
      dispatch(getFavoriteNews());
    }, []);
  
    const handleFilterSelection = (filter: string) => {
      localStorage.setItem('selectedFilter', filter);
      setSelectedFilter(filter);
    };
  
    const handleFavoriteNews = (value: any) => {
      if (value.isFav) {
        const favNews = newsList.find( news => news.objectID === value.id);
        dispatch(addFavoriteNews(favNews));
      } else {
        dispatch(removeFavoriteNews(value.id));
      }
    };
    return (
        <>
        <div className='dropdown'>
            <Dropdown selectedValue={selectedFilter??'Select your news'}className ='dropdowContainer' >
            
                {selectFilterOptions.map(filter =>
                    <DropdownItem key={filter} value={filter} current={selectedFilter} onItemClick={()=>handleFilterSelection(filter)} >
                       <img src={filter ==='Angular'?angularimg: filter === 'React'? reactimg :  vueimg} alt ={filter}/>
                       {filter} 
                    </DropdownItem>)}
                 
            </Dropdown>
        </div>
        <div className='card'>
          {newsList.map(news =>(
            <a href={news.story_url} key ={news.objectID}>
                <Card news={news} favoriteNews={favoriteNews} actionClick = {value=>handleFavoriteNews(value)}/>
            </a>
          ))  }
           
        </div>
        <div className='pagination'>
            <Pagination className='pagnationContainer'
            currentPage={currentPage}
            totalCount={nbPages*hitsPerPage}
            pageSize= {nbPages}
            onPageChange ={page => setCurrentPage(page)}
            />
        </div>
        </>
    )
  
      };
