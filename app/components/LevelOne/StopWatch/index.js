
import React, { Component } from "react";
import {Text, StyleSheet} from 'react-native'
import { setFontSize } from "../../../utils/deviceDimensions";

function pad(num) {
    return `0${num}`.slice(-2);
}

export const formattedSeconds = (secs) => {
    let minutes = Math.floor(secs / 60);

    secs %= 60;
    let hours = Math.floor(minutes / 60)

    minutes %= 60;
    return `${pad(hours)}:${pad(minutes)}:${pad(secs)}`;
}



class Stopwatch extends Component {
    constructor(props) {
        super(props);
        let time = props.duration // props.startTime ? convertUTCTime(props.startTime) : 0
        // if(props.stopTimer){
        //     time = getUtcTimeDiff(props.startTime, props.endTime)
        // }'

        this.state = {
            secondsElapsed: time,
            laps: [],
            lastClearedIncrementer: null
        };
        this.incrementer = null;
    }

    componentDidMount(){
        this.handleStartClick()
    }

    componentWillReceiveProps(nextProps){
        if (this.props.stopTimer !== nextProps.stopTimer){
            if (this.props.stopTimer){
                this.handleStopClick()
            }
        }
    }

    handleStartClick() {
        if (!this.props.stopTimer){
            this.incrementer = setInterval(
() => this.setState({secondsElapsed: this.state.secondsElapsed + 1})
            , 1000
);
        }
    }

    handleStopClick() {
        clearInterval(this.incrementer);
        this.setState({lastClearedIncrementer: this.incrementer});
    }

    handleResetClick() {
        clearInterval(this.incrementer);
        this.setState({
            secondsElapsed: 0,
            laps: []
        });
    }

    handleLabClick() {
        this.setState({laps: this.state.laps.concat([this.state.secondsElapsed])})
    }

    render() {
        return <Text style={styles.text}>{formattedSeconds(this.state.secondsElapsed)}</Text>
    }
}

const styles = StyleSheet.create({
    text: {
        fontSize: setFontSize(14),
        color: "#444444",
        fontFamily: "OpenSans",
        fontWeight: '600'
    }
})

export default Stopwatch