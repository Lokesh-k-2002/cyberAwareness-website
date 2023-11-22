import React, { useEffect, useState } from "react";
import axios from "axios";
import { SiCyberdefenders } from "react-icons/si";
import { FaArrowRight } from "react-icons/fa6";
import { FaInstagramSquare } from "react-icons/fa";
import { FaDiscord } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { MdCall } from "react-icons/md";
import { IoMdMailUnread } from "react-icons/io";
import { FaCopyright } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import "./index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";

function App() {
  return (
    <div className="App">
      <Head />
      <News />
      <Content />
      <Footer />
    </div>
  );
}
function Head() {
  return (
    <header className="header">
      <span className="pic">
        <SiCyberdefenders />
      </span>
      <h1>CYBER AWARENESS</h1>
      <nav class="navbar">
        <ul class="navbar-lists">
          <li>
            <a className="navbar-link home-link" href="#">
              Home
            </a>
          </li>
          <li>
            <a className="navbar-link about-link" href="#">
              About
            </a>
          </li>
          <li>
            <a className="navbar-link service-link" href="#">
              Cyber Tips
            </a>
          </li>
          <li>
            <a className="navbar-link service-link" href="#">
              Cyber Laws
            </a>
          </li>
          <li>
            <a className="navbar-link portfolio-link" href="#">
              Contact
            </a>
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
      <h1
        style={{
          fontSize: "15px",
          borderTop: "2px solid black",
          borderBottom: "2px solid black",
        }}
      >
        &nbsp;&nbsp;&nbsp;Latest News&nbsp;&nbsp;&nbsp;Trending
        &nbsp;&nbsp;&nbsp;Top{" "}
      </h1>
      <div className="newsout">
        <button className="next" onClick={handleNextClick}>
          <span>
            <img
              className="nimg"
              style={{ width: "30px", height: "30px" }}
              src="images/nimg.jpg"
              alt="n"
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
              alt="p"
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
        <a href={props.url} target="_blank">
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

function Content() {
  return <div className="con"></div>;
}
function Footer() {
  return (
    <footer className="section section-footer ">
      <div className="container grid grid-four-col">
        <div className="f-about">
          <h3>About</h3>
          <p>
            At Cyber Awareness, we are dedicated to fostering a safer digital
            world. Our mission is to empower individuals and businesses with the
            knowledge and tools necessary to navigate the complexities of the
            online landscape securely. With a team of cybersecurity experts, we
            strive to make cyber awareness accessible through user-friendly
            education and community engagement. Join us in creating a culture of
            informed and vigilant digital citizens
          </p>
        </div>

        <div className="f-links">
          <h3>Links</h3>
          <ul>
            <li>
              <span>
                <FaArrowRight />
              </span>
              <a href="#">home</a>
            </li>
            <li>
              <span>
                <FaArrowRight />
              </span>
              <a href="#">about</a>
            </li>
            <li>
              <span>
                <FaArrowRight />
              </span>
              <a href="#">Cyber Tips</a>
            </li>
            <li>
              <span>
                <FaArrowRight />
              </span>
              <a href="#">Cyber Laws</a>
            </li>
            <li>
              <span>
                <FaArrowRight />
              </span>
              <a href="#">contact</a>
            </li>
          </ul>
        </div>
        <div class="f-services">
          <h3>Services</h3>
          <ul>
            <li>
              <span>
                <FaArrowRight />
              </span>
              <a href="#">Cybersecurity Training Programs</a>
            </li>
            <li>
              <span>
                <FaArrowRight />
              </span>
              <a href="#">Workshops and Seminars</a>
            </li>
            <li>
              <span>
                <FaArrowRight />
              </span>
              <a href="#">Cybersecurity Consultations</a>
            </li>

            <li>
              <span>
                <FaArrowRight />
              </span>
              <a href="#">Cybersecurity Awareness Campaigns:</a>
            </li>
            <li>
              <span>
                <FaArrowRight />
              </span>
              <a href="#">Certification Programs</a>
            </li>
            <li>
              <span>
                <FaArrowRight />
              </span>
              <a href="#">Family and Child Online Safety Workshops</a>
            </li>
            <li>
              <span>
                <FaArrowRight />
              </span>
              <a href="#">Secure Software Development Practices</a>
            </li>
          </ul>
        </div>
        <div className="f-address">
          <h3>Have a Questions?</h3>
          <address>
            <div>
              <p>
                {" "}
                <span>
                  <FaLocationDot />
                </span>{" "}
                Bengaluru, India{" "}
              </p>
            </div>

            <div>
              <p>
                {" "}
                <span>
                  <MdCall />
                </span>{" "}
                <a href="tel:+91123456789"> +91 987654321 </a>
              </p>
            </div>

            <div>
              <p>
                {" "}
                <span>
                  <IoMdMailUnread />
                </span>{" "}
                <a href="mailto:vaishnavanilkumar1@gmail.com">
                  {" "}
                  cyber@security.com{" "}
                </a>{" "}
              </p>
            </div>
          </address>
        </div>
      </div>

      <div className="container">
        <div className="f-social-icons">
          <h1>FOLLOW US ON</h1>
          <a href="#" className="logo">
            <span>
              <FaInstagramSquare />
            </span>
          </a>

          <a href="#" className="logo">
            <span>
              <FaDiscord />
            </span>
          </a>
          <a href="#" className="logo">
            <span>
              <FaYoutube />
            </span>
          </a>
          <a href="#" className="logo">
            <span>
              <FaLinkedin />
            </span>
          </a>
          <a href="#" className="logo">
            <span>
              <FaXTwitter />
            </span>
          </a>
        </div>

        <div className="f-credits">
          <p>
            Copyright{" "}
            <span>
              <FaCopyright />
            </span>{" "}
            2023 All rights reserved | MAJOR Project{" "}
            <span>
              {" "}
              <SiCyberdefenders />
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default App;
