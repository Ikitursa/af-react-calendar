export default function Spinner({size = ''}) {
    return (
        <div className={`spinner-wrap ${size}`}>
            <div className="spinner"></div>
        </div>
    )
}