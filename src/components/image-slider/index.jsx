import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from 'react-icons/bs';
import './styles.css';

const ImageSlider = ({ url, limit = 5, page = 1 }) => {
  const [images, setImages] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchImages = async (getUrl) => {
    try {
      setLoading(true);

      const response = await fetch(`${getUrl}?page=${page}&limit=${limit}`);
      const data = await response.json();

      if (data) {
        setImages(data);
        setLoading(false);
      }
    } catch (e) {
      setErrorMessage(e.message);
      setLoading(false);
    }
  };

  const handlePrevious = () => {
    setCurrentSlide(currentSlide === 0 ? images.length - 1 : currentSlide - 1);
  };

  const handleNext = () => {
    setCurrentSlide(currentSlide === images.length - 1 ? 0 : currentSlide + 1);
  };

  useEffect(() => {
    if (url !== '') fetchImages(url);
    // eslint-disable-next-line
  }, [url]);

  if (loading) {
    return <div>Loading data! Please wait!!</div>;
  }

  if (errorMessage !== null) {
    return (
      <div>
        Error occured!
        {errorMessage}
      </div>
    );
  }

  return (
    <>
      <h1 className="slider-title">Encarta Image Slider</h1>

      <div className="container">
        <BsArrowLeftCircleFill onClick={handlePrevious} className="arrow arrow-left" />
        {
                    images && images.length
                      ? images.map((imageItem, index) => (
                        <img
                          key={imageItem.id}
                          alt={imageItem.download_url}
                          src={imageItem.download_url}
                          className={currentSlide === index ? 'current-image' : 'current-image hide-current-image'}
                        />
                      )) : null
                }
        <BsArrowRightCircleFill onClick={handleNext} className="arrow arrow-right" />
        <span className="circle-indicators">
          {
                        images && images.length
                          ? images.map((_, index) => (
                            // eslint-disable-next-line
                            <button
                            // eslint-disable-next-line
                              key={index}
                              type="button"
                              className={currentSlide === index ? 'current-indicator' : 'current-indicator inactive-indicator'}
                              onClick={() => setCurrentSlide(index)}
                            />
                          ))
                          : null
                    }
        </span>
      </div>
    </>
  );
};

ImageSlider.propTypes = {
  url: PropTypes.string.isRequired,
  limit: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
};

export default ImageSlider;
