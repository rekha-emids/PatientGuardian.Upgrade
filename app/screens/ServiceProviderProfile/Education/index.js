import React from "react";
import {View, Text, InteractionManager} from 'react-native'
import { connect } from 'react-redux';
import {CoreoImage} from '../../../components'
import Header from '../Header';
import Images from '../../../assets/images/index';
import { getEducation } from '../../../redux/serviceProviderProfile/Education/actions';
import styles from './styles'
import EmptyText from '../EmptyText/index'
import _ from 'lodash'
class Education extends React.Component {

    componentDidMount() {
        InteractionManager.runAfterInteractions(this.getEducation);
    }

    getEducation = () => {
        this.props.getEducation(this.props.spId);
    }
    render() {
        let content = this.props.educationList && this.props.educationList.map((EducationList, i) => {
            let divider = null;

            if (i !== this.props.educationList.length - 1) {
                divider = <View style={styles.divider} />
            }

            let {endYear} = EducationList

            if (_.isNil(endYear)) {
                endYear = "Present"
            }

            return (
                <View key={i}>
                    <View style={styles.listItem}>
                        <CoreoImage style={styles.icon} source={Images.education} />
                        <View style={styles.content}>
                            <Text style={styles.universityName}>
                                {EducationList.school}
                            </Text>
                            <Text style={styles.universityDetails}>
                            {EducationList.degree} {EducationList.fieldOfStudy}
                            </Text>
                            <Text style={styles.date}>
                                {EducationList.startYear} - {endYear}
                            </Text>
                        </View>
                  </View>
                    {divider}
            </View>
            )
        });

        if (this.props.isLoading){
            return null
        }
        if (_.isNil(this.props.educationList) || this.props.educationList.length <= 0){
            content = <EmptyText/>
        }
        return (
            <View style={styles.cardContainer}>
                <Header title="Education" showIcon={this.props.isEditable}/>
                {content}
            </View>
        )
    }

}

function mapDispatchToProps(dispatch) {
    return {
        getEducation: (spId) => dispatch(getEducation(spId))
    }
}

function mapStateToProps(state) {
    return {
        educationList: state.impersonateProfileState && state.impersonateProfileState.EducationState.educationList
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Education);