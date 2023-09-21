import { useState, useEffect } from 'react'
import './App.css'
import Grid from './Components/Grid'
import Keyboard from './Components/Keyboard'
import Header from './Components/Header'
import axios from 'axios';
import Modal from './Components/Modal'

function App() {

    const [gridData, setGridData] = useState(
        [
            ['', '', '', '', '', 0],
            ['', '', '', '', '', 0],
            ['', '', '', '', '', 0],
            ['', '', '', '', '', 0],
            ['', '', '', '', '', 0],
            ['', '', '', '', '', 0],
        ]
    );
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [mysteryWord, setMysteryWord] = useState("")
    const [isGameWon, setIsGameWon] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [message, setMessage] = useState("")
    const [keyColors, setKeyColors] = useState([[], [], []]); //  , black, yellow, green
    const [cellColors, setCellColors] = useState(
        [
            ['', '', '', '', ''],
            ['', '', '', '', ''],
            ['', '', '', '', ''],
            ['', '', '', '', ''],
            ['', '', '', '', ''],
            ['', '', '', '', ''],
        ]
    ); // , black, yellow, green


    async function getMysteryWord() {
        try {
            const response = await axios.get(`https://random-word-api.vercel.app/api?words=1&length=5&type=uppercase`);
            const word = response.data;
            setMysteryWord(word[0]);
        } catch (error) {
            console.log("Fetching mystery word error: ", error);
        }
    }

    useEffect(() => {
        getMysteryWord();
    }, [])

    useEffect(()=>{
        if(isGameWon===false && currentWordIndex>5){
            setMessage(`Game lost. Word: ${mysteryWord}`)
            setIsModalOpen(true);

        }
    },[isGameWon, currentWordIndex])

    const handleKeyPress = async (key) => {
        if (isGameWon) return

        const newGridData = [...gridData];
        // console.log("newGridData: ",newGridData);
        if (currentWordIndex > 5) return;

        if (key === "Delete") {
            // in the current word, delete the last input
            if (newGridData[currentWordIndex][5] > 0) {
                const emptyCellIndex = newGridData[currentWordIndex].indexOf('');
                if (emptyCellIndex == -1) {
                    newGridData[currentWordIndex][4] = "";
                    newGridData[currentWordIndex][5]--;
                }
                else {
                    newGridData[currentWordIndex][emptyCellIndex - 1] = "";
                    newGridData[currentWordIndex][5]--;
                }
            }
        }

        else if (key === "Enter") {
            // Check if the current word doesn't have 5 letters
            if (newGridData[currentWordIndex][5] !== 5) {
                // alert("Not enough letters")
                setMessage("Not enough letters")
                setIsModalOpen(true);
                return;
            }
            const currentWord = newGridData[currentWordIndex].join("").slice(0, -1)
            // console.log("current entered word: ", currentWord);

            async function fetchDictionary() {
                try {
                    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${currentWord}`);
                    const meaning = await response.json();
                    return Array.isArray(meaning);
                } catch (error) {
                    console.log("Fethcing dictionary word error: ", error)
                }
            }
            const isFound = await fetchDictionary();
            // console.log("Word found", isFound);
            if (!isFound) {
                newGridData[currentWordIndex] = ['', '', '', '', '', 0];
                // alert("Not in word list")
                setMessage("Not in word list")
                setIsModalOpen(true);
            }
            // if the word is found
            else {
                if (mysteryWord === currentWord) {
                    setIsGameWon(true);
                    // alert("Game won")
                    setMessage("Congratulations 🎉")
                    setIsModalOpen(true);
                }
                // change the current word
                setCurrentWordIndex(currentWordIndex + 1);

                // console.log(mysteryWord, currentWord);
                const newKeyColors = [...keyColors];

                // update green keys
                for (let i = 0; i < 5; i++) {
                    if (mysteryWord[i] === currentWord[i]) {
                        newKeyColors[2].push(currentWord[i])
                    }
                }
                // update yellow keys and black keys
                for (let i = 0; i < 5; i++) {
                    // if any letter is not found in the mystery word then insert in black array
                    if (mysteryWord.search(currentWord[i]) == -1) {
                        newKeyColors[0].push(currentWord[i])
                    }
                    // if any letter is found in the mystery word then insert in yellow array
                    else {
                        newKeyColors[1].push(currentWord[i])
                    }
                }
                setKeyColors(newKeyColors);

                const newCellColors = [...cellColors]
                for (let i = 0; i < currentWord.length; i++) {
                    if (mysteryWord.includes(currentWord[i])) {
                        newCellColors[currentWordIndex][i] = "cell-yellow";
                    }
                    else {
                        newCellColors[currentWordIndex][i] = "cell-black";
                    }
                    if (currentWord[i] === mysteryWord[i]) {
                        newCellColors[currentWordIndex][i] = "cell-green";
                    }
                }
                setCellColors(newCellColors);
            }
        }

        // Alphabets are pressed
        else if (newGridData[currentWordIndex][5] < 5) {
            const emptyCellIndex = newGridData[currentWordIndex].indexOf('');
            if (emptyCellIndex !== -1) {
                newGridData[currentWordIndex][emptyCellIndex] = key;
                newGridData[currentWordIndex][5]++;
            }
        }
        setGridData(newGridData);
    };

    return (
        <>
            <Header isGameWon={isGameWon} currentWordIndex={currentWordIndex} cellColors={cellColors}/>
            <hr/>
            <Modal
                isOpen={isModalOpen}
                onClose={()=>setIsModalOpen(false)}
            >
                <p><b>{message}</b></p>
            </Modal>
            <Grid data={gridData} cellColors={cellColors} />
            <Keyboard onKeyPress={handleKeyPress} keyColors={keyColors} />
        </>
    )
}

export default App