import React from "react";
import "./News.css";

const News = () => {
  // Example real news articles with URLs for images
  const newsData = [
    {
      id: 1,
      title: "The Little Mermaid: Live-Action Remake Makes a Splash",
      category: "Movie News",
      date: "May 25, 2023",
      author: "Variety",
      link: "https://tuoitre.vn/venom-3-chuyen-phieu-luu-cuoi-cua-venom-truoc-khi-ve-mcu-20240604114240621.htm",
      image:
        "https://cdn.tuoitre.vn/zoom/260_163/471584752817336320/2024/6/4/spider-man-4-venom-crossover-symbiote-suit-tom-holland-phase-five-mcu-1717475320136828532644-0-111-900-1551-crop-17174758208481011802538.jpg",
    },
    {
      id: 2,
      title: "Dune: Part Two Official Trailer Released",
      category: "Trailers",
      date: "June 7, 2023",
      author: "Hollywood Reporter",
      link: "https://cuoi.tuoitre.vn/spider-man-bat-ngo-tro-thanh-phan-dien-trong-madame-web-20231117154653322.htm",
      image:
        "https://cdn.tuoitre.vn/zoom/260_163/471584752817336320/2023/11/17/project-20220203-1525434-01-1200x640-17002103707772045212670-0-113-640-1137-crop-1700210376564736310451.png",
    },
    {
      id: 3,
      title: "2023 Oscar Nominations: Full List of Nominees",
      category: "Awards",
      date: "March 15, 2023",
      author: "Deadline",
      link: "https://tuoitre.vn/spider-man-no-way-home-dat-doanh-thu-lich-su-thoi-covid-19-587-trieu-usd-20211220092133183.htm",
      image:
        "https://cdn.tuoitre.vn/zoom/260_163/1200/900/ttc/r/2021/12/22/bo-ba-nguoi-nhen1-1640168240-1200x627.jpeg",
    },
  ];

  return (
    <div className="news">
      <div className="news-container">
        <div className="title">
          <h1 style={{fontWeight:'bold'}}>News</h1>
        </div>
        <div className="post">
          {newsData.map((news) => (
            <div key={news.id} className="child-post">
              <a href={news.link} target="_blank" rel="noopener noreferrer">
                <img src={news.image} alt={news.title} />
                <div className="post-category">
                  <span>{news.category}</span>
                </div>
                <span>{news.title}</span>
                <div className="more-info-post">
                  <div>
                    <p className="date">{news.date}</p>
                  </div>
                  <div className="divider"></div>
                  <div>
                    <p className="author">{news.author}</p>
                  </div>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default News;
