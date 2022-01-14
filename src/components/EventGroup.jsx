import EventRow from "./EventRow";

export default function EventGroup({group}) {
    return (
        <div className="group-wrapper">
            <div className="group-title">{group.name}</div>
            <div className="event-group">
                {
                    group.events.map((event, index) => {
                        return (
                            <EventRow event={event} key={index}/>
                        )
                    })
                }

            </div>
        </div>
    )
}


