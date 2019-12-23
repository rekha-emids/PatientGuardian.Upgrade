import React from "react";
import { View, Text, InteractionManager } from "react-native";
import { connect } from 'react-redux';
import { getSelectedLanguages } from '../../../redux/serviceProviderProfile/Languages/actions';
import Header from '../Header'
import EmptyText from '../EmptyText/index'
import styles from '../Skills/styles';
import Images from '../../../assets/images'
import {CoreoImage} from '../../../components/Base/Image/index'
import _ from 'lodash'
class Languages extends React.Component {

    componentDidMount(){
        InteractionManager.runAfterInteractions(this.getSelectedLanguages);
    }
    getSelectedLanguages = () => {
        this.props.getSelectedLanguages(this.props.spId);
    }

    render() {
        let content = this.props.selectedLanguagesList && this.props.selectedLanguagesList.map((item) => <View style={styles.skillItemContainer} key={item.id}>
                    <CoreoImage source={Images.Flags[item.name]} style={styles.flag} />
                    <Text style={styles.skillItem}>{item.name}</Text>
                </View>),
         image = Images.edit,
         isContentAvailable = true

        if (this.props.isLoading){
            return null
        }
        if (_.isNil(this.props.selectedLanguagesList) || this.props.selectedLanguagesList.length <= 0){
            content = <EmptyText/>
            isContentAvailable = false
        }
        return (
            <View style={styles.cardContainer}>
                <Header title="Languages Spoken"
                    showIcon={this.props.isEditable}
                    icon={image}
                    onPress={this.props.goToEditLanguages}
                    />
                <View style={[
styles.skillItemsList,
!isContentAvailable ? {justifyContent: "center"} : {}
]}>
                    {content}
                </View>
            </View>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getSelectedLanguages: (spId) => dispatch(getSelectedLanguages(spId))
    }
}

function mapStateToProps(state) {
    return {
        selectedLanguagesList: state.impersonateProfileState && state.impersonateProfileState.LanguagesState.selectedLanguagesList
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Languages);
