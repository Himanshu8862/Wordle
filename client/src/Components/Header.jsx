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
                    <p>Guess the hidden word in 6 tries.</p>
                    <p>Each guess must be a valid 5 letter word, you cannot enter random letters. Hit the Enter button to submit the guess.</p>
                    <p>After your submission, the color of the tiles will change as in the examples below.</p>
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

            <div className="header">
                <div className="left-icon">
                    <svg onClick={() => { setIsInstructionModalOpen(true) }} className='info' xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-info-circle" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                        <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                        <title>Instructions</title>
                    </svg>
                </div>
                <h1 className="heading">Wordle</h1>
                <div className="right-icons">
                    <svg
                        onClick={() => { setIsCustomModalOpen(true) }}
                        style={{ marginRight: 10 }}
                        className='custom' xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-wrench-adjustable-circle" viewBox="0 0 16 16">
                        <path d="M12.496 8a4.491 4.491 0 0 1-1.703 3.526L9.497 8.5l2.959-1.11c.027.2.04.403.04.61Z" />
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0Zm-1 0a7 7 0 1 0-13.202 3.249l1.988-1.657a4.5 4.5 0 0 1 7.537-4.623L7.497 6.5l1 2.5 1.333 3.11c-.56.251-1.18.39-1.833.39a4.49 4.49 0 0 1-1.592-.29L4.747 14.2A7 7 0 0 0 15 8Zm-8.295.139a.25.25 0 0 0-.288-.376l-1.5.5.159.474.808-.27-.595.894a.25.25 0 0 0 .287.376l.808-.27-.595.894a.25.25 0 0 0 .287.376l1.5-.5-.159-.474-.808.27.596-.894a.25.25 0 0 0-.288-.376l-.808.27.596-.894Z" />
                        <title>Make your own Wordle</title>
                    </svg>
                    <svg onClick={() => { setIsStatModalOpen(true) }} className='stats' xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-bar-chart-line" viewBox="0 0 16 16">
                        <path d="M11 2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h1V7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7h1V2zm1 12h2V2h-2v12zm-3 0V7H7v7h2zm-5 0v-3H2v3h2z" />
                        <title>Game won</title>
                    </svg>
                </div>
            </div>
        </>
    );
}

export default Header;
