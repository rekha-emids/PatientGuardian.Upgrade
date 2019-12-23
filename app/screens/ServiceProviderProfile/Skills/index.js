import React, { Component } from 'react';
import {connect} from 'react-redux';
import {View,
  Text, InteractionManager} from 'react-native';
import Header from '../Header'
import Images from '../../../assets/images'
import { getSelectedSkills } from '../../../redux/serviceProviderProfile/Skills/actions';
import styles from './styles'
import EmptyText from '../EmptyText/index'
import _ from 'lodash'
class Skills extends Component {
    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this.props.getSelectedSkills(this.props.spId);
        });
    }

  render() {
    let content = this.props.selectedSkillsList && this.props.selectedSkillsList.map((item) => <View style={styles.skillItemContainer}>
                <Text style={styles.skillItem}>{item.name}</Text>
            </View>),
     image = Images.edit,
     isContentAvailable = true

    if (this.props.isLoading){
        return null
    }
    if (_.isNil(this.props.selectedSkillsList) || this.props.selectedSkillsList.length <= 0){
        image = Images.AddIcon
        isContentAvailable = false
        content = <EmptyText/>
    }
    return (
        <View style={styles.cardContainer}>
            <Header title="Skills and Experience"
                showIcon={this.props.isEditable}
                icon={image}
                onPress={this.props.goToEditSkills}
            />
            <View style={[
styles.skillItemsList,
!isContentAvailable ? {justifyContent: "center"} : {}
]}>
                {content}
            </View>
    </View>
);
  }
}

function mapDispatchToProps(dispatch) {
    return {getSelectedSkills: (spId) => dispatch(getSelectedSkills(spId))}
}

function mapStateToProps(state) {
    return {selectedSkillsList: state.impersonateProfileState && state.impersonateProfileState.SkillsState.selectedSkillsList};
}

export default connect(mapStateToProps, mapDispatchToProps)(Skills)