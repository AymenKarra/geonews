import React from 'react';

import {NewsController, NewsBlock } from './Containers';
import {Header} from './Components';

import axios from 'axios';
import { useState } from 'react';

import './App.css';

function App() {

  const InitialPosition = [34.522852, 9.563302];

  const [news, setNews] = useState([])

  const handleClick =  (url) => {
     axios.get(url)
    .then(({data}) => {
        console.log(data);
        setNews(data);

      })
    .catch((e) => {
      console.error(`An error occurred: ${e}`)
    });
    console.log(news);
  };
  
  return (
    <div className="App">
      <div className="header">
        <Header />
      </div>
      <div className="interface">
        <div className="left-block">
          <NewsBlock news={news}/>
        </div>
        <div className="right-block">
          <NewsController position={InitialPosition} onClick={handleClick}/>
        </div>
      </div>   
    </div>
  );
}



export default App;
