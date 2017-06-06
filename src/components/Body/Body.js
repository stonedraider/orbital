import React, { Component } from 'react';
import Slider from 'react-slick';
import Button from '../Button'
import Loading from '../Loading'
import './Body.css';
import apod_2017_01_01 from '../../img/apod_2017_01_01.jpg'
// import space_background_001 from '../../img/space_background_001.jpg'
//GET https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=2017-01-01

const PATH_BASE = 'https://api.nasa.gov/planetary/apod';

const PARAM_API_KEY = 'api_key=';
const PARAM_DATE = 'date=';
const PARAM_HD = 'hd=';

// const VALUE_API_KEY = 'DEMO_KEY';
const VALUE_API_KEY = 'Yxi6hdd2U4X9odDq25r8ppGeeKz0I8zkFV8GiQU0';
const VALUE_DATE = '2017-01-01';
const VALUE_HD = 'false';

const DAYS = 3;
const FETCH_SIZE = 50;

function SliderItemInfo({ url, date, title, explanation }) {
  const explanationMin = explanation;
  return (
    <div className="divSliderItemInfo">
      <br></br>
      <h4>Date</h4>
      {date}
      <h4>Title</h4>
      {title}
      <div className="divDownloadButton">
        <a
          className="btn btn-default active" role="button"
          download=""
          href={url}
          title="Download">
          Download
            </a>
      </div>
    </div>
  );
}

class SliderItem extends Component {

  constructor(props) {
    super(props);

    this.state = {
      media_type: null,
      url: "",
      date: null,
      title: "",
      explanation: ""
    }
  }

  render() {
    const {
      media_type,
      url,
      date,
      title,
      explanation
    } = this.props;

    return (
      <div>
        <SliderItemInfo
          url={url}
          date={date}
          title={title}
          explanation={explanation}
        >
        </SliderItemInfo>
        {media_type === "video"
          ?
          <iframe width="800" height="600" src={url} frameBorder="0"></iframe>
          :
          <div>
            <div className="divSliderImage">
              <img src={url}></img>
            </div>
          </div>
        }
      </div>
    )
  }
}

class Body extends Component {

  constructor(props) {
    super(props);

    var date = new Date();

    this.state = {
      isLoading: false,
      results: null,
      currentDate: new Date(date.setDate(date.getDate() - DAYS))
    }

    this.fetchApod = this.fetchApod.bind(this);
    this.setApodResult = this.setApodResult.bind(this);
  }
  render() {
    const {
      isLoading,
      results,
      currentDay,
      onSwitchStyle
    } = this.state;

    var settings = {
      dots: true,
      useCSS: true,
      infinite: false,
      slidesToShow: 5,
      slidesToScroll: 2,
      draggable: true,
      speed: 50
    };

    console.log(this.state);

    return (
      <div className="Body">
        <div className="divTop">
          <Button
            className="btn btn-default active"
            onClick={() => this.fetchNextData()}
          >
            Load APOD
          </Button>
        </div>
        <hr></hr>
        <div className="divSlider">
          <Slider {...settings}>
            {
              results ?
                results.map(item =>
                  <div key={item.date}>
                    <SliderItem
                      media_type={item.media_type}
                      url={item.url}
                      date={item.date}
                      title={item.title}
                      explanation={item.explanation}
                    >
                    </SliderItem>
                  </div>
                ) : <div></div>
            }
          </Slider>
        </div>
      </div >
    );
  }

  componentDidMount() {
    //
  }

  fetchNextData() {
    for (let i = 0; i < FETCH_SIZE; i++) {
      this.decrementDate();
      this.fetchApod(this.formatDate(this.state.currentDate));
    }
  }

  fetchApod(date) {
    this.setState({ isLoading: true });

    fetch(`${PATH_BASE}?${PARAM_API_KEY}${VALUE_API_KEY}&${PARAM_DATE}${date}&${PARAM_HD}${VALUE_HD}`)
      .then(response => response.json())
      .then(result => this.setApodResult(result));
  }

  setApodResult(result) {
    const updatedResults = this.state.results ? this.state.results : [];
    updatedResults.push(result);

    this.setState({
      isLoading: false,
      results: updatedResults
    });
  }

  decrementDate() {
    this.setState({
      currentDate: new Date(this.state.currentDate.setDate(this.state.currentDate.getDate() - 1))
    })
  }

  formatDate(date) {
    return date.toISOString().substring(0, 10);
  }

}

export default Body;