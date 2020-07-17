import React from "react";
import {
    Card,
    CardBody,

} from 'reactstrap';
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

const Google = compose(
    withProps({
      googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
      loadingElement: <div style={{ height: `100%` }} />,
      containerElement: <div style={{ height: `400px` }} />,
      mapElement: <div style={{ height: `100%` }} />,
    }),
    withScriptjs,
    withGoogleMap
  )((props) =>
    <GoogleMap
      defaultZoom={8}
      defaultCenter={{ lat: 34.052, lng: -118.243 }}
    >
      {props.isMarkerShown && <Marker position={{ lat: 34.052, lng: -118.243 }} onClick={props.onMarkerClick} />}
    </GoogleMap>
  )
  
  class MyFancyComponent extends React.PureComponent {
    state = {
      isMarkerShown: false,
    }
  
    componentDidMount() {
      this.delayedShowMarker()
    }
  
    delayedShowMarker = () => {
      setTimeout(() => {
        this.setState({ isMarkerShown: true })
      }, 3000)
    }
  
    handleMarkerClick = () => {
      this.setState({ isMarkerShown: false })
      this.delayedShowMarker()
    }
  
    render() {
      return (
        <Google
          isMarkerShown={this.state.isMarkerShown}
          onMarkerClick={this.handleMarkerClick}
        />
      )
    }
  }

  export default Google;
