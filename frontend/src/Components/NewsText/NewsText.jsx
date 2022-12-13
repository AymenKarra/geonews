import React from 'react';
import './newsText.css';
import defaultImage from '../../assets/default-news.png';

{/*const NewsText = (props) => {
    return (
        <div>
            <div className="title"><h4>{props.title}</h4></div>
            <div className="date"><h6>posted on {props.date}</h6></div>
            <div className="image"><img src={props.main_image} alt=""/></div>
            <div className="text"><p>{props.text}</p></div>
            <div className="source"><a href={props.source}>Read More</a></div>
        </div>
    );
} */}

const NewsText = (props) => {
    const {_id, title, location, date, url, content, media, coordenates} = props.obj;
    return (
        <div className="news-card">
            <img src={media==null? defaultImage:media[0]} alt="" />
            <div className="title-overlay">
                <h3>{title}</h3>
            </div>
            <p class="date">{date + ", " + location}</p>
            <p>{content}</p>
            <a href={url}>Read More</a>
            <hr></hr>
        </div>
    )
}



export default NewsText;