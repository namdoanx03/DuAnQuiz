import { useState } from 'react';
import './ManageQuiz.scss'
import Select from 'react-select';
import { postCreateNewQuiz } from '../../../services/apiService';
import { toast } from 'react-toastify';
import { FaUpload } from "react-icons/fa6";
import TableQuiz from './TableQuiz';
import Accordion from 'react-bootstrap/Accordion';

const options = [
    { value: 'EASY', label: 'EASY' },
    { value: 'MEDIUM', label: 'MEDIUM' },
    { value: 'HARD', label: 'HARD' },
];

const ManageQuiz = () => {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [type, setType] = useState('')
    const [image, setImage] = useState(null)

    const handleChangeFile = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setImage(event.target.files[0])
        }
    }
    const handleSubmitQuiz = async() => {
        //validate
        if(!name || !description){
            toast.error('Name & Description is required')
            return 
        }

        let res = await postCreateNewQuiz(description, name, type?.value, image)
        
        if(res && res.EC === 0){
            toast.success(res.EM)
            setName('')
            setDescription('')
            setImage(null)
        }else{
            toast.error(res.EM)
        }
    }
    return (
        <div className="quiz-container">
            <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Manage Quizzes</Accordion.Header>
                    <Accordion.Body>
                        <div className="add-new">
                            <fieldset className="border rounded-3 p-3">
                                <legend className="float-none w-auto px-3">Add New Quiz:</legend>
                                <div className="form-floating mb-3">
                                    <input type="text" className="form-control" placeholder='Your quiz name'
                                        value={name} onChange={(event) => setName(event.target.value)} />
                                    <label >Name</label>
                                </div>
                                <div className="form-floating">
                                    <input type="text" className="form-control" placeholder='Your description'
                                        value={description} onChange={(event) => setDescription(event.target.value)} />
                                    <label>Description</label>
                                </div>
                                <div className='my-3'>
                                    <Select
                                        value={type}
                                        defaultValue={type}
                                        onChange={setType}
                                        options={options}
                                        placeholder="Quiz type..."
                                    />
                                </div>
                                <div className="more-actions form-group">
                                    <label className='mb-1'> Upload Image</label>
                                    <input
                                        type="file"
                                        className='form-control'
                                        onChange={(event) => handleChangeFile(event)}
                                    />
                                </div>
                                <div className='btn btn-warning mt-3' onClick={() => handleSubmitQuiz()}>Save</div>
                            </fieldset>
                        </div>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
            <hr/>
            
            <div className="list-detail">
                <TableQuiz/>
            </div>
        </div>
    )
}
export default ManageQuiz