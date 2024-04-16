

import { useEffect, useState } from "react";
import "./style.css";

function Square({value,onClick}){

    return(
        <button onClick={onClick} className="square">{value}</button>
    )
}




const TicTacToe=()=>{

    const [squares,setSquares]=useState(Array(9).fill(''));
    const[isXTurn,setIsXTurn]=useState(true);
    const [status,setStatus]=useState('');

    function getWinner(squares){
        const winningpatterns=[
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [2,5,8],
            [0,4,8],
            [2,4,6],
            [0,3,6],
            [1,4,7]
        ];

        for(let i=0;i<winningpatterns.length;i++){
            const[x,y,z]=winningpatterns[i];
            if(squares[x] && squares[x] === squares[y] && squares[x]===squares[z]){
                return squares[x];
            }
        }

        return null;
    }

    function handleClick(getCurrentsquare){

        let cpySquares=[...squares];
        if(getWinner(cpySquares) || cpySquares[getCurrentsquare]) return;
        cpySquares[getCurrentsquare]=isXTurn ? 'X' : 'O';
        
        setIsXTurn(!isXTurn);
        setSquares(cpySquares);
    }

    function handleRestart(){
        setIsXTurn(true);
        setSquares(Array(9).fill(''));
    }

    useEffect(() => {
        if (!getWinner(squares) && squares.every(item => item !== '')) {
            setStatus(<p className="draw-message">This is draw ! Please restart the game</p>);
        } else if (getWinner(squares)) {
            setStatus(<p className="winner-message">Winner is {getWinner(squares)}. Please restart the game</p>);
        } else {
            setStatus(<p className="next-player">Next player is {isXTurn ? 'X' : 'O'}</p>);
        }
    }, [squares, isXTurn]);

    return(
        <div className="tic-tac-toe-container">
            <center><p className="text-multicolor">XO-Clash</p></center>
            <div className="row">
                <Square value={squares[0]} onClick={()=>handleClick(0)}/>
                <Square value={squares[1]} onClick={()=>handleClick(1)}/>
                <Square value={squares[2]} onClick={()=>handleClick(2)}/>
            </div>
            <div className="row">
                <Square value={squares[3]} onClick={()=>handleClick(3)}/>
                <Square value={squares[4]} onClick={()=>handleClick(4)}/>
                <Square value={squares[5]} onClick={()=>handleClick(5)}/>

            </div>
            <div className="row">
                <Square value={squares[6]} onClick={()=>handleClick(6)}/>
                <Square value={squares[7]} onClick={()=>handleClick(7)}/>
                <Square value={squares[8]}  onClick={()=>handleClick(8)}/>
            </div>
            <h1>{status}</h1>
            <button className="btn" onClick={handleRestart}>Restart</button>
        </div>
    )
}

export default TicTacToe;