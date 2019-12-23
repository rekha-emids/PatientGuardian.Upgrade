import React, { Component } from 'react';
import { FlatList } from 'react-native';
import {_} from '../../../utils/validations'
class CoreoFlatList extends Component {

    _keyExtractor = (item, index) => {
        const {itemKey} = this.props
        return  !_.isNil(item[itemKey]) ? item[itemKey].toString() : Math.random().toString()
    }

    render() {
        return (
            <FlatList
                data={this.props.data}
                renderItem={this.props.renderItem}
                keyExtractor={this._keyExtractor}
                extraData={this.props.extraData}
                scrollEnabled={this.props.scrollEnabled}

                horizontal={this.props.horizontal}
                showsHorizontalScrollIndicator={false}
            />
        );
    }
};

CoreoFlatList.defaultProps ={
    horizontal:false,
}

export default CoreoFlatList;