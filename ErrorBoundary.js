import React from 'react'
import {connect} from 'react-redux'
class ErrorBoundary extends React.PureComponent {
    constructor(props){
        super(props)
        this.state = {error: false}
    }

    componentDidCatch(error, errorInfo){
        this.setState({error: true})
    }

    render(){
        // if(this.state.error){
        //     return (
        //         <View style={styles.container}>
        //             <CoreoText style={{fontSize: setFontSize(14)}}>
        //                 Something went wrong, Please try again later
        //             </CoreoText>
        //             <CoreoOpacityButton style={styles.buttonStyle} textStyle={styles.buttonContainer} onPress={this.props.customOnPress || this.props.goToDashboard} text={"Back to Dashboard"} />
        //         </View>
        //     )
        // }
        return this.props.children
    }
}

function mapDispatchToProps(dispatch){
    return {}
}

export default connect(null, mapDispatchToProps)(ErrorBoundary)