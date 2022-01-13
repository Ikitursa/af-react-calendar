export default function Calendar() {

    return (
        <div className="calendar">
            <h2>Calendar</h2>

            <div className="container">
                <div className="menu-wrapper">
                    <div className="display-menu">
                        <div className="display-option active">1 Day</div>
                        <div className="display-option active">7 Days</div>
                        <div className="display-option active">30 Days</div>
                    </div>
                    <div className="refresh">Refresh</div>
                </div>



                <div className="wrapper-card">

                    <div className="group-wrapper">
                        <div className="group-title">Monday/Today<span className="group-date">17.1.2022</span></div>
                        <div className="event-group">

                            <div className="event-row">
                                <div className="event-information">
                                    <div className="event-name">EVENT NAME</div>
                                    <div className="event-time-date">
                                        <div className="time">9:00 - 10:00</div>
                                    </div>
                                </div>
                                <div className="event-controls">
                                    <button className="event-button">Delete</button>
                                </div>
                            </div>

                            <div className="event-row">
                                <div className="event-information">
                                    <div className="event-name">Super long event name Super long event name Super long event name Super long event name Super long event name Super long event name Super long event name Super long event name Super long event name Super long event name Super long event name Super long event name</div>
                                    <div className="event-time-date">
                                        <div className="time">14:00 - 17:00</div>
                                    </div>
                                </div>
                                <div className="event-controls">
                                    <button className="event-button">Delete</button>
                                </div>
                            </div>

                            <div className="event-row">
                                <div className="event-information">
                                    <div className="event-name">Nap time</div>
                                    <div className="event-time-date">
                                        <div className="time">19:00 - 21:00</div>
                                    </div>
                                </div>
                                <div className="event-controls">
                                    <button className="event-button">Delete</button>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="group-wrapper">
                        <div className="group-title">Week 3<span className="group-date">17.1.2022 - 23.1.2022</span></div>
                        <div className="event-group">

                            <div className="event-row">
                                <div className="event-information">
                                    <div className="event-name">EVENT NAME</div>
                                    <div className="event-time-date">
                                        <div className="date">17.1.2022</div>
                                        <div className="time">9:00 - 10:00</div>
                                    </div>
                                </div>
                                <div className="event-controls">
                                    <button className="event-button">Delete</button>
                                </div>
                            </div>

                            <div className="event-row">
                                <div className="event-information">
                                    <div className="event-name">Super long event name Super long event name Super long event name Super long event name Super long event name Super long event name Super long event name Super long event name Super long event name Super long event name Super long event name Super long event name</div>
                                    <div className="event-time-date">
                                        <div className="date">17.1.2022</div>
                                        <div className="time">14:00 - 17:00</div>
                                    </div>
                                </div>
                                <div className="event-controls">
                                    <button className="event-button">Delete</button>
                                </div>
                            </div>

                            <div className="event-row">
                                <div className="event-information">
                                    <div className="event-name">Nap time</div>
                                    <div className="event-time-date">
                                        <div className="date">17.1.2022</div>
                                        <div className="time">19:00 - 21:00</div>
                                    </div>
                                </div>
                                <div className="event-controls">
                                    <button className="event-button">Delete</button>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}