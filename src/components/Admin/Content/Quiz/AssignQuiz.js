import { useEffect, useState } from "react"
import Select from 'react-select'; 
import { getAllQuizForAdmin, getAllUser, postAssignQuiz } from "../../../services/apiService"
import { toast } from 'react-toastify';


const AssignQuiz = () => {

    const [selectedQuiz, setSelectedQuiz] = useState({})
    const [listQuiz, setListQuiz] = useState([])

    const [selectedUser, setSelectedUser] = useState({})
    const [listUser, setListUser] = useState([])
    // console.log("check question", questions)
    useEffect(() => {
        fetchQuiz()
        fetchUser()
    }, [])
    const fetchQuiz = async () => {
        setListQuiz({});
        let res = await getAllQuizForAdmin()
        if (res && res.EC === 0) {
            let newQuiz = res.DT.map(item => {
                return {
                    value: item.id,
                    label: `${item.id} -${item.name}`
                }
            })
            setListQuiz(newQuiz)
        }
    }
    const fetchUser = async () => {
        let res = await getAllUser()
        if (res && res.EC === 0) {
            let users = res.DT.map(item => {
                return {
                    value: item.id,
                    label: `${item.id} - ${item.username} - ${item.email}`
                }
            })
            setListUser(users)
        }
    }
    const handleAssign = async() => {
        let res = await postAssignQuiz(selectedQuiz.value, selectedUser.value)
        // console.log("CHeck--", res)
        if(res & res.EC === 0){
            toast.success(res.EM)
        }else{
            toast.error(res.EM)
        }
    }
    return(
        <div className="assign-quiz-container row">
            <div className='col-6 form-group'>
                <label className='mb-2'>Select Quiz:</label>
                <Select
                    value={selectedQuiz}
                    onChange={setSelectedQuiz}
                    options={listQuiz}
                />
            </div>
            <div className='col-6 form-group'>
                <label className='mb-2'>Select User:</label>
                <Select
                    value={selectedUser}
                    onChange={setSelectedUser}
                    options={listUser}
                />
            </div>
            <div>
                <button className="btn btn-warning mt-3" onClick={() => handleAssign()}>Assign</button>
            </div>
        </div>
    )
}
export default AssignQuiz