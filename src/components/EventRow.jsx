import {format, parseISO} from "date-fns";

export default function EventRow({event}) {

    const dateTime = {
        date: format(parseISO(event.start.dateTime), 'dd-MM-yyyy'),
        startTime: format(parseISO(event.start.dateTime), 'HH:mm'),
        endTime: format(parseISO(event.end.dateTime), 'HH:mm'),
    }

    return (
        <div className="event-row">
            <div className="event-information">
                <div className="event-name">{event.summary}</div>
                <div className="event-time-date">
                    <div className="date">{dateTime.date}</div>
                    <div className="time">{dateTime.startTime} - {dateTime.endTime}</div>
                </div>
            </div>
            <div className="event-controls">
                <button className="event-button">Delete</button>
            </div>
        </div>
    )
}