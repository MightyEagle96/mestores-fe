import Carousel from "react-bootstrap/Carousel";

function MyCarousel() {
  return (
    <Carousel className="shadow-md rounded">
      <Carousel.Item>
        <img
          className="d-block w-100 rounded shadow-md"
          src="https://images.pexels.com/photos/135620/pexels-photo-135620.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt="First slide"
          height="500"
        />
        {/* <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption> */}
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 rounded shadow-md"
          src="https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt="Second slide"
          height="500"
        />

        {/* <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption> */}
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 rounded shadow-md"
          src="https://images.pexels.com/photos/975250/pexels-photo-975250.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt="Third slide"
          height="500"
        />

        {/* <Carousel.Caption style={{ bacgroundColor: "black" }}>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption> */}
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 rounded shadow-md"
          src="https://images.pexels.com/photos/318236/pexels-photo-318236.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="Fourth slide"
          height="500"
        />

        {/* <Carousel.Caption style={{ bacgroundColor: "black" }}>
          <h3>Fourth slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption> */}
      </Carousel.Item>
    </Carousel>
  );
}

export default MyCarousel;
