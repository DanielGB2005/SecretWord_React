// importação de hooks
import {useCallback, useEffect, useState} from "react";

// importação de variáveis
import { wordsList } from "./data/words";

// importação de estilos 
import "./App.css";

// importação de componentes
import ScreenInitial from "./components/ScreenInitial";
import Game from "./components/Game";
import GameOver from "./components/GameOver";

const stages = [
  {id: 1, name: "start" },
  {id: 2, name: "game"}, 
  {id: 3, name: "end"},
];  

const guessesQtd = 3;

function App() {

  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordsList);

  const [pickedWord, setPickedWord] = useState("");
  const [pickedCategory, setPickedCategory] = useState("");
  const [letters, setLetters] = useState([]); // começa sendo um array vazio, uma lista de letras.

  const [guessedLetters, setGuessedLetters] = useState([]); // letras que o user acertou.
  const [wrongLetters, setWrongLetters] = useState([]);  // letras erradas que o user inseriu.
  const [guesses, setGuesses] = useState(guessesQtd); // qtd. de chances do user.
  const [score, setScore] = useState(0);

  const pickWordAndCategory = useCallback(() => {

    // picking a random category

    const categories = Object.keys(words); // as categorias são as chaves do objeto 'words'. 
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)]; // gerando um valor aleatório correspondente a uma categoria a ser usada no game. 

    console.log(category);

    // picking a random word

    const word = words[category][Math.floor(Math.random() * words[category].length)]; // acessando uma palavra aleatória da categoria escolhida pelo algoritmo. 
    console.log(word);
    return {word, category};  

  }, [words])
  
  // starts the secret word Game 

  const startGame = useCallback(() => {  // 'useCallback' resolve o problema de função dependente de hook 

    // cleaning some letters
    clearLetterStates();

    // pick word and pick category function

    const {word, category} = pickWordAndCategory();

    // desmontando a palavra em letras

    let wordLetter = word.split("");
    wordLetter = wordLetter.map((l) => l.toLowerCase());

    console.log(words, category);
    console.log(wordLetter);


    // fill states
    setPickedWord(word);
    setPickedCategory(category);
    setLetters(wordLetter);

    setGameStage(stages[1].name);
  }, [pickWordAndCategory]) /* aqui, foi passado o 2° argumento de 'UseCallBack', nesse caso, passamos uma  função essencial de 'startGame'.  */

  // process the letter input

    const verifyLetter = (letter) => {
       const normalizedLetter = letter.toLowerCase();

       // validação de letra (verificando sua ocorrência)

       if(guessedLetters.includes(normalizedLetter) || wrongLetters.includes(normalizedLetter)) {
         return;
       }

       // push guessed letter or remove a guess
        
        if(letters.includes(normalizedLetter)) {
          setGuessedLetters((actualGuessedLetters) => [...actualGuessedLetters, normalizedLetter]);
        }

        else {
          setWrongLetters((actualWrongLetters) => [...actualWrongLetters, normalizedLetter]);
          setGuesses((actualGuesses) => actualGuesses - 1);
        }

    }

    const clearLetterStates = () => {
      setGuessedLetters([]);
      setWrongLetters([]);
    }

    // checking if guesses ended

    useEffect(() => {  // esse hook pode monitorar algum dado.

      if(guesses <= 0) {

        // reset some states

        clearLetterStates()

        setGameStage(stages[2].name);
      }

    }, [guesses]) // como 2° argumento, está o dado a ser monitorado, nesse caso, o 'guesses'.
    
    // WIN condition

    useEffect(() => {
      const uniqueLetters = [...new Set (letters)];  /* o 'set' não permite repetição de letras no vetor. 
                                                       obs: 'uniqueLetters' também terá as letras certas que o user acertar.  */

       if(guessedLetters.length === uniqueLetters.length && gameStage === stages[1].name) {
         setScore((actualScore) => (actualScore += 100))

         // RESTART game with new word  

          startGame();  
       }  
                                                       
      console.log(uniqueLetters);
    }, [guessedLetters, letters, startGame])

    // restarts the game 
 
    const retry = () => {
        
      // resetando jogo

      setScore(0);
      setGuesses(guessesQtd);

      setGameStage(stages[0].name);
    }

  return (
    <div className = "App">

      {gameStage === "start" &&  <ScreenInitial startGame = {startGame} /> }
      {gameStage === "game" && <Game verifyLetter = {verifyLetter} PickedWord = {pickedWord} pickedCategory = {pickedCategory} letters = {letters} guessedLetters = {guessedLetters} wrongLetters = {wrongLetters} guesses = {guesses} score = {score}  /> }
      {gameStage === "end" && <GameOver retry = {retry} score = {score} /> }

    </div>
  );
}

export default App;
