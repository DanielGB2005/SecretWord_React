// importação de estilo
import "./ScreenInitial.css";

const ScreenInitial = ({startGame}) => {
    return (
        <div className = "start"> 
          <h1> Quem quer ser um milionário ? </h1>
          <h2> Secret Word </h2>
          <p> Clique no botão abaixo para começar a jogar </p>
          <button onClick = {startGame}> Iniciar jogo </button>
        </div>
    );
};

export default ScreenInitial; 