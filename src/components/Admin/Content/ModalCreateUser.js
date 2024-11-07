import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { SlPlus } from "react-icons/sl";
import { postCreateNewUser } from '../../services/apiService';
import { ToastContainer, toast } from 'react-toastify';

const ModalCreateUser = (props) => {
    const { show, setShow } = props; //lay dc prop tu cha tryen xuong, prop la 1 bien obj

    const handleClose = () => {
        setShow(false)
        setEmail("");
        setPassword("")
        setUsername("")
        setRole("")
        setImage("")
        setPreviewImage("")
    };

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [username, setUsername] = useState("")
    const [role, setRole] = useState("USER")
    const [image, setImage] = useState("")

    const handleUploadImage = (event) =>{
        if(event.target && event.target.files && event.target.files[0]){
            setPreviewImage(URL.createObjectURL(event.target.files[0])) //URL.createObjectURL: tao 1 duong link URl tai localhost duoi dang blod, phia client co the doc va hien thi duoc
            setImage(event.target.file[0])
        }else{
            // setPreviewImage("")
        }
    }
    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };
    const handleSubmitCreateUsr = async() => {
        //validate
        const isValidEmail = validateEmail(email);
        if(!isValidEmail){
            toast.error("invalid Email")
            return
        }
        if(!password){
            toast.error("invalid Password")
            return
        }

        //call api
        // let data = {
        //     email: email,
        //     password: password,
        //     username: username,
        //     role: role,
        //     userImage:image
        // }
        // console.log(data)
        

        let data = await postCreateNewUser(email, password, username, role, image)
        if(data && data.EC === 0){
            toast.success(data.EM)
            handleClose()
            await props.fetchListUsers()
    }
        if(data && data.EC !== 0){
        toast.error(data.EM)
    }
}
    const [previewImage, setPreviewImage] = useState("")

    return (
        <>
            {/* <Button variant="primary" onClick={handleShow}>
                Launch demo modal
            </Button> */}

            <Modal show={show} onHide={handleClose} size="xl" backdrop="static" className='modal-add-user'>
                <Modal.Header closeButton>
                    <Modal.Title>Add new user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label for="inputEmail4" className="form-label">Email</label>
                            <input type="email" className="form-control" id="inputEmail4" value={email} onChange={(event) => setEmail(event.target.value)}/>
                        </div>
                        <div className="col-md-6">
                            <label for="inputPassword4" className="form-label">Password</label>
                            <input type="password" className="form-control" id="inputPassword4" value={password} onChange={(event) => setPassword(event.target.value)} />
                        </div>
                        <div className="col-md-6">
                            <label for="inputCity" className="form-label">Username</label>
                            <input type="text" className="form-control" id="inputCity" value={username} onChange={(event) => setUsername(event.target.value)} />
                        </div>
                        <div className="col-md-4">
                            <label for="inputState" className="form-label">Role</label>
                            <select id="inputState" className="form-select" onChange={(event) => setRole(event.target.value)}>
                                <option value="USER">USER</option>
                                <option value="ADMIN">ADMIN</option>
                            </select>
                        </div>
                        <div className='"col-md-12'>
                            <label className="form-label label-upload" htmlFor="labelUpload">
                                <SlPlus /> Upload File Image
                            </label>
                            <input type='file' id='labelUpload' hidden  onChange={(event) => handleUploadImage(event) }/>
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
                    <Button variant="primary" onClick={() => handleSubmitCreateUsr()}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalCreateUser