import { useEffect } from "react";
import { useParams } from "react-router-dom"; // khai bao mot tham so tren duong link URL
import { getDataQuiz } from "../services/apiService";
import _ from 'lodash';

const DetailQuiz = (props) => {
    const params = useParams()
    const quizId = params.id

    useEffect(() => {
        fetchQuestion()
    }, [quizId]) // moi lan quizId thay doi thi useEffect se duoc chay

    const fetchQuestion = async() => {
        let res = await getDataQuiz(quizId)
        console.log("check question" , res)
        if(res && res.EC === 0){
            let raw = res.DT
            let data = _.chain(raw)
                // Group the elements of Array based on `color` property
                .groupBy("id") // gop tat ca cac object theo mot nhom ma chung ta quy dinh 
                // `key` is group's name (color), `value` is the array of objects
                .map((value, key) => {
                    let answers = []
                    let questionDescription, image = null

                    value.forEach((item, index) => { // index lap tu 0 den phan tu cuoi cua mang
                        if(index === 0) { //lay 1 phan tu vi cac phan tu o sau data giong het
                            questionDescription = item.description
                            image = item.image
                        }
                        answers.push(item.answers)
                    })
                    return { questionId: key, answers, questionDescription, image }
                })
                .value()
            console.log("check", data)
        }
    }
    console.log("check paream", params)
    return (
        <div className="detail-quiz-container">
            components
        </div>
    )
}
export default DetailQuiz