import { useEffect } from "react";
import { useParams } from "react-router-dom"; // khai bao mot tham so tren duong link URL
import { getDataQuiz } from "../services/apiService";


const DetailQuiz = (props) => {
    const params = useParams()
    const quizId = params.id

    useEffect(() => {
        fetchQuestion()
    }, [quizId]) // moi lan quizId thay doi thi useEffect se duoc chay

    const fetchQuestion = async() => {
        let res = await getDataQuiz(quizId)
        console.log("check question" , res)
    }
    console.log("check paream", params)
    return (
        <div className="detail-quiz-container">
            components
        </div>
    )
}
export default DetailQuiz