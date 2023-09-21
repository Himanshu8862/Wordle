import "./StatModal.css"
import copy from 'copy-to-clipboard';
import {CopyToClipboard} from 'react-copy-to-clipboard';

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
    // console.log(snapshot);

    const copiedText = `Wordle Custom ${isGameWon ? `${currentWordIndex}` : `X`}/6\n${snapshot.join("\n")}`
    // console.log(copiedText);


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
            {/* <button onClick={() => copy('Text')} className="btn copy-btn">Copy this attempt</button>
            <CopyToClipboard
                text="text"
                onCopy={() => alert("Copied")}>
                <span>Copy to clipboard with span</span>
            </CopyToClipboard> */}
            <button className="btn random-btn"><a style={{color: "white"}}href="/"> Play a random word </a></button>

        </>
    )
}

export default StatModal