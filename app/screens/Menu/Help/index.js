import React, {PureComponent} from 'react'
import {View, StyleSheet} from 'react-native'
import Pdf from 'react-native-pdf'
import { connect } from 'react-redux'
import { SafeView} from '../../../components/LevelOne'
import { setValueBasedOnWidth } from '../../../utils/deviceDimensions';
import Navbar from '../../../components/LevelOne/Navbar';
import { updateNetworkConnectivity } from '../../../services/OfflineSyncing';
import { webUrl } from '../../../services/http'

class Help extends PureComponent{
    onLoadComplete = (numberOfPages, filePath) => {
        if (!this.props.network){
            updateNetworkConnectivity(true)
        }
    }
    render(){
        const source = {uri: webUrl + "static/media/Help.22218db0.pdf", cache: true};

        return (
            <SafeView>
            <View style={styles.container}>
                <Navbar title="Support" showEmptyAdd />
                <Pdf
                    source={source}
                    style={styles.pdf}
                    onLoadComplete={this.onLoadComplete}
                    />
            </View>
            </SafeView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    pdf: {
        flex: 1,
        width: setValueBasedOnWidth(360)
    }
})

function mapStateToProps (state) {
    return {
      network: state.networkReducer && state.networkReducer.network
  
    };
}

export default connect(mapStateToProps, null)(Help)