import React from 'react'
import {connect} from 'react-redux'
import { View} from 'react-native'
import {Item, Header, Icon, Input} from 'native-base'
import {updateLanguages, addLanguages, resetUpdatedLanguages} from '../../../redux/profile/Languages/actions'
import EditProfileWrapper from '../index'
import {compare} from '../../../utils/comparerUtility'
import _ from 'lodash'
import {ItemLanguage} from '../EditClinicalCondition/index'
import styles from '../EditClinicalCondition/styles'
import { isIOS } from '../../../utils/appUtils';


class EditLanguages extends React.PureComponent {
    prevUpdatedLanguagesList = {}
    updatedLanguagesList = {}
    title = "Edit Languages Spoken"
    constructor(props){
        super(props)
        this.state = {
            filteredItems: props.languageState.LanguagesList
        }
    }

    componentWillReceiveProps(nextProps){
        __DEV__ && console.log("nextProps is: ",nextProps)
        if(nextProps.languageState.LanguagesList && nextProps.languageState.LanguagesList.length &&
            this.props.languageState.LanguagesList.length !== nextProps.languageState.LanguagesList.length){
                this.setState({filteredItems: nextProps.languageState.LanguagesList})
            }
    }

    componentWillMount(){
        const {languageState} = this.props
        if(Object.keys(languageState.updatedLanguagesList).length <= 0){
            this.title = "Add Languages Spoken"
        }
    }

    onClickLanguageItem = (language, onUpdateIsEdited) => {
        __DEV__ && console.log("Language is: ",language," onUpdateIsEdited: ",onUpdateIsEdited)
        const {navigation} = this.props
        const {params} = navigation.state
        this.props.addLanguages(language, params)
        this.updateList(language)
        if(compare(this.updatedLanguagesList, this.prevUpdatedLanguagesList)){
            onUpdateIsEdited && onUpdateIsEdited(false)
        }else
        {
            onUpdateIsEdited &&  onUpdateIsEdited(true)
        }
    }

    updateList = (language) => {
        __DEV__ && console.log("updateList languages is: ",language)
        if(_.isNil(this.updatedLanguagesList[language.id]))
        {
            this.updatedLanguagesList = {
                ...this.updatedLanguagesList,
                [language.id]: language
            }
        }else{
            delete this.updatedLanguagesList[language.id]
        }
    }

    componentDidMount()
    {
        this.prevUpdatedLanguagesList = this.props.languageState.updatedLanguagesList
        this.updatedLanguagesList = {...this.props.languageState.updatedLanguagesList}
    }

    onConfirm = () => {
        this.props.resetUpdatedLanguages(this.prevUpdatedLanguagesList)
    }

    onChangeText = (text) => {
        let updatedLanguages = []
        const {languageState} = this.props
        if(!text.length){
            this.setState({filteredItems: languageState.LanguagesList})
        }else{
            languageState.LanguagesList && languageState.LanguagesList.map(item => {
                if(item.name && item.name.toLowerCase().indexOf(text.toLowerCase()) !== -1){
                    updatedLanguages.push(item)
                }
            })
            this.setState({filteredItems: updatedLanguages})
        }
    }


    render() {
        const {languageState, navigation} = this.props
        const {params} = navigation.state
        let { updatedLanguagesList } = this.props
        const {filteredItems} = this.state
        const content = filteredItems && filteredItems.map((item, i) => {
            let selectedItemStyle = {};
            if(!_.isNil(updatedLanguagesList[item.id]))
            {
                selectedItemStyle = styles.selectedItem
            }
            return (
                <ItemLanguage item={item} index={i} selectedItemStyle={selectedItemStyle}
                 onPress={this.onClickLanguageItem} />
            )
        })
        
       return (
           <EditProfileWrapper 
           onConfirm={this.onConfirm}
           containerStyle={styles.containerStyle}
           contentStyle={styles.content} onClickUpdate={() => {
               this.props.updateLanguages(null, params)}} style={styles.container}
                title={this.title}>
                 <View style={styles.searchBarContianer}>
                    {isIOS() ? null : <Header rounded style={{height: 0}} searchBar />}
                    <Item>
                    <Icon name="ios-search" />
                        <Input placeholder="Search" onChangeText={this.onChangeText} />
                    </Item>
                </View>
                    {content}
           </EditProfileWrapper>
       )
    }
}

const mapStateToProps = (state, props) => {
    let params = props.navigation.state.params
      let details = {
        updatedLanguagesList: state.profileState.LanguagesState.updatedLanguagesList
      }
      const {impersonatedLanguages} = state.profileState.LanguagesState
      if(params && params.id !== global.currentUserPatientId){
          details = {
            updatedLanguagesList: impersonatedLanguages[params.id] ? impersonatedLanguages[params.id].updatedLanguagesList : []
          }
      }
    return {
        languageState: state.profileState.LanguagesState,
        ...details
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addLanguages: (data, params) => dispatch(addLanguages(data, params)),
        updateLanguages: (onSuccess, params) => dispatch(updateLanguages(onSuccess, params)),
        resetUpdatedLanguages: (data) => dispatch(resetUpdatedLanguages(data))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(
    EditLanguages
)