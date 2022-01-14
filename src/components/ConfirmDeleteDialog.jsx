import {format, parseISO} from "date-fns";

export default function ConfirmDeleteDialog({close, event}) {

    const dateTime = {
        date: format(parseISO(event.start.dateTime), 'dd-MM-yyyy'),
        startTime: format(parseISO(event.start.dateTime), 'HH:mm'),
        endTime: format(parseISO(event.end.dateTime), 'HH:mm'),
    }


    const deleteEvent = () => {
        // insert api call
        // insert refresh
        console.log('deleteEvent called')
        close()
    }

    return (

        <div className="popup-container">
            <div className="backdrop">
                <div className="wrapper-card popup centered-popup">
                    <div>
                        <div className="delete-info">
                            <p>Are you sure you want to delete:</p>
                            <p>{event.summary}</p>
                            <p>{dateTime.date}</p>
                            <p>{dateTime.startTime} - {dateTime.endTime}</p>
                        </div>

                        <div className="dialog-controls">
                            <button className="button-rounded" onClick={deleteEvent}>Confirm</button>
                            <button className="button-rounded button-red" onClick={close}>Cancel</button>
                        </div>


                    </div>
                </div>
            </div>

        </div>

    )
}