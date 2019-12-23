import moment from 'moment';
import { DATE_FORMAT, DATE_YEAR, DAYS, DATE_FORMATS } from '../constants/constants';

export const getPrintDateFormat = (date) => `${getFormatedDate(date, "ddd")}, ${ 
        getFormatedDate(date, "DD MMM")}`

export const formatDate = (date) => moment(new Date(date.toString())).format('MMM DD YYYY')

export const formatDateMMDDYYYY = (date, dateFormat = "MM/DD/YYYY") => moment(new Date(date.toString())).format(dateFormat)
export function isFutureDay(date) {
    let difference = moment(date).diff(moment(), "days")

    return difference >= 0
}


export const formatDateAgo = (date) => {
    let time = moment.utc(date).local()
.fromNow()

    if (time && (time.toLowerCase() === 'a few seconds ago' || time.toLowerCase() === "in a few seconds")){
        return 'just now'
    }
    return time
     // return moment(date).startOf('hour').fromNow()
 };

 export const convert24To12HoursFormat = (time) => {
   return moment(time, [DATE_FORMATS.HH_MM_A]).format(DATE_FORMATS.HH_MM_A)
 }
export function formateStateDate(data) {
    return moment(data);
}

export function getFormatedDate(date, dateFormat = DATE_FORMAT){
    return moment(date).format(dateFormat)
}

export function get12HourTimeFormat(timeString) {
    let HH = Number(timeString.substr(0, 2));
    let hh = HH % 12 || 12;
    let ampm = HH < 12 || HH === 24 ? " AM" : " PM";

    timeString = hh + timeString.substr(2, 3) + ampm;
    return timeString
}

export function getTodayDate(dateFormat = DATE_FORMAT){
    return moment().format(dateFormat)
}

export function getFormatedMonthAndDate(date){
    return moment(date).format("DD MMM")
}

export function getFormatedMonthAndDateCareTeam(date){
    return moment(date, "MM-DD-YYYY").format("DD MMM")
}

export function formattedDateMoment(date){
    return date ? moment(new Date(date.toString())).format(DATE_FORMAT) : null;
 }

 function pad(num){
     return `0${num}`.slice(-2)
 }

 export function getTimeDiffInHours(fromDate, toDate) {
    let secondsDiff = moment(toDate).diff(moment(fromDate), "seconds"),
     minutes = Math.floor(secondsDiff / 60)

    secondsDiff %= 60
    let hours = Math.floor(minutes / 60)

    minutes %= 60
    return `${pad(hours)}:${pad(minutes)}` //+":"+pad(secondsDiff)
}

export function getTimeDiffFromNow(date){
    return moment().diff(moment(date), "seconds")
}

export function getTotalTime(time){
    let duration = moment.duration(currState.actualTimeDiff),

     hours = duration.days() * 24 + duration.hours(),

     min = duration.minutes();

    return `${hours}:${min}`;
}
export const getDayOfDate = (date) => {
    let dayIndex = moment(date).day()
    let index = dayIndex === 0 ? DAYS.length - 1 : dayIndex - 1

    return DAYS[index]
}

export const getCareTeamDefaultDates = () => {
    let startDate = moment().add(-3, "months")
.utc()
.format("MM/DD/YYYY"),
     endDate = moment().utc()
.format("MM/DD/YYYY")

    return {startDate, endDate}
}

export const AddDays = (date, noOfDays, format) => moment(date, format).add("days", noOfDays)

export const AddMonths = (date, noOfMonths) => moment(date, DATE_FORMAT).add("months", noOfMonths)

export function addMonthsInFormat(date, noOfMonths, format = "YYYY-MM-DD"){
    return moment(date).add("months", noOfMonths)
.format(format)
}

export function formatYearDate(dateFormat = DATE_YEAR) {
    return moment().format(dateFormat);
}

export function getFormatedYear(date){
    try {
        let dateText = date.split("-")

        if (dateText && dateText.length && dateText[2]) {
            return dateText[2]
        }
        return ""
    } catch (e) {
        return null
    }
}

