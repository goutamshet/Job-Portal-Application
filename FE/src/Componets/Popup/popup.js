

const PopUp = ({message,closePopUp}) => {
    return (
        <div className="pop-up-container">
            <div className="alert-heading">
                Alert
            </div>
            <div className="alert-message">
                {message}
            </div>
            <div>
                <button className="close-button" onClick={closePopUp}>Close</button>
            </div>
        </div>
    )
}