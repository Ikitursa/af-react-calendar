import {useState, useEffect} from 'react'
import axios from "axios";
import {addDays, endOfDay, format, isWithinInterval, startOfToday, parseISO} from "date-fns";
import {forIn, groupBy} from "lodash";

import CalendarRangeSelector from "./CalendarRangeSelector";
import EventGroup from "./EventGroup";


/**
 * @param {Object} options
 * @param {Array} options.eventSet - List of prefiltered events
 * @param {String} options.groupByTerm - The term by which the events will be grouped
 * @param {String} [options.namePrefix]
 */
function groupPreparer(options) {
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


export default function Calendar() {

    const [calendarEvents, setCalendarEvents] = useState(null)
    const [groupedEvents, setGroupedEvents] = useState(null)
    const [selectedRange, setSelectedRange] = useState(7)

    const ranges = [1, 7, 30]

    const fetchEvents = () => {
        const calendarId = process.env.REACT_APP_API_CALENDAR_ID
        const apiKey = process.env.REACT_APP_API_KEY
        const url = `${process.env.REACT_APP_API_BASE_URL}/${calendarId}/events?key=${apiKey}`

        axios.get(url).then(response => {

            setCalendarEvents(response.data.items)

        }).catch(error => {
            console.log(error)
        })
    }

    const groupEvents = () => {

        if (calendarEvents) {

            let groups = []

            const startDate = startOfToday()
            const timeSpan = {
                start: startDate,
                end: endOfDay(addDays(startDate, selectedRange - 1))
            }

            const filteredEvents = calendarEvents.filter(event => {
                return isWithinInterval((parseISO(event.start.dateTime)), timeSpan)
            })


            switch (selectedRange) {

                case 1:
                    groups = [
                        {
                            name: 'Today',
                            events: filteredEvents
                        }
                    ]

                    break;
                case 7:

                    groups = groupPreparer({
                        eventSet: filteredEvents,
                        groupByTerm: 'dd.MM.yyyy'
                    })

                    break;

                case 30:

                    groups = groupPreparer({
                        eventSet: filteredEvents,
                        groupByTerm: 'ww - yyyy',
                        namePrefix: 'Week'
                    })

                    break;
            }


            setGroupedEvents(groups)
        }
    }

    useEffect(() => {
        fetchEvents()
    }, [])

    useEffect(() => {
        groupEvents()
    }, [calendarEvents, selectedRange])

    return (
        <div className="calendar">
            <h2>Calendar</h2>

            <div className="container">
                <div className="menu-wrapper">
                    <div className="display-menu">
                        {
                            ranges.map(range => {
                                return (
                                    <CalendarRangeSelector
                                        key={range}
                                        range={range} selectedRange={selectedRange}
                                        updateRange={() => setSelectedRange(range)}
                                    />
                                )
                            })
                        }
                    </div>
                    <div onClick={fetchEvents} className="refresh">Refresh</div>
                </div>


                <div className="wrapper-card">


                    {groupedEvents ? groupedEvents.map((group, index) => {
                        return (<EventGroup group={group} key={index}/>)
                    }) : ''}


                    {/*
                //EVENT GROUP
                <div className="group-wrapper">
                    <div className="group-title">Week 3<span className="group-date">17.1.2022 - 23.1.2022</span>
                    </div>
                    <div className="event-group">

                        <div className="event-row">
                            <div className="event-information">
                                <div className="event-name">EVENT NAME</div>
                                <div className="event-time-date">
                                    <div className="date">17.1.2022</div>
                                    <div className="time">9:00 - 10:00</div>
                                </div>
                            </div>
                            <div className="event-controls">
                                <button className="event-button">Delete</button>
                            </div>
                        </div>

                    </div>
                </div>*/}

                </div>
            </div>
        </div>
    );
}