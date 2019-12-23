import React from "react";
import {View,InteractionManager} from 'react-native'
import Header from '../Header'
import ServiceOfferedAccordian from './ServiceOfferedAccordian'
import { connect } from 'react-redux';
import { getServiceOffered} from '../../../redux/serviceProviderProfile/ServiceOffered/actions';
import styles from './styles'
import Images from '../../../assets/images'
import EmptyText from '../EmptyText/index'
import _ from 'lodash'
class ServiceOffered extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeServiceIds: {}
        };
    };

    componentWillReceiveProps(nextProps){
        if(this.props.serviceOfferedList.length !== nextProps.serviceOfferedList.length && nextProps.serviceOfferedList.length > 0){
            let idList = {
                [nextProps.serviceOfferedList[0].serviceCategoryId]: nextProps.serviceOfferedList[0].serviceCategoryId 
            }
            this.setState({activeServiceIds: idList})
        }
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this.props.getServiceOffered(this.props.spId);
        });
    }

    onPressServiceItem = (id) => {
        if(_.isNil(this.state.activeServiceIds[id]))
        {
            this.setState({activeServiceIds: {...this.state.activeServiceIds, [id]: id}})
        }
        else {
            let activeServiceIds = {...this.state.activeServiceIds}
            delete activeServiceIds[id]
            this.setState({activeServiceIds})
        }
    }

    render() {
        let content = this.props.serviceOfferedList && this.props.serviceOfferedList.map((service, index) => {
            let divider = null;
            if(index !== this.props.serviceOfferedList.length - 1)
            {
                divider = <View style={styles.divider} />
            }
            return (
                <View>
                    <ServiceOfferedAccordian 
                        serviceName={service.serviceCategoryDescription}
                        serviceItemsList={service.serviceTypeModel} 
                        isSelected={!_.isNil(this.state.activeServiceIds[service.serviceCategoryId])}
                        count={service.serviceTypeCount}
                        onPress={this.onPressServiceItem}
                        id={service.serviceCategoryId}
                    />
                    {divider}
                </View>
            )
        })
        let image = Images.edit
        if(this.props.isLoading){
            return null
        }
        if((_.isNil(this.props.serviceOfferedList)  || this.props.serviceOfferedList.length <= 0)){
            image = Images.AddIcon
            content = <EmptyText/>
        }
        return (
            <View style={styles.cardContainer}>
                <Header title="Services Offered" 
                    headerStyle={styles.headerStyle}
                    showIcon={this.props.isEditable}
                    icon={image}
                />
                {content}
            </View>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getServiceOffered: (spId) => dispatch(getServiceOffered(spId))
    }
};

function mapStateToProps(state) {
    return {
        serviceOfferedList: state.impersonateProfileState && state.impersonateProfileState.serviceOfferedState.serviceOfferedList
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ServiceOffered);
