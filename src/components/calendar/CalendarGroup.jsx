export default function CalendarGroup({calendars}) {
    return (
        <>
            {
                calendars && calendars.map((calendar) => {
                    return (
                        <option value={calendar.id} key={calendar.id}>{calendar.summary}</option>
                    )
                })
            }
        </>

    )
}

