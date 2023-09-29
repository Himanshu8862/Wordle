import "./CustomModal.css"

const CustomModal = ({ customWordMsg, handleCustomWordSumbit, customWord, setCustomWord }) => {
    return (
        <div className='custom-modal'>
            <b>MAKE CUSTOM WORDLE</b>
            <p>Enter a word of length 5</p>
            <input
                className='custom-input'
                type="text"
                value={customWord}
                onChange={(e) => setCustomWord(e.target.value.toUpperCase())}
            />
            <button onClick={handleCustomWordSumbit} className="btn copy-btn">Share custom wordle link</button>
            <button className="btn random-btn"><a style={{ color: "white" }} href="/"> Play a random word </a></button>
            <p className={`custom-word-msg ${customWordMsg === "Link copied to clipboard" ? "copied" : ""}`}>
                {customWordMsg}
            </p>

        </div>
    )
}

export default CustomModal