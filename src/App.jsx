// import logo from './logo.svg';
import { useState, useEffect } from "react";
import moment from "moment";
import "./App.css";
import axios from "axios";

function App() {
  const [cityName, setCityName] = useState("");
  const [data, setData] = useState([]); // screen render state
  const [isLoading, setIsLoading] = useState(
    <img src="https://gifimage.net/wp-content/uploads/2018/11/loading-gif-free-download-8.gif" />,
    false
  );

  // ================================================ tranding news =========================================

  useEffect(() => {
    const trandingNews = () => {
      const options = {
        method: "GET",
        url: "https://bing-news-search1.p.rapidapi.com/news",
        params: { safeSearch: "Off", textFormat: "Raw" },
        headers: {
          "X-BingApis-SDK": "true",
          "X-RapidAPI-Key":
            "058ef98b74msh3901c614803d0e2p13d2efjsne80ec4e4d871",
          "X-RapidAPI-Host": "bing-news-search1.p.rapidapi.com",
        },
      };
      setIsLoading(true);
      axios
        .request(options)
        .then(function (response) {
          setIsLoading(false);
          setData(response.data.value);

          console.log(response.data);
        })
        .catch(function (error) {
          setIsLoading(false);

          console.error(error);
        });
    };
    trandingNews();
  }, []);

  // =================================================== search news ========================================

  const getNews = (e) => {
    e.preventDefault();

    const options = {
      method: "GET",
      url: "https://bing-news-search1.p.rapidapi.com/news/search",
      params: {
        q: cityName,
        freshness: "Day",
        textFormat: "Raw",
        safeSearch: "Off",
      },
      headers: {
        "X-BingApis-SDK": "true",
        "X-RapidAPI-Key": "058ef98b74msh3901c614803d0e2p13d2efjsne80ec4e4d871",
        "X-RapidAPI-Host": "bing-news-search1.p.rapidapi.com",
      },
    };

    setIsLoading(true);

    axios
      .request(options)

      .then(function (response) {
        setIsLoading(false);

        console.log(response.data.value);
        setData(response.data.value);
      })
      .catch(function (error) {
        setIsLoading(false);

        console.error(error);
      });
  };

  // ====================================================  data render ====================================

  return (
    <div>
      {/* ====================================== navbar ====================================================== */}

      <nav className="navbar navbar-expand-lg bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Latest News
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-3 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link mx-3" aria-current="page" href="#">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link mx-3" href="#">
                  Services
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link mx-3">About</a>
              </li>
            </ul>
            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button
                className="btn btn-outline-primary"
                type="submit"
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>

      {/* =====================================  search bar ================================================== */}
      <form onSubmit={getNews}>
        <input
          className="form my-5"
          // id="exampleInputEmail1"
          placeholder="search news"
          aria-describedby="emailHelp"
          onChange={(e) => {
            setCityName(e.target.value);
          }}
        />
        <button type="submit" className="btn btn-primary mx-3">
          Get News
        </button>
      </form>

      {/* ===================================== render div main ============================================ */}

      <div>
        <div className="loader">
          {isLoading ? (
            <img
              className="img-fluid"
              src="https://gifimage.net/wp-content/uploads/2018/11/loading-gif-free-download-8.gif"
            />
          ) : (
            ""
          )}
        </div>
        {data.map((eachPost) => (
          <div key={eachPost?.name} className={"news"}>
            <h3>{eachPost?.name}</h3>
            <p>{eachPost?.description}</p>
            <p>
              {moment(eachPost?.datePublished).format(" Do MMMM YYYY, h:mm:")}
            </p>

            <a href={eachPost?.url} target="_blank" rel="noreferrer">
              <button className="btn btn-success">Read more...</button>
            </a>

            <div className="image">
              <img
                className="img-fluid my-3"
                src={eachPost?.image?.thumbnail?.contentUrl
                  ?.replace("&pid=News", "")
                  .replace("pid=News&", "")
                  .replace("pid=News", "")}
                alt=""
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
