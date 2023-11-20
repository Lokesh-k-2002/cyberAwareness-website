import React, { useEffect, useState } from "react";
import axios from "axios";
import "./index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";

function App() {
  return (
    <div className="App">
      <Head />
      <News />
    </div>
  );
}
function Head() {
  return (
    <header className="head">
      <h1>Cyber Awareness</h1>
      <nav>
        <ul>
          <li>
            <a href="#home">Home</a>
          </li>
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#tips">Cyber Tips</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

//
//
function News() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const apiKey = "91a00cd0716e472aa1a6d217444f24eb";
    const apiUrl = "https://newsapi.org/v2/everything";
    const keywords =
      'cybersecurity OR hackers OR vulnerabilities OR malware OR "banking scams" OR frauds';

    const options = {
      method: "GET",
      url: apiUrl,
      params: {
        q: keywords,
        apiKey: apiKey,
      },
    };

    axios(options)
      .then((response) => {
        const cybersecurityNews = response.data.articles.filter(
          (article) =>
            article.title.toLowerCase().includes("cybersecurity") ||
            article.description.toLowerCase().includes("cybersecurity") ||
            article.content.toLowerCase().includes("cybersecurity") ||
            article.title.toLowerCase().includes("malware") ||
            article.description.toLowerCase().includes("malware") ||
            article.content.toLowerCase().includes("malware") ||
            article.title.toLowerCase().includes("vulnerabilities") ||
            article.description.toLowerCase().includes("vulnerabilities") ||
            article.content.toLowerCase().includes("vulnerabilities") ||
            article.title.toLowerCase().includes("hackers") ||
            article.description.toLowerCase().includes("hackers") ||
            article.content.toLowerCase().includes("hackers") ||
            article.title.toLowerCase().includes("banking scams") ||
            article.description.toLowerCase().includes("banking scams") ||
            article.content.toLowerCase().includes("banking scams") ||
            article.title.toLowerCase().includes("frauds") ||
            article.description.toLowerCase().includes("frauds") ||
            article.content.toLowerCase().includes("frauds")
        );

        setNews(cybersecurityNews);

        console.log(cybersecurityNews);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  ////
  const batchSize = 4;
  const [startIndex, setStartIndex] = useState(0);
  const endIndex = startIndex + batchSize;

  const currentBatch = news.slice(startIndex, endIndex);

  const handleNextClick = () => {
    if (endIndex < news.length) {
      setTimeout(() => {
        setStartIndex(endIndex);
      }, 500);
    }
  };
  const handlePrevClick = () => {
    if (startIndex >= batchSize) {
      setTimeout(() => {
        setStartIndex(startIndex - batchSize);
      }, 500);
    }
  };

  const [aIndex, setaIndex] = useState(0);
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (aIndex + 4 < news.length) {
        setaIndex((prevIndex) => prevIndex + 4);
      } else {
        setaIndex(0);
      }
    }, 5000);

    return () => clearInterval(intervalId);
  }, [aIndex, news.length]);

  const cBatch = news.slice(aIndex, aIndex + 4);

  return (
    <div className="no">
      <h1>&nbsp;&nbsp;&nbsp;Latest News</h1>

      <div className="newsout">
        <button className="next" onClick={handleNextClick}>
          <span>
            <img
              className="nimg"
              style={{ width: "30px", height: "30px" }}
              src="images/nimg.jpg"
              alt=""
            />
          </span>
        </button>
        <button className="prev" onClick={handlePrevClick}>
          <span>
            <img
              className="pimg"
              style={{
                width: "30px",
                height: "30px",
                marginRight: "200px",
              }}
              src="images/pimg.jpg"
              alt=""
            />
          </span>
        </button>
        {currentBatch.map((article, index) => (
          <New
            author={article.source.name}
            desc={article.title}
            img={article.urlToImage}
            url={article.url}
          />
        ))}
        {cBatch.map((article, index) => (
          <New
            author={article.source.name}
            desc={article.title}
            img={article.urlToImage}
            url={article.url}
          />
        ))}
      </div>
    </div>
  );
}

//////////////

function New(props) {
  const [like, setLike] = useState(0);
  const [dislike, setDislike] = useState(0);

  function llike() {
    setLike(like + 1);
  }
  function ddislike() {
    setDislike(dislike - 1);
  }
  return (
    <div className="nnn">
      <li
        className="news-template"
        style={{
          backgroundImage: props.img !== "" ? `url(${props.img})` : "none",
        }}
      >
        <a href={props.url}>
          <div className="content">
            <h2>Source: {props.author}</h2>
            <h1>{props.desc}</h1>
          </div>
        </a>
        <div className="b2">
          <button className="b2b1" onClick={llike}>
            <FontAwesomeIcon icon={faThumbsUp} />
          </button>
          <span>{like}</span>
          <button className="b2b2" onClick={ddislike}>
            <FontAwesomeIcon icon={faThumbsDown} />
          </button>
          <span>{Math.abs(dislike)}</span>
        </div>
      </li>
    </div>
  );
}

export default App;
