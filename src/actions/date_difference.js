export default function date_difference(date){
    let date_now = new Date().getTime()
    let conv_date = new Date(date).getTime()
    let one_day = 1000*60*60*24
    let diff = date_now - conv_date

    return Math.round(diff/one_day)
}