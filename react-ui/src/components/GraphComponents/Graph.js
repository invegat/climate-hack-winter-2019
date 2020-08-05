/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import MetricsGraphics from "react-metrics-graphics";
import "./MetricsGraphics.css";
import { connect } from "react-redux";
import { get_temps } from "../../actions";
import * as d3 from "d3";

const zipcode = "33143";
class Graph extends Component {
    constructor(props) {
        super(props);
        this.props.get_temps(zipcode);
    }

    render() {
        return (
            <div className="mgraph">
                <MetricsGraphics
                    description="This graphic shows a time-series of temperatures."
                    data={this.props.past}
                    width={380}
                    height={300}
                    x_accessor="date"
                    y_accessor={["max", "min"]}
                    min_y_from_data="true"
                    point_size="4"
                    x_axis="false"
                    y_axis="false"
                    legend={["HI", "LO"]}
                    y_rollover_format={(d) => {
                        d3.select('.mgraph svg .mg-active-datapoint')
                            //     // .text(d.multiline_y_accessor.toFixed(2) +" degrees")
                            //     .text('min ' + d.min + " degrees  " + d.max + " degrees")
                            //     .enter()
                            //     .append("p")
                            //     .text(d.max + " degrees")
                            .style("font-familiy", "monospace")
                        return d.multiline_y_accessor.toFixed(2).toString().padEnd(53)
                    }
                    }
                    x_rollover_format={(d) => 'year ' + d.key}
                    aggregate_rollover="true"
                    legand_target=".lt"

                //   mouseover= {}
                // baselines = {}
                />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    high: state.temps.max,
    low: state.temps.min,
    current: state.temps ? state.temps.currently || null : null,
    past: state.temps ? state.temps.ra || null : null
});
const mapDispatchToProps = dispatch => ({
    get_temps: zip => dispatch(get_temps(zip))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Graph);
