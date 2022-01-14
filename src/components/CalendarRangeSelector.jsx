export default function CalendarRangeSelector({range,selectedRange, updateRange}) {

    return (
        <button
            onClick={updateRange}
            className={range === selectedRange ? 'display-option active' : 'display-option'}
        >{range} {range > 1 ? 'Days' : 'Day'}
        </button>

    )

}