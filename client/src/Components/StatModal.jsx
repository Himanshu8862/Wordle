import { useState } from "react"
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

    const [copied, setCopied] = useState(false)

    for (let i = 0; i < shareColors.length; i++) {
        let m = shareColors[i].length
        for (let j = 0; j < m; j++) {
            let cell = shareColors[i][j];
            if (cell === "cell-black")
                snapshot[i][j] = "⬜";
            if (cell === "cell-green")
                snapshot[i][j] = "🟩"
            if (cell == "cell-yellow")
                snapshot[i][j] = "🟨"
        }
        snapshot[i] = snapshot[i].join("")
    }


    const handleCopy = async() => {
        const splicedSnapshot = snapshot.toSpliced(currentWordIndex)
        const copiedText = `Custom Wordle ${isGameWon ? `${currentWordIndex}` : `X`}/6\n\n${splicedSnapshot.join("\n")}\n\nPlay unlimited Wordle at https://wordle-custom.onrender.com/`
        const result = await navigator.clipboard.writeText(copiedText);
        setCopied(true);
        setTimeout(() => {
            setCopied(false)
        }, 2000);
    }


    const ky = [0, 1, 2, 3, 4, 5, 6];
    let k = 0;
    return (
        <>
            <div id="tiles" className="tiles">
                <b>{`Custom Wordle ${isGameWon ? `${currentWordIndex}` : `X`}/6`}</b>
                {snapshot.map(row => (
                    <p className="word-row" key={ky[k++]}>{row}</p>
                ))}
            </div>
            <button onClick={handleCopy} className="btn copy-btn-stat">Copy this attempt</button>
            <button className="btn random-btn"><a style={{color: "white"}}href="/"> Play a random word </a></button>
            <p className="copied">{copied? "Copied!" : ""}</p>
        </>
    )
}

export default StatModal