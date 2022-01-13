import {useState, useEffect} from 'react'
import axios from "axios";
import isToday from 'date-fns/isToday'
import parseISO from 'date-fns/parseISO'
import {addDays, endOfDay, format, isWithinInterval, startOfToday} from "date-fns";

import EventGroup from "./EventGroup";


export default function Calendar() {

    const [calendarEvents, setCalendarEvents] = useState(null)
    const [groupedEvents, setGroupedEvents] = useState(null)
    const [selectedRange, setSelectedRange] = useState(7)

    const fetchEvents = () => {
        const calendarId = process.env.REACT_APP_API_CALENDAR_ID
        const apiKey = process.env.REACT_APP_API_KEY
        const url = `${process.env.REACT_APP_API_BASE_URL}/${calendarId}/events?key=${apiKey}`

        axios.get(url).then(response => {
            console.log(response)
            setCalendarEvents(response.data.items)
        }).catch(error => {
            console.log(error)
        })
    }

    const groupEvents = () => {
        console.log('entered groupEvents')
        if (calendarEvents) {
            console.log('calendarEvents is TRUE')
            let groups = []

            const startDate = startOfToday()
            const timeSpan = {
                start: startDate,
                end: endOfDay(addDays(startDate, selectedRange - 1))

            }
            console.log('Timespan is:', timeSpan)
            let filteredEvents = calendarEvents.filter(event => {
                return isWithinInterval((parseISO(event.start.dateTime)), timeSpan)
            })
            console.log('filtered events----->>>', filteredEvents)


       if (selectedRange/* === 1*/) {

            groups = [
                {
                    name: 'Today',
                    //it will show the proper group date or timespan later
                    groupTimeSpan: format(startOfToday(),'dd-MM-yyyy'),
                    events: filteredEvents
                }
            ]


        } else {
            groups = [
                {
                    name: '13.01.2022.',
                    groupTimeSpan: 'dd-MM-yyyy',
                    events: [{}]
                },
                {
                    name: '14.01.2022.',
                    groupTimeSpan: 'dd-MM-yyyy',
                    events: [{}]
                }
            ]
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
                    <div className="display-option">1 Day</div>
                    <div className="display-option active">7 Days</div>
                    <div className="display-option">30 Days</div>
                </div>
                <div onClick={fetchEvents} className="refresh">Refresh</div>
            </div>


            <div className="wrapper-card">


                { groupedEvents ? groupedEvents.map((group, index) => {
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