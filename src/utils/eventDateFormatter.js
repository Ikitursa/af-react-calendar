import {parse, parseISO} from 'date-fns'

/**
 * @param {Object} event - Google event object
 * @param {String} timestampType - which event property we need to check for
 */
export default function googleEventDateFormatter (event, timestampType) {
    return event[timestampType].dateTime ? parseISO(event[timestampType].dateTime) : parse(event[timestampType].date, 'yyyy-MM-dd', new Date())
}