export function getTimeDiff (startDate, endDate){
    return moment(startDate).format("DD MMM") - moment(endDate).format("DD MMM")
}




export function addOrSubtractMonths(months){
    return moment().add(months, 'month')
.format("YYYY-MM-DD")
}

export function getStartAndEndDateForCalendar(){
    let startDate = moment().add(-3, "months")
.format("YYYY-MM-DD"),
     endDate = moment().add(3, "months")
.format("YYYY-MM-DD")

    return {startDate, endDate}
}

export function convertUTCTime(date, dateFormat = "hh:mm a"){
    let gmtDateTime = moment.utc(date),
     local = gmtDateTime.local().format()

    return moment().diff(local, "seconds")
}

export function getTimeDiffOfTwoTimes(startTime, endTime){
    let gmtDateTime = moment.utc(startTime),
     local = gmtDateTime.local(),
     gmtEndDateTime = moment.utc(endTime),
     localEndTime = gmtEndDateTime.local()

    return localEndTime.diff(local, "seconds")
}
export function getUTCFormatedDate(date, dateFormat = "hh:mm A"){
    let gmtDateTime = moment.utc(date),
     local = gmtDateTime.local().format(dateFormat)

    return local
}

export const getDate = (date) => moment(date).format("DD")

export function getYesterdayDate() {
    let today = new Date(),
     yesterday = new Date(today);

    yesterday.setDate(today.getDate() - 1);
    yesterday = new Date(yesterday).toJSON()
.slice(0, 10)
.replace(/-/g, '-')
    return yesterday
}

export function getTomorrowDate() {
    let today = new Date(),
     yesterday = new Date(today);

    yesterday.setDate(today.getDate() + 1);
    yesterday = new Date(yesterday).toJSON()
.slice(0, 10)
.replace(/-/g, '-')
    return yesterday
}

export function getDateBasedOnNumber(days) {
    let today = new Date(),
     date = new Date(today);

    date.setDate(today.getDate() + days);
    date = new Date(date).toJSON()
.slice(0, 10)
.replace(/-/g, '-')
    return date
}

export function getUtcTimeDiff(startTime, endTime) {
    if (endTime) {
 return getTimeDiffOfTwoTimes(startTime, endTime) 
}
    let gmtDateTime = moment.utc(startTime),
     utcTime = new Date().getTime();

    return utcTime.diff(gmtDateTime, "seconds")
}

export function getTimeZoneOffset (){
    return new Date().getTimezoneOffset()
}

export function getCurrentTime() {
    return moment()
}

export function getCurrentLocalDateFromUtc(DD_MMM_HH_MM){
    return moment.utc().local().format(DD_MMM_HH_MM)

 } 	

function subtractMonth(count, format = DATE_FORMATS.MMM_YYYY){
   return moment().subtract(count, 'months').format(format)   
}

function addMonths(count, format = DATE_FORMATS.MMM_YYYY){
    return moment().add(count, "months").format(format)
}

export function getYearDropDownValues() {
    const firstMonth = { label: subtractMonth(1), value: subtractMonth(1, DATE_FORMATS.MM_YYYY) }
    const secondMonth = { label: subtractMonth(2), value: subtractMonth(2, DATE_FORMATS.MM_YYYY) }
    const thirdMonth = { label: subtractMonth(3), value: subtractMonth(3, DATE_FORMATS.MM_YYYY) }
    const fourthMonth = { label: formatYearDate(DATE_FORMATS.MMM_YYYY), value: formatYearDate(DATE_FORMATS.MM_YYYY) }
    const fifthMonth = { label: addMonths(1), value: addMonths(1, DATE_FORMATS.MM_YYYY) }
    const sixthMonth = { label: addMonths(2), value: addMonths(2, DATE_FORMATS.MM_YYYY) }
    const monthList = [thirdMonth, secondMonth, firstMonth, fourthMonth, fifthMonth, sixthMonth]

    return monthList
}


export function getCurrentDate () {
    return moment().date()
}