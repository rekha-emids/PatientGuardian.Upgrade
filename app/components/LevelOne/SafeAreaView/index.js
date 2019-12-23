import React, { Component } from 'react'
import { SafeAreaView } from 'react-navigation'


class SafeView extends Component {
    render() {
        return <SafeAreaView style={[
            { flex: 1 },
            this.props.style
        ]} forceInset={{ top: 'always' }}>
            {this.props.children}
        </SafeAreaView>
    }
}


export default SafeView