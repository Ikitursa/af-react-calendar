import {useContext, useEffect, useState} from "react"
import {formatRFC3339, parseISO} from 'date-fns'

import {EventsContext} from "../contexts/RefreshEvents"

export default function EventCreate({close, refreshEvents}) {

    const {fetchEvents} = useContext(EventsContext)

    // enables form submit if all mandatory fields are filled
    const [formDisabled, setFormDisabled] = useState(true)

    // keeps the form data
    const [formData, setFormData] = useState({
        summary: '',
        start: {
            dateTime: '',
        },
        end: {
            dateTime: ''
        }
    })

    // toggle form submit button state
    useEffect(() => {
        setFormDisabled(!formData.summary || !formData.start.dateTime || !formData.end.dateTime)
    }, [formData])


    const summaryHandler = (event) => {
        formData.summary = event.target.value
        setFormData({...formData})
    }

    const startTimestampHandler = (event) => {
        formData.start.dateTime = formatRFC3339(parseISO(event.target.value))
        setFormData({...formData})
    }

    const endTimestampHandler = (event) => {
        formData.end.dateTime = formatRFC3339(parseISO(event.target.value))
        setFormData({...formData})
    }

    // submit event to the calendar
    const submitEvent = () => {
        if(formDisabled){
            alert('Please fill in all the form fields')
        }
        else{
            window.gapi.client.calendar.events.insert({
                calendarId: process.env.REACT_APP_API_CALENDAR_ID,
                resource: formData
            }).then(() => {
                fetchEvents()
                close()
            }).catch(error => {
                console.log(error)
                alert(error.result.error.message)
            })
        }
    }

    return (
        <div className="popup-container">
            <div className="backdrop">
                <div className="wrapper-card popup centered-popup">
                    <div>
                        <div className="input-wrapper">
                            <label>Event name:<input onInput={summaryHandler} type="text"/></label>
                        </div>
                        <div className="input-wrapper">
                            <label>Event start time:<input onInput={startTimestampHandler} type="datetime-local"/></label>
                        </div>
                        <div className="input-wrapper">
                            <label>Event end time:<input onInput={endTimestampHandler} type="datetime-local"/></label>
                        </div>
                    </div>

                    <div className="dialog-controls">
                        <button className="button-rounded button-secondary" onClick={close}>Cancel</button>
                        <button className="button-rounded button-orange" onClick={submitEvent} disabled={formDisabled}>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
