import React, { useState } from 'react';
import './Header.css';
import Modal from './Modal'
import how_to_play from "../assets/how_to_play.png"
import StatModal from './StatModal';
import CustomModal from './CustomModal';

function Header({ customWordMsg, customWord, setCustomWord, handleCustomWordSumbit, isGameWon, cellColors, currentWordIndex }) {
    const [isInstructionModalOpen, setIsInstructionModalOpen] = useState(false)
    const [isCustomModalOpen, setIsCustomModalOpen] = useState(false)
    const [isStatModalOpen, setIsStatModalOpen] = useState(false)
    return (
        <>
            <Modal
                isOpen={isInstructionModalOpen}
                onClose={() => setIsInstructionModalOpen(false)}
            >
                <div className="instructions">
                    <b>HOW TO PLAY</b>
                    <p>Guess the WORDLE in 6 tries. After each guess, the color of the tiles will change to show how close your guess was to the word.</p>
                    <hr />
                    <p><b>Examples</b></p>
                    <img src={how_to_play} width={300}></img>
                    <hr />
                    <p><b>Unlimited wordle games all day long!</b></p>
                    <p>
                        *Inspired by <span><a href="https://www.nytimes.com/games/wordle/index.html">NYT Wordle</a></span>
                    </p>
                </div>
            </Modal>


            <Modal
                isOpen={isStatModalOpen}
                onClose={() => setIsStatModalOpen(false)}
            >
                <StatModal isGameWon={isGameWon} shareColors={cellColors} currentWordIndex={currentWordIndex} />
            </Modal>

            <Modal
                isOpen={isCustomModalOpen}
                onClose={() => setIsCustomModalOpen(false)}
            >
                <CustomModal customWordMsg={customWordMsg} handleCustomWordSumbit={handleCustomWordSumbit} customWord={customWord} setCustomWord={setCustomWord} />
            </Modal>


            <h1 className="heading">Custom Wordle</h1>
            <div className="subheading">
                <div className="icon-container">
                    <svg  onClick={() => { setIsInstructionModalOpen(true) }} xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true" className="h-7 w-7 cursor-pointer"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>

                </div>
                <div className="button-container">
                    <button className="custom-btn" onClick={() => { setIsCustomModalOpen(true) }}>
                        Make your own Wordle
                    </button>
                </div>

                <div className="icon-container">
                    <svg onClick={() => { setIsStatModalOpen(true) }} xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true" className="h-7 w-7 cursor-pointer"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>

                </div>
            </div>

        </>
    );
}

export default Header;
