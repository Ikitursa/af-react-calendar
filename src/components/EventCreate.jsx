import {useState} from "react";

export default function EventCreate({close}) {

    const [formData, setFormData] = useState({
        summary: '',
        startTimestamp: '',
        endTimestamp: ''
    })


    const summaryHandler = (event) => {
        formData.summary = event.target.value
        setFormData({...formData})
    }

    const startTimestampHandler = (event) => {
        formData.startTimestamp = event.target.value
        setFormData({...formData})
    }

    const endTimestampHandler = (event) => {
        formData.endTimestamp = event.target.value
        setFormData({...formData})
    }


    const postEvent = () => {
        /// insert api call
        console.log('postEvent called')
        close()
    }

    return (

        <div className="popup-container">
            <div className="backdrop">
                <div className="wrapper-card popup centered-popup">
                    <div>
                        <div className="input-wrapper">
                            <label>Event name:<input onInput={summaryHandler} type="text" placeholder="summary"/></label>
                        </div>
                        <div className="input-wrapper">
                            <label>Event start time:<input onInput={startTimestampHandler} type="datetime-local"
                                                           placeholder="start"/></label>
                        </div>
                        <div className="input-wrapper">
                            <label>Event end time:<input onInput={endTimestampHandler} type="datetime-local"
                                                         placeholder="end"/></label>
                        </div>


                    </div>

                    <div className="controls">
                        <button className="event-button" onClick={postEvent}>Submit</button>
                        <button className="event-button" onClick={close}>Cancel</button>
                    </div>

                </div>
            </div>

        </div>

    )
}
