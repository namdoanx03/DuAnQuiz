import { useEffect, useState } from "react"
import { getAllQuizForAdmin } from "../../../services/apiService"
import ModalUpdateQuiz from "./ModalUpdateQuiz";
import ModalDeleteQuiz from "./ModalDeleteQuiz";

const TableQuiz = (props) => {

    const [listQuiz, setListQuiz] = useState([])
    const [isShowModalUpdate, setIsShowModalUpdate] = useState(false);
    const [isShowModalDelete, setIsShowModalDelete] = useState(false);
    const [dataUpdate, setDataUpdate] = useState({});
    const [dataDelete, setDataDelete] = useState({});

    useEffect(() => {
        fetchQuiz()
    }, [])

    const fetchQuiz = async() => {
        setDataUpdate({});
        setDataDelete({});
        let res = await getAllQuizForAdmin()
        if(res && res.EC === 0){
            setListQuiz(res.DT)
        }
    }
    const handleUpdate = (quiz) => {
        setDataUpdate(quiz);
        setIsShowModalUpdate(true);
    }
    const handleDelete = (quiz) => {
        setDataDelete(quiz);
        setIsShowModalDelete(true);
    }
    return(
        <>
            <div>List Quizzes: </div>
            <table className="table table-hover table-bordered my-2">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                        <th scope="col">Type</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {listQuiz && listQuiz.map((item, index) => {
                        return (
                            <tr key={`table-quiz-${index}`}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.description}</td>
                                <td>{item.difficulty}</td>
                                <td style={{ display: "flex", gap: "15px" }}>
                                    <button
                                        className="btn btn-warning"
                                        onClick={() => handleUpdate(item)}
                                    >Edit</button>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => handleDelete(item)}
                                    >Delete</button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <ModalUpdateQuiz
                show={isShowModalUpdate}
                setShow={setIsShowModalUpdate}
                dataUpdate={dataUpdate}
                fetchQuiz={fetchQuiz}
                setDataUpdate={setDataUpdate}
            />
            <ModalDeleteQuiz
                show={isShowModalDelete}
                setShow={setIsShowModalDelete}
                dataDelete={dataDelete}
                fetchQuiz={fetchQuiz}
            />
        </>
    )
}
export default TableQuiz