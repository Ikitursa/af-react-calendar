import {format, parseISO} from "date-fns"
import {useContext, useState} from "react"
import ConfirmDeleteDialog from "./ConfirmDeleteDialog"
import {EventsContext} from "../../contexts/RefreshEvents";

export default function EventRow({event}) {

    // prepare dates for display
    const dateTime = {
        date: format(parseISO(event.start.dateTime), 'dd.MM.yyyy.'),
        startTime: format(parseISO(event.start.dateTime), 'HH:mm'),
        endTime: format(parseISO(event.end.dateTime), 'HH:mm'),
    }

    const {selectedRange} = useContext(EventsContext)

    // toggles the delete confirmation popup
    const [deleteDialogVisible, setDeleteDialogVisible] = useState(false)

    const handleDelete = () => setDeleteDialogVisible(true)

    return (
        <div className="event-row">
            {
                deleteDialogVisible && <ConfirmDeleteDialog event={event} close={() => setDeleteDialogVisible(false)}/>
            }

            <div className="event-information">
                <div className="event-name">{event.summary}</div>
                <div className="event-time-date">
                    {selectedRange === 30 && <div className="date">{dateTime.date}</div>}
                    <div className="time">{dateTime.startTime} - {dateTime.endTime}</div>
                </div>
            </div>
            
            <div className="event-controls">
                <button className="button-rounded button-secondary" onClick={handleDelete}>Delete</button>
            </div>
        </div>
    )
}