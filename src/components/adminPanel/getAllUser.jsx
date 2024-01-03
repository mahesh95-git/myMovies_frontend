import { useState, useEffect } from "react";
import { getAllUser } from "../../reducer/admin.reducer";
import { useSelector, useDispatch } from "react-redux";

function GetAllUser() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.admin);

  const [userList, setUserList] = useState([]);
  const [page, setPage] = useState(1);
  const total = Math.ceil(user.total/20);

  useEffect(() => {
    dispatch(getAllUser({ page: page }));
  }, [page, dispatch]);

  useEffect(() => {
    if (user.allUser) {
      setUserList(user.allUser);
    }
  }, [user.allUser]);

  const handlePrev = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNext = () => {
    if (page < total) {
      setPage(page + 1);
    }
  };

  return (
    <div className="container-6">
      <div className="user-container">
        <div className="pagination">
            <span>TotalUser:{user.total}</span>
          <button onClick={handlePrev}>Prev</button>
          <span>
            {page} to {total}
          </span>
          <button onClick={handleNext}>Next</button>
        </div>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {userList &&
              userList.map((item, index) => (
                <tr key={index}>
                  <td>{item._id}</td>
                  <td>{item.firstName}</td>
                  <td>{item.lastName?item.lastName:"-"}</td>
                  <td>{item.email}</td>
                  <td>{item.phone}</td>
                  <td>{item.role}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default GetAllUser;
