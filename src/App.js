import React, { useState, useEffect } from "react";
import "./styles.css";
import Canvas from "./Canvas";
import Photo from "./Photo";
import Header from "./Header";
import Credits from "./Credits";
import Footer from "./Footer";
import bootstrap from "bootstrap"; // eslint-disable-line no-unused-vars
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Container, Button, Navbar } from "react-bootstrap";

export default function App() {
  let [queriedImages, setQueriedImages] = useState([]);
  let [imageURL, setImageURL] = useState("");
  let [pageURL, setPageURL] = useState("");
  let [credits, setCredits] = useState("");
  let [isDrawing, setIsDrawing] = useState(false);
  let [query, setQuery] = useState("");
  let [isPhotoHidden, setIsPhotoHidden] = useState(false);
  let [isCanvasHidden, setIsCanvasHidden] = useState(false);

  let randInt = 0;
  //let floatingPhotos = <div/>

  //TODO: add loading screen

  const url = "https://pixabay.com/api/?";
  const key = "17250054-9a24b7d53aefd7414a31696cd";
  const type = "photo";

  useEffect(() => {
    loadImages();
  }, [query]);

  function handleChange(event) {
    switch (event.target.name) {
      case "queryInput":
        setQuery(event.target.value);
        break;
      default:
    }
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      console.log(query);
      displayImage();
    }
  }

  function handleClick(event) {
    switch (event.target.name) {
      case "getImage":
        console.log(query);
        displayImage();
        break;
      case "setQuery":
        console.log(query);
        break;
      case "hidePhoto":
        setIsPhotoHidden(prevState => !prevState);
        console.log(isPhotoHidden);
        break;
      case "hideCanvas":
        setIsCanvasHidden(prevState => !prevState);
        console.log(isPhotoHidden);
        break;
      default:
        console.log(event.target.name);
    }
  }

  function displayImage() {
    queriedImages.length === 0
      ? (randInt = 0)
      : (randInt = getRandInt(queriedImages.hits.length));
    loadImages();
    try {
      setImageURL(queriedImages.hits[randInt].largeImageURL);
      setCredits(queriedImages.hits[randInt].user);
      setPageURL(queriedImages.hits[randInt].pageURL);
    } catch (err) {
      alert("No search results found");
    }
  }

  function loadImages() {
    let fullURL = "";
    query
      ? (fullURL =
          url + "key=" + key + "&q=" + query + "&image_type=" + type + "page=6")
      : (fullURL = url + "key=" + key + "&image_type=" + type);

    fetch(fullURL)
      .then(response => response.json())
      .then(data => setQueriedImages(data))
      .catch(error => {
        console.error(error);
      });
    console.log(queriedImages);
    //console.log(queriedImages.hits[randInt].largeImageURL)
    //setImageURL(fetchedData.hits[randInt -1].largeImageURL)
    //if (queriedImages.length !== 0) {
    //console.log(queriedImages.length)
    //floatingPhotos = queriedImages.hits.map((imgURL) => <img src = {imgURL.largeImageURL} alt="lmao"></img>)
    //}
  }
  function getRandInt(maxInt) {
    return Math.floor(Math.random() * maxInt);
  }
  //setImageURL(fetchedData.hits[0].largeImageURL);
  //<Photo imageURL={imageURL} />
  //<input onChange = {handleChange}/>
  //{

  return (
    <React.Fragment>
      <Container fluid>
        <Navbar bg="dark" expand="lg" className="mr-auto" fluid>
          <Header onClick={handleClick} />
          <Button
            variant="success"
            name="getImage"
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            className="mr-sm-2"
          >
            Get Photo
          </Button>
          <input
            name="queryInput"
            onChange={handleChange}
            onKeyPress={handleKeyDown}
            placeholder="Enter search terms here"
            className="mr-sm-2"
          />
          <div className="queryOutput">{query}</div>
        </Navbar>
      </Container>
      <Container className="my-auto CanvasContainer" fluid>
        {isPhotoHidden ? null : <Photo imageURL={imageURL} />}
        {isCanvasHidden ? null : (
          <Canvas isDrawing={isDrawing} setIsDrawing={setIsDrawing} />
        )}
      </Container>
      {imageURL === "" || isPhotoHidden ? null : (
        <Credits credits={credits} pageURL={pageURL} />
      )}
      <Footer />
    </React.Fragment>
  );
}
