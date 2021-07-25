import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Spinner } from "reactstrap";

function App() {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [loader, setLoader] = useState(false);

  const fetchQuote = () => {
    // $(".loader").remove("hide");
    setLoader(true);
    axios
      .get("https://type.fit/api/quotes")
      .then((res) => {
        const { data } = res;
        const num = Math.floor(Math.random() * data.length);
        console.log("Number is ", num);
        console.log(data);
        const item = data[num];
        // $(".loader").add("hide");
        setLoader(false);
        setQuote(item.text);
        setAuthor(item.author);
        console.log(quote);
        console.log(author);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <div className="App ">
      {!loader && (
        <div className="containere">
          <i className="fas fa-quote-left"></i>
          <h1 className=" blockquote quote">{quote}</h1>
          <i className="fas fa-quote-right "></i>
          <hr />
          <h1 className="display-5 ">{author}</h1>

          <div className="row">
            <div className="col col-md-6">
              <button
                className="btn btn-info twitter-share-button"
                onClick={() =>
                  window.open(
                    `https://twitter.com/intent/tweet?text=${quote} - ${author}`,
                    "_blank"
                  )
                }
              >
                Tweet
              </button>
            </div>
            <div className="col col-md-6">
              <button className="btn btn-info" onClick={fetchQuote}>
                Next
              </button>
            </div>
          </div>
        </div>
      )}
      {loader && (
        <Spinner
          type="grow"
          color="info"
          style={{ width: "6rem", height: "6rem" }}
        />
      )}
    </div>
  );
}

export default App;
// <div class="loader">
//         <img src="./assets/loader.svg" alt="loader" />
//       </div>
// <button className="demo">
//         <span>Hello</span>
//       </button>
