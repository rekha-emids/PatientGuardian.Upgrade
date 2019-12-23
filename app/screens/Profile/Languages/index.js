import React from "react";
import { View, Text } from "react-native";
import { connect } from 'react-redux';
import { getLanguages, getSelectedLanguages, addLanguages } from '../../../redux/profile/Languages/actions';
import {navigateToScreenMainStack} from '../../../redux/navigation/actions'
import {PATH} from '../../../routes/index';
import Header from '../Header'
import EmptyMsgText from '../EmptyText/index'
import styles from '../ClinicalCondition/styles';
import Images from '../../../assets/images'
import {CoreoImage} from '../../../components/Base/Image/index'
import EmptyText from "../../ServiceProviderProfile/EmptyText";

class Languages extends React.Component {

    componentDidMount(){
        // this.props.getLanguages();
        // this.props.getSelectedLanguages(this.props.params);
    }

    onPressFun = () => {
      this.props.goToEditLanguages(this.props.params) 
     }
     onEmptyMsgPress = () => {
      this.props.goToEditLanguages(this.props.params)
      }

    render() {
        let content = this.props.selectedLanguagesList && this.props.selectedLanguagesList.map((item) => <View style={styles.skillItemContainer} key={item.id}>
                    <CoreoImage source={Images.Flags[item.name]} style={styles.flag} />
                    <Text style={styles.skillItem}>{item.name}</Text>
                </View>),
         image = Images.edit,
         isEmptyView = false;

        if (!this.props.selectedLanguagesList || this.props.selectedLanguagesList.length <= 0){
            isEmptyView = true;
            image = Images.AddIcon
            content = this.props.isEditable ? <EmptyMsgText onPress={this.props.isEditable ? this.onEmptyMsgPress : null} text="Languages Spoken" icon={image}/>
            : <EmptyText/>
        }
        return (
            <View style={styles.cardContainer}>
                <Header title="Languages Spoken"
                    showIcon={this.props.isEditable}
                    icon={image}
                    onPress={this.onPressFun}
                    isEditable={this.props.isEditable}
                    />
                <View style={[
styles.skillItemsList,
isEmptyView ? styles.noLanguages : {}
]}>
                    {content}
                </View>
            </View>
        )
    }
}

function mapDispatchToProps (dispatch) {
    return {
      getLanguages: () => dispatch(getLanguages()),
      getSelectedLanguages: (data) => dispatch(getSelectedLanguages(data)),
      addLanguages: (data) => dispatch(addLanguages(data)),
      goToEditLanguages: (params) => dispatch(navigateToScreenMainStack(PATH? PATH.EDIT_LANGUAGES: null, params))

    }
  }
  
  function mapStateToProps (state, props) {
      let params = props.params
      let details = {
        selectedLanguagesList: state.profileState && state.profileState.LanguagesState.selectedLanguagesList
      }
      const {impersonatedLanguages} = state.profileState && state.profileState.LanguagesState || {}
      if(params && params.id !== global.currentUserPatientId){
          details = {
            selectedLanguagesList: impersonatedLanguages && impersonatedLanguages[params.id] ? impersonatedLanguages[params.id].selectedLanguagesList : []
          }
      }
    return {
      LanguagesList: state.profileState && state.profileState.LanguagesState.LanguagesList,
      ...details
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(Languages);
