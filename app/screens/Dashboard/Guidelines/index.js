import React from 'react'
import styles from './styles'
import {connect} from 'react-redux'
import {View, TouchableOpacity} from 'react-native'
import Carousel from 'react-native-carousel-view';
import { CoreoText, CoreoImage } from '../../../components';
import { setValueBasedOnHeight, setValueBasedOnWidth } from '../../../utils/deviceDimensions';
import { GUIDELINES } from '../../../constants/constants';
import { THEME_PRIMARY_COLOR, WHITE, PROFILE_GREEN } from '../../../constants/theme';
import { SERVICE_PROVIDERS, REQUESTS } from '../../HomeTabs';
import { navigateToScreenMainStack } from '../../../redux/navigation/actions';
import { PATH } from '../../../routes';
import images from '../../../assets/images';

class Guidelines extends React.PureComponent{
    constructor(props){
        super(props)
        this.state = {
            activePage: 0
        }
    }

    componentWillReceiveProps(nextProps){
        const {activePage} = this.state
        if(nextProps.stages){
           let inCompletedStageExist = false
           let inCompletedStageId = activePage
           Object.keys(nextProps.stages).map(id => {
               if(!inCompletedStageExist && !nextProps.stages[id]){
                  inCompletedStageId = Number(id)
                  inCompletedStageExist = true
               }
           })
           activePage !== inCompletedStageId && this.setState({activePage: inCompletedStageId}, () => {
           this.pager && this.pager.indicatorPressed(inCompletedStageId)
        })
        }
    }

    renderItem = (index) => {
        let boxStyle = {}
        let idStyle = {}
        if(Number(index) === this.state.activePage){
            boxStyle = {backgroundColor: THEME_PRIMARY_COLOR}
            idStyle = {color: WHITE}
        }
        return (
            <TouchableOpacity style={[styles.stageBox, boxStyle]} onPress={() => this.changePage(Number(index))}>
                <CoreoText style={[styles.id, idStyle]}>{Number(index) + 1}</CoreoText>
            </TouchableOpacity>
        )
    }

    renderConnectors = () => {
        return Object.keys(GUIDELINES).map((id) => {
            if(!Number(id)) return this.renderItem(id)
            return (
                <View style={styles.stagesContainer}>
                    <View style={styles.connector} />
                    {this.renderItem(id)}
                </View>
            )
        })
    }

    changePage = (pageNumber) => {
        let updatePageNumber = Math.floor(pageNumber)
        this.setState({activePage: updatePageNumber}, () => {
            this.pager && this.pager.indicatorPressed(updatePageNumber)
        })
    }

    onClickLeft = () => {
        let {activePage} = this.state
        let nextPage =  activePage - 1
        nextPage >= 0 ? this.changePage(nextPage) : this.changePage(Object.keys(GUIDELINES).length - 1)
    }
    onClickRight = () => {
        let {activePage} = this.state
        let nextPage =  activePage + 1
        nextPage < Object.keys(GUIDELINES).length ? this.changePage(nextPage) : this.changePage(0)
    }

    onPressImage = (activePage) => {
        const {navigation, createServiceRequest,goToVisitHistory} = this.props
        let onPress = () => {}
        switch(activePage){
            case 0:
                onPress = () => {
                    navigation.navigate(SERVICE_PROVIDERS)
                }
                break;
            case 1:
                onPress = () => {
                    navigation.navigate(SERVICE_PROVIDERS)
                }
                break;
            case 2:
                onPress = () => {
                    createServiceRequest({navigator: navigation})
                }
                break;
            case 3:
                onPress = () => {
                    navigation.navigate(REQUESTS)
                }
                break;
            case 4:
                onPress=goToVisitHistory
                break;
            default:
                break;
        }
        return onPress
    }

    renderImages = () => {
        return Object.keys(GUIDELINES).map(id => {
            return <TouchableOpacity onPress={this.onPressImage(Number(id))}><CoreoImage source={images[`guideline${Number(id)+1}`]} style={styles.image} /></TouchableOpacity>

        })
    }

    render(){
        const {activePage} = this.state
        const {stages, isLoading} = this.props
        let isCompleted = stages && stages[activePage]
        let outerCircleStyle ={}
        let innerCircleStyle = {}
        if(isCompleted){
            outerCircleStyle = {borderColor: PROFILE_GREEN}
            innerCircleStyle = {backgroundColor: THEME_PRIMARY_COLOR}
        }
        return (
        <View style={[styles.mainContainer, isLoading ? styles.loaderContainer : {}]}>
            <Carousel
                ref={(pager) => {this.pager = pager}}
                height={setValueBasedOnHeight(220)}
                width={setValueBasedOnWidth(300)}
                hideIndicators={true}
                animate={false}
                loop={false}
                initialPage={0}
                onPageChange={(number) => this.setState({ activePage: Math.floor(number) })}
            >
              {this.renderImages()}
            </Carousel>
            <View style={styles.stepsContainer}>
                <TouchableOpacity style={styles.leftArrowStyle} onPress={this.onClickLeft}>
                    <CoreoImage style={styles.arrow} source={images.leftArrow} />
                </TouchableOpacity>
                <TouchableOpacity key={activePage} onPress={this.onPressImage(activePage)} style={styles.flex}>
                <View style={[styles.outerCircle, outerCircleStyle]}>
                    <View style={[styles.innerCircle, innerCircleStyle]}>
                        <CoreoText style={styles.stepText}>Step</CoreoText>
                        <CoreoText style={styles.step}>{activePage + 1}</CoreoText>
                    </View>
                </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.rightArrowStyle} onPress={this.onClickRight}>
                <CoreoImage style={styles.arrow} source={images.rightArrow} />
                </TouchableOpacity>
            </View>
            <CoreoText style={styles.title}>{GUIDELINES[activePage].title}</CoreoText>
            <CoreoText style={styles.content}>{GUIDELINES[activePage].description}</CoreoText>
            <View style={[styles.stagesContainer, styles.marginBottom]}>{this.renderConnectors()}</View>
        </View>
        )
    }
}

function mapStateToProps(state){
    return {
        stages: state.dashboardState.dashboardState.stages
    }
}
function mapDispatchToProps(dispatch){
    return {
        goToVisitHistory: () => dispatch(navigateToScreenMainStack(PATH.VISIT_HISTORY)),
        createServiceRequest: (params) => dispatch(navigateToScreenMainStack(PATH.REQUIREMENTS_SCREEN, params)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Guidelines)