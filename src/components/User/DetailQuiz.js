import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom"; // khai bao mot tham so tren duong link URL
import { getDataQuiz } from "../services/apiService";
import _ from 'lodash';
import './DetailQuiz.scss'
import Question from "./Question";

const DetailQuiz = (props) => {
    const location = useLocation();
    const params = useParams()
    const quizId = params.id
    const [dataQuiz, setDataQuiz] = useState([])
    const [index, setIndex] = useState(0)

    console.log("check location", location)

    useEffect(() => {
        fetchQuestion()
    }, [quizId]) // moi lan quizId thay doi thi useEffect se duoc chay

    const fetchQuestion = async () => {
        let res = await getDataQuiz(quizId)
        console.log("check question", res)
        if (res && res.EC === 0) {
            let raw = res.DT
            let data = _.chain(raw)
                // Group the elements of Array based on `color` property
                .groupBy("id") // gop tat ca cac object theo mot nhom ma chung ta quy dinh 
                // `key` is group's name (color), `value` is the array of objects
                .map((value, key) => {
                    let answers = []
                    let questionDescription, image = null

                    value.forEach((item, index) => { // index lap tu 0 den phan tu cuoi cua mang
                        if (index === 0) { //lay 1 phan tu vi cac phan tu o sau data giong het
                            questionDescription = item.description
                            image = item.image
                        }
                        item.answers.isSelected = false // gan them truong isSelected de biet rang nguoi dung da chon phuong an do chua
                        answers.push(item.answers)
                    })
                    return { questionId: key, answers, questionDescription, image }
                })
                .value()
            setDataQuiz(data)
        }
    }
    console.log("check dataQuiz", dataQuiz)

    const handlePre = () => {
        if(index - 1 < 0) return 
        setIndex(index - 1)
    }
    const handleNext = () => {
        if(dataQuiz && dataQuiz.length > index + 1)
            setIndex(index + 1)
    }
    const handleCheckBox = (answerId, questionId) => {
        let dataQuizClone = _.cloneDeep(dataQuiz) //react hook doesn't merge state
         // cloneDeep : sao chep tat ca cac obj cua dataQuiz, con clone: chi sao chep o tang ngoai thoi
        let question = dataQuizClone.find(item => +item.questionId === +questionId)
        if(question && question.answers){
            question.answers = question.answers.map(item => {
                if(+item.id === +answerId){
                    item.isSelected = !item.isSelected
                }
                return item
            })
        }
        let index = dataQuizClone.findIndex(item => +item.questionId === +questionId)
        if(index > -1){
            dataQuizClone[index] = question
            setDataQuiz(dataQuizClone)
        }

    }

    return (
        <div className="detail-quiz-container">
            <div className="left-content">
                <div className="title">
                    Quiz {quizId}: {location?.state?.quizTitle}
                </div>
                <hr />
                <div className="q-body">
                    <img />
                </div>
                <div className="q-content">
                    <Question index = {index} 
                    handleCheckBox = {handleCheckBox}
                    data={dataQuiz && dataQuiz.length > 0 ? dataQuiz[index] : []} />
                </div>
                <div className="footer">
                    <button className="btn btn-secondary" onClick={() => handlePre()}>Previous</button>
                    <button className="btn btn-primary" onClick={() => handleNext()} >Next</button>
                    <button className="btn btn-warning" onClick={() => handleNext()} >Finish</button>
                </div>
            </div>
            <div className="right-content">
                count down
            </div>
        </div>
    )
}
export default DetailQuiz