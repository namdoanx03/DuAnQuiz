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
    const [previewImage, setPreviewImage] = useState("")

    const handleChangeFile = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setPreviewImage(URL.createObjectURL(event.target.files[0])) //URL.createObjectURL: tao 1 duong link URl tai localhost duoi dang blod, phia client co the doc va hien thi duoc
            setImage(event.target.files[0])
        }
    }
    const handleSubmitQuiz = async() => {
        //validate
        if(!name && !description){
            toast.error('Name & Description is required')
            return 
        }

        let res = await postCreateNewQuiz(description, name, type?.value, image)
        
        if(res && res.EC === 0){
            toast.success(res.EM)
            setName('')
            setDescription('')
            setImage('')
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
                                <div className='more-actions form-group'>
                                    <div className='"col-md-12'>
                                        <label className="form-label btn btn-secondary" htmlFor="labelUpload">
                                            <FaUpload /> Upload File Image
                                        </label>
                                    </div>
                                    <input type='file' className='form-control' id='labelUpload' hidden onChange={(event) => handleChangeFile(event)} />
                                    <div className='col-md-12 img-preview '>
                                        {previewImage ?
                                            <img src={previewImage} />
                                            :
                                            <span>Preview Image</span>
                                        }
                                    </div>
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