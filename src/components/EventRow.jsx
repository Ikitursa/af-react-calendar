import {format, parseISO} from "date-fns";
import {useState} from "react";
import ConfirmDeleteDialog from "./ConfirmDeleteDialog";

export default function EventRow({event}) {

    const dateTime = {
        date: format(parseISO(event.start.dateTime), 'dd-MM-yyyy'),
        startTime: format(parseISO(event.start.dateTime), 'HH:mm'),
        endTime: format(parseISO(event.end.dateTime), 'HH:mm'),
    }

    const[deleteDialogVisible, setDeleteDialogVisible] = useState(false)
    const handleDelete = () => {
        setDeleteDialogVisible(true)
    }

    return (

        <div className="event-row">
            {
                deleteDialogVisible && <ConfirmDeleteDialog event={event} close={() => setDeleteDialogVisible(false)}/>
            }
            <div className="event-information">
                <div className="event-name">{event.summary}</div>
                <div className="event-time-date">
                    <div className="date">{dateTime.date}</div>
                    <div className="time">{dateTime.startTime} - {dateTime.endTime}</div>
                </div>
            </div>
            <div className="event-controls">
                <button className="event-button" onClick={handleDelete}>Delete</button>
            </div>
        </div>
    )
}