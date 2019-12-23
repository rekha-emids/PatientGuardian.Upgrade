import React, { Component } from "react";
import { connect } from 'react-redux';
import {Modal} from 'react-native';
import {
    View,
  } from 'react-native';
import {
    CoreoScrollView,
    CoreoImage,
    CoreoText,
    CoreoOpacityButton
} from '../../../../components';

class ServiceRequestSort extends Component {

    constructor(props) {
        super(props);
        this.state = {
            serviceRequestId: '',
            isSortOpen: false,
            newest: true,
            posted: true,
        };
    };

    componentDidMount() {
    }

    handleClick = (requestId) => {
     }

    onNewServiceRequestClick = () => {
    }

    onSortChange = (posted, newest) =>{
        var data={
          sortByOrder :"DESC",
          sortByColumn:"MODIFIEDDATE"
        }
        this.props.getSort(data);
        this.setState({
            newest: (newest !== null ? newest : this.state.newest),
            posted: (posted !== null ? posted : this.state.posted),
            isSortOpen: false
        });
    }
    render() {
        return (
            <View>
                <Modal
                    transparent={true}
                    animationType="none"
                    closeOnClick={true}
                    visible={this.props.isFilterOpen}
                    onRequestClose={() => this.setState({isSortOpen: false})}
                >
                    <View >
                        
                    </View>
                </Modal>              
            </View>
        )
    }
}

export default connect(null, null)(ServiceRequestSort);