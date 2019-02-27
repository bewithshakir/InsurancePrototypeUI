import React from "react";
import PerfectScrollbar from "perfect-scrollbar";

class LatiLognDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = { CarDetails: { lat: 0, lng: 0 } };
  }

  componentDidMount() {
    const container = document.querySelector("#lat-long-container");
    const ps = new PerfectScrollbar(container);
  }

  accidentalDateFormated(date) {
    if (typeof date === "undefined") {
      return date;
    } else {
      return date.substring(0, 19);
    }
  }
  render() {
    console.warn("in latlong", this.props.accidentData.formattedDateTime);
    this.state.CarDetails = this.props.latlng;
    console.log("in latlong", this.state);
    return (
      <div className="row lat-logn-details">
        <div className="col-md-12 lat-long-header">
          <span>Latitude and Longitude</span>
        </div>
        <div className="col-md-12 lat-long-container" id="lat-long-container">
          <div className="row lat-long-row">
            <div className="col-md-6 lat-long-col">
              <div className="row lat-long-padding">
                <div className="col-md-12 lat-long-title">Latitude</div>
              </div>
              <div className="row">
                <div className="col-md-12 lat-long-title-text">
                  {this.state.CarDetails.lat}
                </div>
              </div>
            </div>
            {/* <div className="col-md-6 lat-long-col">
              <div className="row lat-long-padding">
                <div className="col-md-12 lat-long-title">Date</div>
              </div>
              <div className="row">
                <div className="col-md-12 lat-long-title-text">20 Oct 2018</div>
              </div>
            </div> */}
            <div className="col-md-6 lat-long-col">
              <div className="row lat-long-padding">
                <div className="col-md-12 lat-long-title">Logitude</div>
              </div>
              <div className="row">
                <div className="col-md-12 lat-long-title-text">
                  {this.state.CarDetails.lng}
                </div>
              </div>
            </div>
          </div>
          {/* <div className="row lat-long-row">
            <div className="col-md-6 lat-long-col">
              <div className="row lat-long-padding">
                <div className="col-md-12 lat-long-title">Logitude</div>
              </div>
              <div className="row">
                <div className="col-md-12 lat-long-title-text">
                  {this.state.CarDetails.lng}
                </div>
              </div>
            </div>
            <div className="col-md-6 lat-long-col">
              <div className="row lat-long-padding">
                <div className="col-md-12 lat-long-title">Timeframe</div>
              </div>
              <div className="row">
                <div className="col-md-12 lat-long-title-text">
                  10:00-10:30 AM
                </div>
              </div>
            </div>
          </div>
          <div className="row lat-long-row">
            <div className="col-md-6 lat-long-col">
              <div className="row lat-long-padding">
                <div className="col-md-12 lat-long-title">Video Position</div>
              </div>
              <div className="row">
                <div className="col-md-12 lat-long-title-text">00:00:00</div>
              </div>
            </div>
            <div className="col-md-6 lat-long-col">
              <div className="row lat-long-padding">
                <div className="col-md-12 lat-long-title">Video Length</div>
              </div>
              <div className="row">
                <div className="col-md-12 lat-long-title-text">00:30:00</div>
              </div>
            </div>
          </div> */}
          <div className="row lat-long-row">
            <div className="col-md-6 lat-long-col">
              <div className="row lat-long-padding">
                <div className="col-md-12 lat-long-title">
                  Accident DateTime
                </div>
              </div>
              <div className="row">
                <div className="col-md-12 lat-long-title-text">
                  {this.props.accidentData
                    ? this.accidentalDateFormated(
                        this.props.accidentData.formattedDateTime
                      )
                    : ""}
                </div>
              </div>
            </div>
            <div className="col-md-6 lat-long-col">
              <div className="row lat-long-padding">
                <div className="col-md-12 lat-long-title">
                  Accident Position
                </div>
              </div>
              <div className="row">
                <div className="col-md-12 lat-long-title-text">
                  {this.props.accidentData
                    ? this.props.accidentData.latitude +
                      " " +
                      this.props.accidentData.longitude
                    : ""}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// const LatiLognDetails = (props) => {
//   console.log("props",props.latlng);

// };

export default LatiLognDetails;
