import {format, parseISO} from "date-fns"
import {EventsContext} from "../../contexts/RefreshEvents"
import {useContext} from "react"

export default function ConfirmDeleteDialog({close, event}) {

    const {fetchEvents} = useContext(EventsContext)

    // prepare dates for display
    const dateTime = {
        date: format(parseISO(event.start.dateTime), 'dd.MM.yyyy'),
        startTime: format(parseISO(event.start.dateTime), 'HH:mm'),
        endTime: format(parseISO(event.end.dateTime), 'HH:mm'),
    }

    // sends an API call to delete the event
    const deleteEvent = () => {
        window.gapi.client.calendar.events.delete({
            calendarId: process.env.REACT_APP_API_CALENDAR_ID,
            eventId: event.id
        }).then(() => {
            fetchEvents()
            close()
        })
    }

    return (
        <div className="popup-container">
            <div className="backdrop">
                <div className="wrapper-card popup centered-popup">
                    <div>
                        <div className="delete-info">
                            <p>Are you sure you want to delete:</p>
                            <p className="event-title">{event.summary}</p>
                            <p>{dateTime.date}</p>
                            <p>{dateTime.startTime} - {dateTime.endTime}</p>
                        </div>

                        <div className="dialog-controls">
                            <button className="button-rounded button-secondary" onClick={close}>Cancel</button>
                            <button className="button-rounded button-orange" onClick={deleteEvent}>Confirm</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}