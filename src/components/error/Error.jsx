import React, {Component} from 'react';
import "./stylus/error.styl"
import ViewBase from "../ViewBase";

export default class Error extends ViewBase {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="error-wrap">404错误</div>
    );
  }
}
