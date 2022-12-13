import React from 'react';
import { NewsText } from '../../Components';

import './newsBlock.css';

const NewsBlock = (props) => {

  const news = props.news;

  const NewsMap = () => {
    return news.map( (res,i) => {
      return <NewsText obj={res} key={i} />;
    });
  };

  return ( 
    <div className="block" dir="rtl" lang="ar" >
      {NewsMap()}
      {/*<NewsText 
        title="NEWS1"
        date="22/11/2022"
        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sodales posuere felis non efficitur. Mauris mollis elit urna, id tempus... 
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sodales posuere felis non efficitur. Mauris mollis elit urna, id tempus...
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sodales posuere felis non efficitur. Mauris mollis elit urna, id tempus...&nbsp;&nbsp;"
        main_image="https://picsum.photos/200"
        source="#"
      />
      <NewsText 
        title="NEWS1"
        date="22/11/2022"
        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sodales posuere felis non efficitur. Mauris mollis elit urna, id tempus... &nbsp;&nbsp;"
        main_image="https://picsum.photos/200"
        source="#"
      />*/}
    </div> 
  )
}

export default NewsBlock
