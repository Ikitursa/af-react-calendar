import {format, parseISO} from "date-fns"
import {CalendarContext} from "../../contexts/CalendarContext"
import {useContext} from "react"
import googleEventDateFormatter from "../../utils/eventDateFormatter";

export default function ConfirmDeleteDialog({close, event}) {

    const {fetchEvents, activeUserCalendar} = useContext(CalendarContext)

    // prepare dates for display
    const dateTime = {
        date: format(googleEventDateFormatter(event, 'start'), 'dd.MM.yyyy.'),
        startTime: format(googleEventDateFormatter(event, 'start'), 'HH:mm'),
        endTime: format(googleEventDateFormatter(event, 'end'), 'HH:mm'),
    }

    // sends an API call to delete the event
    const deleteEvent = () => {
        window.gapi.client.calendar.events.delete({
            calendarId: activeUserCalendar.id,
            eventId: event.id
        }).then(() => {
            fetchEvents()
            close()
        }).catch(error => {
            console.log(error)
            alert(error.result.error.message)
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
                            <p>{event.start.dateTime ? `${dateTime.startTime} - ${dateTime.endTime}` : 'All-day'}</p>
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