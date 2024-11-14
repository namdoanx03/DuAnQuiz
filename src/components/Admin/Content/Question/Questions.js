import Select from 'react-select';
import { useState } from 'react';
import './Questions.scss'
import { BsPlusCircle } from "react-icons/bs";
import { SlMinus } from "react-icons/sl";
import { RiImageAddFill } from "react-icons/ri";
import { v4 as uuidv4 } from 'uuid'; // tao mot id duy nhat khong bi trung
import _ from 'lodash'

const Questions = () => {
    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
    ];

    const [selectedQuiz, setSelectedQuiz] = useState({})
    const[questions, setQuestions] = useState([
        {
            id: uuidv4(),
            description: "Question 1",
            imageFile: '',
            imagaName:'',
            answers:[
                {
                    id: uuidv4(),
                    description:'',
                    isCorrect:false
                }
            ]
        }
    ])
    console.log("check question", questions)

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
                        options={options}
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
                                    <input type="text" className="form-control" value={question.description} placeholder="name@example.com" />
                                    <label >Question {index + 1} 's Description</label>
                                </div>
                                <div className='group-upload'>
                                    <label >
                                        <RiImageAddFill className='label-up' /></label>
                                    <input type={'file'} hidden />
                                    <span>0 file is uploaded</span>
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
                                        <input className="form-check-input isCorrect" type="checkbox" />
                                        <div className="form-floating answer-name">
                                            <input type="type" 
                                                className="form-control" 
                                                placeholder="name@example.com" 
                                                value={answer.description}
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
            </div>
        </div>
    )
}
export default Questions