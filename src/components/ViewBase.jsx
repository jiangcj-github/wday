import React from 'react';
import intl from "react-intl-universal";
import Bus from "../core/Bus";
import imageDict from "../common/imageDict.js";

export default class ViewBase extends React.Component {

  constructor(props) {
    super(props);
    this.intl = intl;
    this.imageDict = imageDict();
    this.bus = Bus();
  }

}
