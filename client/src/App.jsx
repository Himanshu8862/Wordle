import { useState, useEffect } from 'react'
import { Route, Routes, useNavigate, useParams } from "react-router-dom"
import './App.css'
import Home from './Components/Home'
import axios from 'axios'
import CryptoJS from "crypto-js";

function App() {
    const [customWord, setCustomWord] = useState("")
    const [customWordMsg, setCustomWordMsg] = useState("")

    const navigate = useNavigate();
    const secretPass = "XkhZG4fW2t2W";

    const handleCustomWordSumbit = async () => {
        // console.log(customWord)

        if (customWord.length !== 5) {
            setCustomWordMsg("Please enter a 5 letter word only")
            return;
        }
        async function fetchDictionary() {
            try {
                const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${customWord}`);
                const meaning = await response.json();
                return Array.isArray(meaning);
            } catch (error) {
                console.log("Fethcing dictionary word error: ", error)
            }
        }
        const isFound = await fetchDictionary();
        if (isFound) {

            const encryptedCustomWord = CryptoJS.AES.encrypt(
                JSON.stringify(customWord),
                secretPass
            ).toString();

            const encodedCustomWord = encodeURIComponent(encryptedCustomWord)

            const sharableText = `I challenge you to solve my Wordle: https://wordle-custom.onrender.com/?id=${encodedCustomWord}`

            navigator.clipboard.writeText(sharableText);
            setCustomWordMsg("Link copied to clipboard")
        } else {
            setCustomWordMsg("Word Not found, enter a valid word")
        }
    }

    useEffect(() => {

        // Check if the URL has a valid query parameter
        const params = new URLSearchParams(window.location.search);
        const encodedWordFromURL = params.get('id');

        if (encodedWordFromURL) {
            // Decrypt the encoded word
            const decodedWordFromURL = decodeURIComponent(encodedWordFromURL);
            const bytes = CryptoJS.AES.decrypt(decodedWordFromURL, secretPass);
            const decryptedWordFromURL = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

            // -----
            // console.log(`App.jsx : Found the word in URL - ${decryptedWordFromURL}`);

        } else if (location.pathname === '/'){
            // If no valid query parameter is present, generate a new random word
            // -----
            // console.log(`getting a random word`);
            // getMysteryWord();

            (async () => {
                try {
                    const response = await axios.get(
                        'https://random-word-api.vercel.app/api?words=1&length=5&type=uppercase'
                    );
                    const word = response.data;

                    const encryptedWord = CryptoJS.AES.encrypt(
                        JSON.stringify(word[0]),
                        secretPass
                    ).toString();

                    // URL-encode the encrypted word
                    const encodedWord = encodeURIComponent(encryptedWord);

                    // Redirect to the Home component with the encoded mysteryWord as a query parameter
                    navigate(`/?id=${encodedWord}`, {
                        replace: true,
                    }); // Use replace: true to avoid adding to browser history
                } catch (error) {
                    console.log('Fetching mystery word error: ', error);
                }
            })();

        }
    }, [location]);

    return (
        <>
            <Routes>
                <Route path='/' element={
                    <Home
                        secretPass={secretPass}
                        customWordMsg={customWordMsg}
                        customWord={customWord}
                        setCustomWordMsg={setCustomWordMsg}
                        setCustomWord={setCustomWord}
                        handleCustomWordSumbit={handleCustomWordSumbit}
                    />
                } />
            </Routes>
        </>
    )
}

export default App