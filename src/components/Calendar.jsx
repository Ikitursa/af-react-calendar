import {useState, useEffect} from 'react'
import {addDays, endOfDay, format, isWithinInterval, startOfToday, parseISO} from "date-fns"

import CalendarRangeSelector from "./CalendarRangeSelector"
import EventGroup from "./EventGroup"
import HeaderBar from "./HeaderBar"
import EventCreate from "./EventCreate"
import Spinner from "./Spinner"

import {RefreshEventsContext} from "../contexts/RefreshEvents"
import groupPreparer from "../utils/groupPreparer"

export default function Calendar() {

    // stores the API response of events
    const [calendarEvents, setCalendarEvents] = useState(null)
    
    // stores prepared groups of events based on the selected range
    const [groupedEvents, setGroupedEvents] = useState(null)
    
    // active range selection
    const ranges = [1, 7, 30]
    const [selectedRange, setSelectedRange] = useState(7)

    // toggles the "new event" popup form
    const [createDialogVisible, setCreateDialogVisible] = useState(false)
    
    const handleOpenCreate = () => setCreateDialogVisible(true)
    const handleCloseCreate = () => setCreateDialogVisible(false)

    // fetches events from the calendar
    const fetchEvents = () => {
        setCalendarEvents(null)
        const calendarId = process.env.REACT_APP_API_CALENDAR_ID

        window.gapi.client.calendar.events.list({
            calendarId: calendarId,
            showDeleted: false,
            singleEvents: true,
            maxResults: 100,
            orderBy: 'startTime'
        }).then(response => {
            setCalendarEvents(response.result.items)
        }).catch(error => console.log('gapi calendar error', error))
    }

    // groups the events depending on our active range selection
    const groupEvents = () => {

        if (calendarEvents) {

            let groups = []

            const startDate = startOfToday()
            const timeSpan = {
                start: startDate,
                end: endOfDay(addDays(startDate, selectedRange - 1))
            }

            // make our list of events smaller so we don't run heavy computation on a large list
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
                    break
                case 7:
                    groups = groupPreparer({
                        eventSet: filteredEvents,
                        groupByTerm: 'dd.MM.yyyy'
                    })
                    break
                case 30:
                    groups = groupPreparer({
                        eventSet: filteredEvents,
                        groupByTerm: 'ww - yyyy',
                        namePrefix: 'Week'
                    })
                    break
                default:
                    break
            }
            setGroupedEvents(groups)
        } else {
            setGroupedEvents(null)
        }
    }

    // fetch events on first component load
    useEffect(() => {
        fetchEvents()
    }, [])

    // recalculate/prepare our events on every range selection change or API call
    useEffect(() => {
        groupEvents()
    }, [calendarEvents, selectedRange])

    return (
        <div className="calendar">
            <HeaderBar/>
            <RefreshEventsContext.Provider value={{fetchEvents}}>
                {createDialogVisible && <EventCreate close={handleCloseCreate} />}
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
                            <button className="button-rounded new-event button-orange" onClick={handleOpenCreate}>New
                                event
                            </button>
                        </div>
                        {groupedEvents ? groupedEvents.map((group, index) => {
                            return (<EventGroup group={group} key={index}/>)
                        }) : <Spinner size={'small'}/>}
                    </div>
                </div>
            </RefreshEventsContext.Provider>
        </div>
    )
}