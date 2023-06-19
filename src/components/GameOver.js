import "./GameOver.css";

const GameOver = ({retry, score}) => {
    return (
        <div>
            <p> Fim de jogo! </p>
             <h2> A sua pontuação foi de <span> {score} </span> </h2>
            <button onClick = {retry}> Tente novamente </button>
        </div>
    );
};

export default GameOver;