import React from "react";
import { Container, Image } from "react-bootstrap";

export default function Photo(props) {
  return (
    <Container className = "my-auto">
    <Image
      src={props.imageURL}
      className="Photo mt-5 mx-auto"
      alt="Click 'get photo' to load an image"
    />
    </Container>
  );
}
