import React, { Component } from 'react';
import Slider from 'react-slick';
import Button from '../Button'
import Loading from '../Loading'
import './Body.css';
import apod_2017_01_01 from '../../img/apod_2017_01_01.jpg'
//GET https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&date=2017-01-01

const PATH_BASE = 'https://api.nasa.gov/planetary/apod';

const PARAM_API_KEY = 'api_key=';
const PARAM_DATE = 'date=';
const PARAM_HD = 'hd=';

// const VALUE_API_KEY = 'DEMO_KEY';
const VALUE_API_KEY = 'Yxi6hdd2U4X9odDq25r8ppGeeKz0I8zkFV8GiQU0';
const VALUE_DATE = '2017-01-01';
const VALUE_HD = 'false';

function SliderComponent ({ url }) {
  return (<div><img src={url}></img></div>)
}

class Body extends Component {
  constructor(props) {
    super(props);

    var date = new Date();

    this.state = {
      isLoading: false,
      results: null,
      currentDate: new Date(date.setDate(date.getDate() - 1))
    }

    this.fetchApod = this.fetchApod.bind(this);
    this.setApodResult = this.setApodResult.bind(this);
  }
  render() {
    const {
      isLoading,
      results,
      currentDay
    } = this.state;

    var settings = {
      dots: true,
      useCSS: true
    };

    console.log(this.state);

    return (
      <div className="Body">
        <div className="divTop">
          <Button
            className="btn-default"
            onClick={() => this.fetchNextData()}
          >
            Load APOD
          </Button>
        </div>
        <div className="divSlider">
          <Slider {...settings}>
              {isLoading
                ? <div><Loading className="fa fa-spinner fa-spin fa-spin-custom centerInDiv" /></div>
                : results ?
                  results.map(item => 
                    <div><img src={item.url}></img></div>                  
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
    this.decrementDate();
    this.fetchApod(this.formatDate(this.state.currentDate));
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