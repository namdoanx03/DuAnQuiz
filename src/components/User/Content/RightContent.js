import CountDown from "./CountDown"
import { useRef } from "react" // giup ta co the thao tac voi phan tu cua html

const RightContent =(props)=>{
    const refDiv = useRef([])

    const {dataQuiz} = props

    const onTimeUp = () => {
        props.handleFinishQuiz()
    }

    const getClassQuestion = (index, question) => {
        // console.log("check ==", index, question)
        //check answer
        if(question && question.answers.length > 0){
            let isAnswered = question.answers.find(a => a.isSelected === true) // some : true neu 1 trong cac phan tu thoa man, ham find: tra ve true neu co 1 phhan tu true , nguoc lai se tra ve undefined
            // console.log('index', index, isAnswered)
            if(isAnswered){
                return "question selected"
            }
        }
        return "question "
    }
    const handleClickQuestion = (question, index) => {
        props.setIndex(index)
        if(refDiv.current){
            // console.log(refDiv.current)
            refDiv.current.forEach(item => {
                if(item && item.className === "question clicked"){
                    item.className = "question"
                }
            })
        }
        if (question && question.answers.length > 0){
            let isAnswered = question.answers.find(a => a.isSelected === true) 
            if (isAnswered) {
                return 
            }
        }
        refDiv.current[index].className = "question clicked"
    }
    return (
        <>
            <div className="main-timer">
                <CountDown
                    onTimeUp = {onTimeUp}
                />
            </div>
            <div className="main-question">
                {dataQuiz && dataQuiz.length > 0
                && dataQuiz.map((item, index) => {
                    return(
                        <div key={`question-abc-${index}`} 
                            className={getClassQuestion(index,item)} 
                            onClick={() => handleClickQuestion(item, index)}
                            ref={element => refDiv.current[index] = element}
                            >{index + 1}
                        </div>
                    )
                })
                }
            </div>
        </>
    )
}
export default RightContent