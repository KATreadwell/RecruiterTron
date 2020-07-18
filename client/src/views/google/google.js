import React from "react";
import {
  Card,
  CardBody,

} from 'reactstrap';
import { compose, withProps } from "recompose";
import { withScriptjs, withGoogleMap, GoogleMap, Marker, google, geoXML3, map } from "react-google-maps";
require('dotenv').config()

class MyFancyComponent extends React.Component {
  render() {
    return (
     <div>
             <iframe height='800' width="100%" class="home_page_map" src="//maps.google.com/maps?q=32.6151022,-117.070458&z=15&output=embed"/>
     </div>
    )
  }
}

export default MyFancyComponent;
