import "./StatModal.css"

const StatModal = ({ shareColors, currentWordIndex, isGameWon }) => {

    const snapshot =
        [
            ['', '', '', '', ''],
            ['', '', '', '', ''],
            ['', '', '', '', ''],
            ['', '', '', '', ''],
            ['', '', '', '', ''],
            ['', '', '', '', ''],
        ]

    for (let i = 0; i < shareColors.length; i++) {
        let m = shareColors[i].length
        for (let j = 0; j < m; j++) {
            let cell = shareColors[i][j];
            if (cell === "cell-black")
                snapshot[i][j] = "⬜ ";
            if (cell === "cell-green")
                snapshot[i][j] = "🟩 "
            if (cell == "cell-yellow")
                snapshot[i][j] = "🟨 "
        }
        snapshot[i] = snapshot[i].join("")
    }

    const copiedText = `Wordle Custom ${isGameWon ? `${currentWordIndex}` : `X`}/6\n\n${snapshot.join("\n")}`

    const handleCopy = async() => {
        const result = await navigator.clipboard.writeText(copiedText);
        // console.log(result)
    }


    const ky = [0, 1, 2, 3, 4, 5, 6];
    let k = 0;
    return (
        <>
            <div id="tiles" className="tiles">
                <b>{`Wordle Custom ${isGameWon ? `${currentWordIndex}` : `X`}/6`}</b>
                {snapshot.map(row => (
                    <p className="word-row" key={ky[k++]}>{row}</p>
                ))}
            </div>
            <button onClick={handleCopy} className="btn copy-btn">Copy this attempt</button>
            <button className="btn random-btn"><a style={{color: "white"}}href="/"> Play a random word </a></button>

        </>
    )
}

export default StatModal