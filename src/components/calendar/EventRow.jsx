import {format, parseISO} from "date-fns"
import {useContext, useState} from "react"
import ConfirmDeleteDialog from "./ConfirmDeleteDialog"
import {CalendarContext} from "../../contexts/CalendarContext";
import googleEventDateFormatter from '../../utils/eventDateFormatter'

export default function EventRow({event}) {

    // prepare dates for display
    const dateTime = {
        date: format(googleEventDateFormatter(event, 'start'), 'dd.MM.yyyy.'),
        startTime: format(googleEventDateFormatter(event, 'start'), 'HH:mm'),
        endTime: format(googleEventDateFormatter(event, 'end'), 'HH:mm'),
    }

    const {selectedRange, writeAccess} = useContext(CalendarContext)


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
                    <div className="time">{event.start.dateTime ? `${dateTime.startTime} - ${dateTime.endTime}` : 'All-day'}</div>
                </div>
            </div>
            {
                writeAccess && <div className="event-controls">
                    <button className="button-rounded button-secondary" onClick={handleDelete}>Delete</button>
                </div>
            }
        </div>
    )
}