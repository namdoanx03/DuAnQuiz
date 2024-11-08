import ReactPaginate from "react-paginate"

const TableUser = (props) => {

    const { listUsers, pageCount } = props

    const handlePageClick = (event) => {
        props.fetchListUsersWithPaginate(+event.selected + 1)
        props.setCurrentPage(+event.selected + 1)
        console.log(`User requested page number ${event.selected}`);
    };
    
    return (
        <>
            <table class="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Username</th>
                        <th scope="col">Email</th>
                        <th scope="col">Role</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {listUsers && listUsers.length > 0  &&
                    listUsers.map((item, index) => {
                        return (
                            <tr key={`table-user-${index}`}>    
                                <td>{item.id}</td>
                                <td>{item.username}</td>
                                <td>{item.email}</td>
                                <td>{item.role}</td>
                                <td>
                                    <button className="btn btn-success"
                                        onClick={() => props.handleClickBtnView(item)}
                                    >View</button>
                                    <button className="btn btn-danger mx-3"
                                        onClick={() => props.handleClickBtnDelete(item)}
                                    >Delete</button>
                                    <button className="btn btn-warning"
                                        onClick={() => props.handleClickBtnUpdate(item)}
                                    >Update</button>
                                </td>
                            </tr>
                        )
                    })
                    }
                    {listUsers && listUsers.length === 0 &&
                    <tr>
                        <td colSpan={'4'}>Not found data</td>
                    </tr>
                    }
                </tbody>
            </table>
            <div className="d-flex justify-content-center">
                <ReactPaginate
                    nextLabel="next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={2}
                    pageCount={pageCount}
                    previousLabel="< previous"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakLabel="..."
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName="pagination"
                    activeClassName="active"
                    renderOnZeroPageCount={null}
                    forcePage={props.currentPage - 1}
                />
            </div>
        </>
    )
}
export default TableUser