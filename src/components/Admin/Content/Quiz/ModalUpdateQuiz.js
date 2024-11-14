import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { SlPlus } from "react-icons/sl";
import { toast } from 'react-toastify';
import _ from 'lodash';
import { updateQuizForAdmin } from '../../../services/apiService';

const ModalUpdateQuiz = (props) => {
    const { show, setShow, dataUpdate, setDataUpdate } = props; //lay dc prop tu cha tryen xuong, prop la 1 bien obj
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState("");
    const [image, setImage] = useState("");
    const [previewImage, setPreviewImage] = useState("");

    const handleClose = () => {
        setShow(false)
        setName("");
        setDescription("");
        setType("");
        setImage("");
        setPreviewImage("");
        setDataUpdate({});
    };
    

    useEffect(() => {
        if (!_.isEmpty(dataUpdate)) {
            console.log("check data", dataUpdate)
            //update state
            setName(dataUpdate.name);
            setDescription(dataUpdate.description)
            setType(dataUpdate.difficulty);
            setImage("")
            if (dataUpdate.image) {
                setPreviewImage(`data:image/jpeg;base64,${dataUpdate.image}`)
            }
        }
    }, [dataUpdate])

    const handleChangeFile = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setPreviewImage(URL.createObjectURL(event.target.files[0])) //URL.createObjectURL: tao 1 duong link URl tai localhost duoi dang blod, phia client co the doc va hien thi duoc
            setImage(event.target.files[0])
        } else {
            // setPreviewImage("")
        }
    }

    const handSubmitUpdateQuiz = async () => {
        //validate
        if (!name) {
            toast.error("invalid Name")
            return
        }
        if (!description) {
            toast.error("invalid Description")
            return
        }

        let data = await updateQuizForAdmin(dataUpdate.id, name, description,type, image)
        if (data && data.EC === 0) {
            toast.success(data.EM)
            await props.fetchQuiz();
            handleClose()
        }
        if (data && data.EC !== 0) {
            toast.error(data.EM)
        }
    }


    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                size="xl"
                backdrop="static"
                className='modal-add-user'
            >
                <Modal.Header closeButton>
                    <Modal.Title>Update the quiz</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Description</label>
                            <input
                                type="text"
                                className="form-control"
                                value={description}
                                onChange={(event) => setDescription(event.target.value)}
                            />
                        </div>

                        <div className="col-md-4">
                            <label className="form-label">Difficulty</label>
                            <select className="form-select"
                                onChange={(event) => setType(event.target.value)}
                                value={type}
                            >
                                <option value="EASY">EASY</option>
                                <option value="MEDIUM">MEDIUM</option>
                                <option value="HARD">HARD</option>
                            </select>
                        </div>

                        <div className='col-md-12'>
                            <label className="form-label label-upload" htmlFor='labelUpload'>
                                Upload File Image
                            </label>
                            <input
                                type="file"
                                id="labelUpload" hidden
                                onChange={(event) => handleChangeFile(event)}
                            />
                        </div>

                        <div className='col-md-12 img-preview'>
                            {previewImage ?
                                <img src={previewImage} />
                                :
                                <span>Preview Image</span>
                            }
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => handSubmitUpdateQuiz()}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalUpdateQuiz