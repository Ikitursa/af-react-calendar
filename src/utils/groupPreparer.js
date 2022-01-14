import {forIn, groupBy} from "lodash";
import {format, parseISO} from "date-fns";

/**
 * @param {Object} options
 * @param {Array} options.eventSet - List of prefiltered events
 * @param {String} options.groupByTerm - The term by which the events will be grouped
 * @param {String} [options.namePrefix]
 */
export default function groupPreparer(options) {
    let groups = []
    const groupedEvents = groupBy(options.eventSet, (event) => {
        return format(parseISO(event.start.dateTime), options.groupByTerm)
    })
    forIn(groupedEvents, (events, name) => {
        groups.push({
            name: options.namePrefix ? `${options.namePrefix} ${name}` : name,
            events
        })
    })
    return groups
}