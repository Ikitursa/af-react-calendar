import {useState, useEffect} from 'react'
import {addDays, endOfDay, isWithinInterval, startOfToday, parseISO, parse} from "date-fns"

import CalendarRangeSelector from "../components/calendar/CalendarRangeSelector"
import EventGroup from "../components/calendar/EventGroup"
import HeaderBar from "../components/layout/HeaderBar"
import EventCreate from "../components/calendar/EventCreate"
import Spinner from "../components/layout/Spinner"

import {CalendarContext} from "../contexts/CalendarContext"
import groupPreparer from "../utils/groupPreparer"
import CalendarGroup from "../components/calendar/CalendarGroup"
import googleEventDateFormatter from '../utils/eventDateFormatter'

export default function Calendar() {


    // stores the list of user calendars
    const [userCalendars, setUserCalendars] = useState(null)

    // currently selected calendar
    const [activeUserCalendar, setActiveUserCalendar] = useState(null)

    // tracks if the currently selected calendar has write mode
    const writeAccessRoles = ['owner', 'writer']
    const [writeAccess, setWriteAccess] = useState(false)

    const [groupedCalendars, setGroupedCalendars] = useState({
        write: [],
        readOnly: []
    })

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

    const handleChangeActiveCalendar = (e) => {
        const newActiveCalendar = userCalendars.find(calendar => calendar.id === e.target.value)
        setActiveUserCalendar(newActiveCalendar)
    }

    // fetches events from the calendar
    const fetchEvents = () => {
        setCalendarEvents(null)
        const calendarId = activeUserCalendar.id

        window.gapi.client.calendar.events.list({
            calendarId,
            showDeleted: false,
            singleEvents: true,
            maxResults: 100,
            orderBy: 'startTime'
        }).then(response => {
            setCalendarEvents(response.result.items)
        }).catch(error => console.log('gapi calendar error fetch events', error))
    }


    const fetchUserCalendars = () => {
        window.gapi.client.calendar.calendarList.list().then(response => {
            const fetchedCalendars = response.result.items
            setUserCalendars(fetchedCalendars)

            // pre-set the first calendar on the list as our default
            if (fetchedCalendars.length) {
                setActiveUserCalendar(fetchedCalendars[0])
            }
        }).catch(error => console.log('gapi calendar error fetch calendars', error))
    }


    // group user calendars by access type for our dropdown menu
    const groupCalendars = () => {

        const calendarGroups = {
            write: [],
            readOnly: []
        }

        if (userCalendars) {

            userCalendars.forEach(calendar => {
                if (writeAccessRoles.includes(calendar.accessRole)) {
                    calendarGroups.write.push(calendar)
                } else {
                    calendarGroups.readOnly.push(calendar)
                }
            })
        }

        setGroupedCalendars(calendarGroups)
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
                const eventStartDate = googleEventDateFormatter(event, 'start')
                return isWithinInterval(eventStartDate, timeSpan)
            })

            switch (selectedRange) {
                case 1:
                    if (filteredEvents.length) {
                        groups = [
                            {
                                name: 'Today',
                                events: filteredEvents
                            }
                        ]
                    }
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

    // fetch calendars on first component load
    useEffect(() => {
        fetchUserCalendars()
    }, [])


    // fetch events if the active calender exists or changes
    useEffect(() => {
        if (activeUserCalendar) {
            setWriteAccess(writeAccessRoles.includes(activeUserCalendar.accessRole))
            fetchEvents()
        }
    }, [activeUserCalendar])

    // recalculate/prepare our events on every range selection change or API call
    useEffect(() => {
        groupEvents()
    }, [calendarEvents, selectedRange])

    useEffect(() => {
        groupCalendars()
    }, [userCalendars])

    return (

        activeUserCalendar && <div className="calendar">
            <HeaderBar/>
            <CalendarContext.Provider value={{fetchEvents, selectedRange, activeUserCalendar, writeAccess}}>
                {createDialogVisible && <EventCreate close={handleCloseCreate}/>}
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
                            <select className="calendar-select" value={activeUserCalendar.id}
                                    onChange={handleChangeActiveCalendar}
                            >
                                {
                                    groupedCalendars.write.length &&
                                    <CalendarGroup calendars={groupedCalendars.write}/>

                                }
                                {
                                    groupedCalendars.readOnly && <>
                                        <option disabled>--Read only--</option>
                                        <CalendarGroup calendars={groupedCalendars.readOnly}/>
                                    </>


                                }
                            </select>

                            {writeAccess ?
                                <button className="button-rounded new-event button-orange"
                                        onClick={handleOpenCreate}>New event
                                </button> : <div className="read-only-access">Read only access</div>}

                        </div>

                        {groupedEvents && groupedEvents.length ?
                            groupedEvents.map((group, index) => {
                                return (<EventGroup group={group} key={index}/>)
                            })
                            : groupedEvents ? <p className="no-events">No events for the selected time range</p> :
                                <Spinner size={'small'}/>}
                    </div>
                </div>
            </CalendarContext.Provider>
        </div>


    )
}