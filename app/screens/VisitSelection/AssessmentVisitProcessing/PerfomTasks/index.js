import React, {Component} from 'react'
import {View, Text, TouchableOpacity} from 'react-native'
import ProgressBar from '../../../../components/LevelOne/ProgressBar/index'
import { CoreoImage } from '../../../../components';
import {getUTCFormatedDate} from '../../../../utils/momentUtil'
import StopWatch from '../../../../components/LevelOne/StopWatch';
import Icon from '../../../../components/Base/Icon';
import Icons from '../../../../assets/images/Icons';
import {COMPLETED_TASK_STATUS_ID, SERVICE_STATES} from '../../../../constants/constants'
import { setFontSize, setValueBasedOnWidth } from '../../../../utils/deviceDimensions';
import {getServiceIcon} from '../../../../utils/appUtils'
import {_} from '../../../../utils/validations'
import styles from '../styles'
import { Question } from '../../../VisitHistory/VisitHistoryServiceDetails/AssesmentQuestion';
const PROGRESSBAR_WIDTH = setValueBasedOnWidth(120)
export const TasksList = (props) => {
    const {serviceTaskDescription,statusId, displayDivider} = props
    let divider = displayDivider ? <View style={styles.divider} /> : null
    let textStyle = (statusId === COMPLETED_TASK_STATUS_ID || statusId === SERVICE_STATES.PAYMENT_PENDING) ? styles.completedTaskText : styles.inCompletedTaskText
    return (
        <View>
            <View style={styles.leftBorder}>
            <View style={styles.subTask}>
                <Text style={[textStyle,styles.margin]}>{serviceTaskDescription}</Text>
            </View>
            {divider}
        </View>
        <View style={styles.dot} />
        </View>
    )
}


export const Task = (props) => {
    const {serviceTypeDescription,showDivider,
        isOpened,serviceRequestTypeDetailsId, serviceRequestTypeTaskVisits, onPressTask} = props
    let completedTasksCount = serviceRequestTypeTaskVisits.filter(task => task.statusId === COMPLETED_TASK_STATUS_ID || task.statusId === SERVICE_STATES.PAYMENT_PENDING).length
    let tasksCount = serviceRequestTypeTaskVisits.length
    const onPress = () => {
        onPressTask(serviceRequestTypeDetailsId)
    }
    let content = null
    let serviceTypeId = null
    serviceRequestTypeTaskVisits.map((taskVisit, index) => {
        if(index === 0 && !serviceTypeId){
            serviceTypeId = taskVisit.serviceTypeId
        }
    })
    if(isOpened){
        content = serviceRequestTypeTaskVisits.map((taskVisit, index) => {
            let displayDivider = index !== serviceRequestTypeTaskVisits.length - 1
            return <TasksList displayDivider={displayDivider} {...taskVisit} key={index} />
        })
    }
    let divider = showDivider ? <View style={styles.divider} /> : null

    return (
        <View>
        <TouchableOpacity onPress={onPress} style={styles.service}>
            <View style={styles.serviceDetails}>
                <CoreoImage source={getServiceIcon("serviceType" + serviceTypeId)} style={styles.serviceIcon} />
                <View>
                    <Text style={styles.text}>{serviceTypeDescription}</Text>
                    <View style={styles.tasksStatus}>
                        <Text style={[styles.text, styles.timerText]}>{completedTasksCount}/{tasksCount}</Text>
                        <Text style={styles.text}> tasks completed</Text>
                    </View>
                </View>
            </View>
            <Icon {...Icons.arrowDown} size={setFontSize(18)} />
            </TouchableOpacity>
          <View>
          {content}
         </View>
         {divider}
        </View>
    )
}

export const PeformedTasks = (props) => {
    const {performTasksList, onPressTask, openedTasks, imageKey} = props
    let content = performTasksList && performTasksList.serviceRequestTypeVisits && performTasksList.serviceRequestTypeVisits.map((task, index) => {
        let showDivider = index !== performTasksList.serviceRequestTypeVisits.length - 1
        return <Task imageKey={imageKey} showDivider={showDivider} isOpened={openedTasks[task.serviceRequestTypeDetailsId]}  onPressTask={onPressTask} {...task} key={index} />
    })
    return (
        <View>
            <View style={styles.serviceContianer}>
                {content}
            </View>
        </View>
    )
}

class PerformTasks extends Component {
    constructor(props){
        super(props)
        this.state = {
            openedTasks: {}
        }
    }

    onPressTask = (id) => {
        let openedTasks = {...this.state.openedTasks}
        if(openedTasks[id]){
            delete openedTasks[id]
            this.setState({openedTasks})
        }else{
            this.setState({openedTasks: {...openedTasks, [id]: id}})
        }
    }

    completedTasksCount = () => {
        const {questionsList} = this.props
        let completedTasks = 0;
        let totalTasksCount = questionsList && questionsList.length || 0;
        questionsList && questionsList.map(question => {
            if(question.selectedAnswer) completedTasks++
        })
        let percent = (completedTasks/totalTasksCount) * 100
        let progressBarWidth = PROGRESSBAR_WIDTH * (percent / 100)
        return {
            percent: Math.round(percent),
            progressBarWidth
        }
    }

    renderQuestionaire = () => {
        const { questionsList } = this.props
        return questionsList && questionsList.map((question,index) => {
            return  <Question
            key={index}
            {...question}
            index={index}
            editable={false}/>
        })
    }

    render() {
        const {PerformTasksList, onClickNext} = this.props
        const {percent, progressBarWidth} = this.completedTasksCount()
        const {visitStartTime, visitEndTime, visitStatusId, visitTimeDuration} = PerformTasksList || {}
        let text = "Scheduled at"
        let stopWatch = null
        if(visitStartTime){
            text = "Started at"
            stopWatch = <StopWatch duration={Number(visitTimeDuration)} stopTimer={visitStatusId===SERVICE_STATES.PAYMENT_PENDING || visitStatusId===SERVICE_STATES.COMPLETED} endTime={visitEndTime} startTime={visitStartTime} />
        }
        return (
            <View>
                <View style={styles.tasksContainer}>
                    <View style={[styles.detailsContainer, styles.margin]}>
                        <Text style={styles.text}>{text} {getUTCFormatedDate(visitStartTime)}</Text>
                        <View style={styles.flexDirection}>
                            {stopWatch}
                        </View>
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.margin}>{this.renderQuestionaire()}</View>
                </View>
                <View style={styles.progresssBarContainer}>
                    <View style={styles.taskSummary}>
                        <Text style={styles.text}>Tasks</Text>
                        <ProgressBar containerStyle={{width: PROGRESSBAR_WIDTH}} progressStyle={{width: progressBarWidth}} />
                        <Text style={styles.text}>{percent} %</Text>
                    </View>
                   {PerformTasksList && PerformTasksList.visitStatusId === SERVICE_STATES.PAYMENT_PENDING ||
                    PerformTasksList && PerformTasksList.visitStatusId === SERVICE_STATES.COMPLETED ?
                     <TouchableOpacity onPress={onClickNext}>
                        <Text style={styles.buttonText}>Next</Text>
                    </TouchableOpacity> : null}
                </View>
            </View>
        )
    }
}

export default PerformTasks