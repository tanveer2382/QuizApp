import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { quiz } from './assets/data/gkquestions'
import './index.css'

//function App(){}
const App = () => {



  const [activeQuestion, setActiveQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState('')
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null)
  const [result, setResult] = useState({
    score: 0,
    corectAnswers: 0,
    wrongAnswers: 0
  });


  const { questions } = quiz;
  const { question, choices, correctAnswer } = questions[activeQuestion]

  const onClickNext = () => {
    setSelectedAnswerIndex(null)
    setActiveQuestion((prev) => prev + 1)
    setResult((prev) => selectedAnswer
      ? {
        ...prev,
        score: prev.score + 5,
        corectAnswers: prev.corectAnswers + 1

      }
      :
      {
         ...prev,
        wrongAnswers: prev.wrongAnswers + 1
      }
    )
  }

  const onAnswerSelected = (answer, index) => {
    setSelectedAnswerIndex(index)
    if (answer === correctAnswer) {
      setSelectedAnswer(true)
      console.log('right' + index)
    }
    else {
      setSelectedAnswer(false)
      console.log('wrong' + index)
    }
  }

  return (
    <>
      <div className="card">
        <h1>Tanveer Quiz App</h1>
        {/* <h2>{questions[activeQuestion].question}</h2> */}
        <h2>{question}</h2>
        <ul>
          {
            choices.map((item, index) => (
              <li onClick={() => onAnswerSelected(item, index)} key={item}
                // className={selectedAnswerIndex === index ? 'selected-answer' : null}
                className={selectedAnswer && selectedAnswerIndex === index ? 'rigth-answer' : selectedAnswerIndex === index ? 'wrong-answer' : null}

              >
                {index}{item}
              </li>
            ))
          }
        </ul>
        <button onClick={onClickNext} disabled={selectedAnswerIndex ===null}>
          {activeQuestion === questions.length - 1 ? "Finish" : "Next"}
        </button>

        
          <h1>Score:{result.score}</h1>
          <h1>Correct Answers:{result.corectAnswers}</h1>
          <h1>Wrong Answers:{result.wrongAnswers}</h1>
        
      </div>
    </>
  )
}

export default App
