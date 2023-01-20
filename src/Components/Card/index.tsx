import './style.css';
import { useDateAgo } from '../../hooks';
import { MouseEvent, useMemo, useState } from 'react';
import { INews } from '../../api';
import { MdFavoriteBorder,MdFavorite, MdAlarm } from "react-icons/md";

interface CardProps {
  news: INews;
  favoriteNews: INews[];
  actionClick?: (value: any) => void;
}

export const Card = ({ news, favoriteNews, actionClick }: CardProps) => {

  const { story_title: title, author, created_at: createdAt, objectID } = news;

  const isFavoriteNews = useMemo(
    () => favoriteNews.find( news => news.objectID === objectID),
    [favoriteNews, objectID]);

  const agoTime = useDateAgo(createdAt);
  const [isFavorite, setIsFavorite] = useState(!!isFavoriteNews);

  const handleClick = (e: MouseEvent) => {
    e.preventDefault();
    setIsFavorite(!isFavorite);
  };

  return (
    <div className="card">
      <div className="cardContent">
        <div className="cardheader">
          <MdAlarm className='alarm' />
          <h1>{agoTime} by {author}</h1>
        </div>
        <p className="cardbody">{title}</p>
      </div>
      <div className="cardaction" title={`${isFavorite ? 'Remove Favorite' : 'Add to Favorite'}`}
        onClick={ (e) => {handleClick(e); actionClick && actionClick({id: objectID, isFav: !isFavorite});} }
      >
        {
          isFavorite
            ?  <MdFavorite className='heart'/>
            :<MdFavoriteBorder className='heart'/>
        }
      </div>
    </div>
  );
};