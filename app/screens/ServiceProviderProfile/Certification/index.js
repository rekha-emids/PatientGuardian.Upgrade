import React from "react";
import {View, Text, InteractionManager} from 'react-native';
import { connect } from 'react-redux';
import {CoreoImage} from '../../../components'
import Header from '../Header';
import Images from '../../../assets/images/index'
import { getCertification} from '../../../redux/serviceProviderProfile/Certification/actions';
import EmptyText from '../EmptyText/index'
import styles from './styles'
import _ from 'lodash'
class Certification extends React.Component {

    componentDidMount() {
        InteractionManager.runAfterInteractions(this.getCertification);
    }

    getCertification = () => {
        this.props.getCertification(this.props.spId);
    }
    render() {
        let content = this.props.certificationList && this.props.certificationList.map((certificateList, i) => {
            let divider = null;

            if (i !== this.props.certificationList.length - 1) {
                divider = <View style={styles.divider} />
            }
            return (
                <View>
                    <View style={styles.certificateItem}>
                        <CoreoImage style={styles.icon} source={Images.badge} />
                        <View style={styles.content}>
                            <Text style={styles.certificationType}>
                                {certificateList.certificationName}
                            </Text>
                            <Text style={styles.certificationDescription}>
                                {certificateList.authority}
                            </Text>
                        </View>
                    </View>
                    {divider}
                </View>
            );
        });

        if (this.props.isLoading){
            return null
        }

        if (_.isNil(this.props.certificationList) || this.props.certificationList.length <= 0){
            content = <EmptyText/>
        }

        return (
            <View style={styles.cardContainer}>
            <Header 
                title="Certification and License(s)"
                showIcon={this.props.isEditable}
            />
                {content}
            </View>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getCertification: (spId) => dispatch(getCertification(spId))
    }
}

function mapStateToProps(state) {
    return {
        certificationList: state.impersonateProfileState && state.impersonateProfileState.CertificationState.certificationList
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Certification);
