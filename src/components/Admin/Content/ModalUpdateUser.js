import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { SlPlus } from "react-icons/sl";
import { postCreateNewUser, putUpdateUser } from '../../services/apiService';
import { toast } from 'react-toastify';
import _ from 'lodash'; // giúp xử lý các tác vụ liên quan đến mảng, đối tượng, chuỗi và các kiểu dữ liệu khác một cách dễ dàng và hiệu quả

const ModalUpdateUser = (props) => {
    const { show, setShow, dataUpdate, currentPage } = props; //lay dc prop tu cha tryen xuong, prop la 1 bien obj


    const handleClose = () => {
        setShow(false)
        setEmail("");
        setPassword("")
        setUsername("")
        setRole("USER")
        setImage("")
        setPreviewImage("")
        props.resetUpdateData()
    };

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [username, setUsername] = useState("")
    const [role, setRole] = useState("USER")
    const [image, setImage] = useState("")
    const [previewImage, setPreviewImage] = useState("")

    useEffect(() => {
        if (!_.isEmpty(dataUpdate)) {
            console.log("check data", dataUpdate)
            //update state
            setEmail(dataUpdate.email);
            setUsername(dataUpdate.username)
            setRole(dataUpdate.role)
            setImage("")
            if (dataUpdate.image) {
                setPreviewImage(`data:image/jpeg;base64,${dataUpdate.image}`)
            }
        }
    }, [dataUpdate])

    const handleUploadImage = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setPreviewImage(URL.createObjectURL(event.target.files[0])) //URL.createObjectURL: tao 1 duong link URl tai localhost duoi dang blod, phia client co the doc va hien thi duoc
            setImage(event.target.files[0])
        } else {
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
    const handleSubmitCreateUser = async () => {
        //validate
        const isValidEmail = validateEmail(email);
        if (!isValidEmail) {
            toast.error("invalid Email")
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


        let data = await putUpdateUser(dataUpdate.id, username, role, image)
        if (data && data.EC === 0) {
            toast.success(data.EM)
            handleClose()
            // await props.fetchListUsers()
            // props.setCurrentPage(1)
            await props.fetchListUsersWithPaginate(currentPage)
        }
        if (data && data.EC !== 0) {
            toast.error(data.EM)
        }
    }


    return (
        <>
            {/* <Button variant="primary" onClick={handleShow}>
                Launch demo modal
            </Button> */}

            <Modal show={show} onHide={handleClose} size="xl" backdrop="static" className='modal-add-user'>
                <Modal.Header closeButton>
                    <Modal.Title>Update a user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label for="inputEmail4" className="form-label">Email</label>
                            <input type="email" className="form-control" id="inputEmail4" value={email} disabled onChange={(event) => setEmail(event.target.value)} />
                        </div>
                        <div className="col-md-6">
                            <label for="inputPassword4" className="form-label">Password</label>
                            <input type="password" className="form-control" id="inputPassword4" disabled value={password} onChange={(event) => setPassword(event.target.value)} />
                        </div>
                        <div className="col-md-6">
                            <label for="inputCity" className="form-label">Username</label>
                            <input type="text" className="form-control" id="inputCity" value={username} onChange={(event) => setUsername(event.target.value)} />
                        </div>
                        <div className="col-md-4">
                            <label for="inputState" className="form-label">Role</label>
                            <select id="inputState" className="form-select" value={role} onChange={(event) => setRole(event.target.value)}>
                                <option value="USER">USER</option>
                                <option value="ADMIN">ADMIN</option>
                            </select>
                        </div>
                        <div className='"col-md-12'>
                            <label className="form-label label-upload" htmlFor="labelUpload">
                                <SlPlus /> Upload File Image
                            </label>
                            <input type='file' id='labelUpload' hidden onChange={(event) => handleUploadImage(event)} />
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
                    <Button variant="primary" onClick={() => handleSubmitCreateUser()}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalUpdateUser