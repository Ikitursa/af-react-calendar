import {useState, useEffect} from 'react'
import axios from "axios";
import {addDays, endOfDay, format, isWithinInterval, startOfToday, parseISO} from "date-fns";
import {forIn, groupBy} from "lodash";


import CalendarRangeSelector from "./CalendarRangeSelector";
import EventGroup from "./EventGroup";
import HeaderBar from "./HeaderBar";
import EventCreate from "./EventCreate";


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

    const[createDialogVisible, setCreateDialogVisible] = useState(false)

    const handleOpenCreate = () => {
        setCreateDialogVisible(true)
    }
    const handleCloseCreate = () => {
        setCreateDialogVisible(false)
    }



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
            <HeaderBar/>

            {
                createDialogVisible && <EventCreate close={handleCloseCreate}/>
            }

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
                    <button onClick={fetchEvents} className="refresh">Refresh</button>
                </div>


                <div className="wrapper-card">

                    <div className="calendar-controls">
                        <button className="button-rounded" onClick={handleOpenCreate}>New event</button>
                    </div>

                    {groupedEvents ? groupedEvents.map((group, index) => {
                        return (<EventGroup group={group} key={index}/>)
                    }) : ''}

                </div>
            </div>
        </div>
    );
}