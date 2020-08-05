import React, { Component } from "react";
import "./ToolTip.css";

class ToolTip extends Component {
  render() {
    const { trigger } = this.props;
    const placementStyles = {};
    const {year, temp } = this.props.children
    const d = {
      year,
      temp
    }


    if (trigger) {
      const triggerRect = trigger.getBoundingClientRect();
      placementStyles.left =
        triggerRect.left + (triggerRect.right - triggerRect.left) / 2;
      placementStyles.top = triggerRect.top;
    }

    return (
      <div
        className={"tooltip tooltip-green tooltip-top"}
        style={placementStyles}
      >
        <div className="tooltip_arrow" />
        <div className="tooltip_inner">{d}</div>
      </div>
    );
  }
}
// DEFAULT PROPS
ToolTip.defaultProps = {};

export default ToolTip;
