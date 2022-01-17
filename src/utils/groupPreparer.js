import {forIn, groupBy} from "lodash";
import {format, parseISO, parse} from "date-fns";
import googleEventDateFormatter from "./eventDateFormatter";

/**
 * @param {Object} options
 * @param {Array} options.eventSet - List of prefiltered events
 * @param {String} options.groupByTerm - The term by which the events will be grouped
 * @param {String} [options.namePrefix]
 */
export default function groupPreparer(options) {
    let groups = []
    const groupedEvents = groupBy(options.eventSet, (event) => {
        // google api has different props for specific events. depending on how the event was created
        // we may get models with dateTime or date
        const eventDate = googleEventDateFormatter(event, 'start')

        return format(eventDate, options.groupByTerm)
    })

    forIn(groupedEvents, (events, name) => {
        groups.push({
            name: options.namePrefix ? `${options.namePrefix} ${name}` : name,
            events
        })
    })
    return groups
}