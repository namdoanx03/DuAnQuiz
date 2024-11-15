import Select from 'react-select';
import { useEffect, useState } from 'react';
import './Questions.scss'
import { BsPlusCircle } from "react-icons/bs";
import { SlMinus } from "react-icons/sl";
import { RiImageAddFill } from "react-icons/ri";
import { v4 as uuidv4 } from 'uuid'; // tao mot id duy nhat khong bi trung
import _ from 'lodash'
import Lightbox from "react-awesome-lightbox";
import { getAllQuizForAdmin, postCreateNewQuestionForQuiz, postCreateNewAnswerForQuestion } from "../../../services/apiService"
import { toast } from 'react-toastify';

const Questions = () => {

    const [isPreviewImage, setIsPreviewImage] = useState(false)
    const [selectedQuiz, setSelectedQuiz] = useState({})
    const initQuestions = [
        {
            id: uuidv4(),
            description: "",
            imageFile: '',
            imagaName: '',
            answers: [
                {
                    id: uuidv4(),
                    description: '',
                    isCorrect: false
                }
            ]
        }
    ]
    const [questions, setQuestions] = useState(initQuestions)
    const [dataImagePreview, setDataImagePreview] = useState({
        title:'',
        url:''
    })
    const [listQuiz, setListQuiz] = useState([])
    // console.log("check question", questions)
    useEffect(()=>{
        fetchQuiz()
    },[])
    const fetchQuiz = async () => {
        setListQuiz({});
        let res = await getAllQuizForAdmin()
        if (res && res.EC === 0) {
            let newQuiz = res.DT.map(item => {
                return {
                    value:item.id,
                    label:`${item.id} -${item.name}`
                }
            })
            setListQuiz(newQuiz)
        }
    }

    const handleAddRemoveQuestion = (type, id) => {
        if(type === "ADD"){
            const newQuestion = {
                id: uuidv4(),
                description: '',
                imageFile: '',
                imagaName: '',
                answers: [
                    {
                        id: uuidv4(),
                        description: '',
                        isCorrect: false
                    }
                ]
            }
            setQuestions([...questions, newQuestion]) // cap nhat question moi, ...questions: sao chep cac question cu
        }
        if(type === "REMOVE"){
            let questionClone = _.cloneDeep(questions)

            questionClone = questionClone.filter(item => item.id !== id)
            setQuestions(questionClone)
        }
        // console.log("check ", type, id)
    }
    const handleAddRemoveAnswer = (type, questionId, answerId) => {
        let questionsClone = _.cloneDeep(questions)
        if (type === "ADD") {
            const newAnswer = {            
                id: uuidv4(),
                description: '',
                isCorrect: false
            }
            let index = questionsClone.findIndex(item =>  item.id === questionId)
            // console.log("cheeck index:",index)
            questionsClone[index].answers.push(newAnswer)
            setQuestions(questionsClone)
        }
        if (type === "REMOVE") {
            let index = questionsClone.findIndex(item => item.id === questionId)
            questionsClone[index].answers = questionsClone[index].answers.filter(item => item.id !== answerId)
            setQuestions(questionsClone)
        }
        // console.log("check ", type, questionId, answerId)
    }
    const handleOnChange = (type, questionId, value) =>{
        if(type === "QUESTION"){
            let questionsClone = _.cloneDeep(questions)
            let index = questionsClone.findIndex(item => item.id === questionId)
            if(index > -1 ){
                questionsClone[index].description = value
                setQuestions(questionsClone)
            }
        }
    }
    const handleOnChangeFileQuestion = (questionId, event) => {
        let questionsClone = _.cloneDeep(questions)
        let index = questionsClone.findIndex(item => item.id === questionId)
        if (index > -1 && event.target && event.target.files && event.target.files[0]){
            questionsClone[index].imageFile = event.target.files[0]
            questionsClone[index].imageName = event.target.files[0].name
            setQuestions(questionsClone)
            // console.log('check file ', event.target.files[0])
        }
    }
    const handleAnswerQuestion = (type, answerId, questionId, value) => {
        let questionsClone = _.cloneDeep(questions)
        let index = questionsClone.findIndex(item => item.id === questionId)
        // console.log("Check", type, questionId, answerId, value , index)
        if (index > -1 ) {
            questionsClone[index].answers = questionsClone[index].answers.map(answer => {
                if(answer.id === answerId){
                    if(type === 'CHECKBOX'){
                        answer.isCorrect = value
                    }
                    if (type === 'INPUT') {
                        answer.description = value
                    }
                }
                return answer // khong thay doi se tra ra y nguyen
            })
            setQuestions(questionsClone)
        }
    }
    const hanleSubmitQuestionForQuiz = async() =>{
        //todo
        if(_.isEmpty(selectedQuiz)){
            toast.error("Please choose a Quiz")
            return
        }

        //validate answer
        let isValidAnswer = true
        let indexQ = 0, indexA = 0;
        for(let i = 0; i < questions.length; i++){
            for (let j = 0 ; j < questions[i].answers.length; j++){
                if(!questions[i].answers[j].description){
                    isValidAnswer = false
                    indexA = j;
                    break
                }
            }
            indexQ = i
            if (isValidAnswer === false) break
        }
        if(isValidAnswer === false){
            toast.error(`Not empty Answer ${indexA + 1} at Question ${indexQ + 1}`)
            return
        }

        //validate question
        let isValidQuestion = true
        let indexQ1 = 0
        for (let i = 0; i < questions.length; i++) {
            if(!questions[i].description){
                isValidQuestion = false
                indexQ1 = i
                break
            }
        }
        if (isValidQuestion === false) {
            toast.error(`Not empty description for Question ${indexQ1 + 1}`)
            return 
        }


        // console.log("check question", questions, selectedQuiz)
        // postCreateNewQuestionForQuiz, postCreateNewAnswerForQuestion

        
        //submit question
        for(const question of questions){
            const q = await postCreateNewQuestionForQuiz(
                +selectedQuiz.value,
                question.description,
                question.imageFile)

            //submit answer
            for(const answer of question.answers){
                await postCreateNewAnswerForQuestion(answer.description, answer.correct_answer, q.DT.id)
            }
        }
        toast.success('Create question and answer success!')
        setQuestions(initQuestions)
    }
    const handlePreviewImage = (questionId) => {
        let questionsClone = _.cloneDeep(questions)
        let index = questionsClone.findIndex(item => item.id === questionId)
        if (index > -1) {
            setDataImagePreview({
                url:URL.createObjectURL(questionsClone[index].imageFile),
                title: questionsClone[index].imagaName
            })
            setIsPreviewImage(true)
        }
    }

    return (
        <div className="question-container">
            <div className='title'>
                Manage Questions
            </div>
            <hr/>
            <div className='add-new-question'>
                <div className='col-6 form-group'>
                    <label className='mb-2'>Select Quiz:</label>
                    <Select
                        value={selectedQuiz}
                        onChange={setSelectedQuiz}
                        options={listQuiz}
                    />
                </div>
                <div className='mt-3'>
                    Add questions:
                </div>
                {questions && questions.length > 0 && questions.map((question, index) => {
                    return (
                        <div key={question.id} className='q-main mb-4'>
                            <div className='questions-content'>
                                <div className="form-floating description">
                                    <input type="type" className="form-control" 
                                    value={question.description} 
                                    placeholder="name@example.com" 
                                    onChange={(event) => handleOnChange("QUESTION", question.id, event.target.value)} //question.id: de biet rang thay doi id nao
                                    />
                                    <label >Question {index + 1} 's Description</label>
                                </div>
                                <div className='group-upload'>
                                <label htmlFor={`${question.id}`}>
                                        <RiImageAddFill className='label-up' />
                                </label>
                                    <input type={'file'} hidden 
                                        id={`${question.id}`}
                                        onChange={(event) => handleOnChangeFileQuestion(question.id, event)}
                                    />
                                    <span>{question.imageName ? 
                                        <span style={{cursor:'pointer'}} onClick={() => handlePreviewImage(question.id)}>{question.imageName}</span> 
                                        : 
                                        '0 file is uploaded'}
                                    </span>
                                </div>
                                <div className='btn-add '>
                                    <span onClick={() => handleAddRemoveQuestion("ADD", "")}>
                                        <BsPlusCircle className='icon-add' />
                                    </span>
                                    {questions.length > 1 && 
                                        <span onClick={() => handleAddRemoveQuestion("REMOVE",question.id)}>
                                            <SlMinus className='icon-remove' />
                                        </span>
                                    }
                                </div>
                            </div>
                            {question.answers && question.answers.length > 0 && question.answers.map((answer, index) => {
                                return (
                                    <div key={answer.id} className='answers-content'>
                                        <input className="form-check-input isCorrect" 
                                            type="checkbox" 
                                            checked={answer.isCorrect}
                                            onChange={(event) => handleAnswerQuestion('CHECKBOX', answer.id, question.id, event.target.checked)}
                                            />
                                        <div className="form-floating answer-name">
                                            <input type="type" 
                                                className="form-control" 
                                                placeholder="name@example.com" 
                                                value={answer.description}
                                                onChange={(event) => handleAnswerQuestion('INPUT', answer.id, question.id, event.target.value)}
                                                />
                                            <label >Answer {index + 1}</label>
                                        </div>
                                        <div className='btn-group'>
                                            <span onClick={() => handleAddRemoveAnswer("ADD", question.id)} >
                                                <BsPlusCircle className='icon-add' />
                                            </span>
                                            {question.answers.length > 1 &&
                                                <span onClick={() => handleAddRemoveAnswer("REMOVE", question.id, answer.id)}>
                                                    <SlMinus className='icon-remove' />
                                                </span>
                                            }
                                        </div>
                                    </div>
                                )
                            })}
                            
                        </div>
                    )
                })
                }
                {questions && questions.length > 0 &&
                <div>
                    <button 
                    onClick={() => hanleSubmitQuestionForQuiz()}
                    className='btn btn-warning'>Save Questions</button>
                </div>
                }
                {isPreviewImage === true &&
                    <Lightbox
                        image={dataImagePreview.url}    //    convert tu kieu file sang kieu blod 
                        title={dataImagePreview.title}
                        onClose={() => setIsPreviewImage(false)}>
                    </Lightbox>
                }
            </div>
            
        </div>
    )
}
export default Questions