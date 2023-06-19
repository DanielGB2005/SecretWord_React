// importação de styles
import "./Game.css";

// importação de hooks
import {useState, useRef} from "react";  // 'useRef' é para manter o foco do cursor em determinado elemento HTML após submit de form. 

const Game = ({verifyLetter, pickedWord, pickedCategory, letters, guessedLetters, wrongLetters, guesses, score }) => {
   
    const [letter, setLetter] = useState("");

    const letterInputRef = useRef(null);  // usando o hook useRef (cria uma referência a algum elemento). 


    const handleSubmit = (e) => {
        e.preventDefault(); 
        verifyLetter(letter);
        setLetter(""); 
        letterInputRef.current.focus();  // usando o hook useRef
    }

    return (
        <div className = "game">

           <p className = "points"> <span> Pontuação: {score} </span> </p>
           <h1> Advinhe a palavra: </h1>
           <h3 className = "tip"> Dica sobre a palavra: <span> Dica: {pickedCategory} </span>  </h3>

           <p> Você ainda tem {guesses} tentativa(s) </p>

           <div className = "wordContainer">  {/* div que terá a palavra da vez a ser advinhada */}

           {letters.map((letter, i) => guessedLetters.includes(letter) ? (<span key = {i} className = "letter"> {letter} </span>) : (<span key = {i} className = "blankSquare">  </span>))}

           </div>

           <div className = "letterContainer"> {/* div onde advinharemos as letras da palavra */}
              <p> Tente advinhar uma letra da palavra: </p>
               <form onSubmit = {handleSubmit}> 
                  <input type="text" name = "letter" maxLength = "1" required onChange = {(e) => setLetter(e.target.value)} value = {letter} ref = {letterInputRef} /> {/* também usando o useRef */}
                  <button > Tentar! </button>
               </form>
           </div> 

            <div className = "wrongLettersContainer"> 

            <p> Letras incorretas: {wrongLetters.map((letter, i) => (<span key = {i}> {letter},  </span>))}  </p>
            
            </div>

        </div>
    );
};

export default Game;