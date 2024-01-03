import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteUser,
  searchUserProfile,
  updateUserProfile,
} from "../../reducer/admin.reducer";

function UpdateUserProfile() {
  const dispatch = useDispatch();
  const [id, setId] = useState("");
  const [role, setRole] = useState("");
  
  const { tempUser } = useSelector((state) => state.admin);
  const handleUpdate = () => {
    dispatch(updateUserProfile({ id, role }));
  };
  const handleUserSearch = (e) => {
    e.preventDefault()
    dispatch(searchUserProfile({ id }));
  };
  const handleDelete=(e)=>{
    e.preventDefault()
    dispatch(deleteUser({id}))

  }
  return (
    <div className="container-7">
      <h1 className="text-center">Update User Profile</h1>
      <div className="container-7-2">
        <form>
        <input
          type="text"
          placeholder="Search User By Id"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />

        <button onClick={handleUserSearch}>Search</button>
        </form>
     
      </div>
      <div className="container-7-3">
        <form>
          <label htmlFor="frstName">First name: </label>

          <br />
          <input
            id="frstName"
            name="frstName"
            readOnly
            value={tempUser.firstName}
          />
          <br />
          <label htmlFor="lastName">Last name: </label>

          <br />
          <input
            id="lastName"
            name="lastName"
            readOnly
            value={tempUser.lastName}
          />
          <br />
          <label htmlFor="email">Email: </label>
          <br />

          <input id="email" name="email" readOnly value={tempUser.email} />
          <br />

          <label htmlFor="phoneNumber">Phone Number: </label>
          <br />

          <input
            id="phoneNumber"
            name="phoneNumber"
            readOnly
            value={tempUser.phone}
          />
          <br />

          <label htmlFor="userRole">UserRole:</label>
          <select
            id="userRole"
            onChange={(e) => setRole({ role: e.target.value })}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <br />
          <br />
          <div className="container-update">
            <button className="update" onClick={handleUpdate}>
              Update
            </button>
            {/*working*/}
            <button className="block">Block User</button>
            <button className="block" onClick={handleDelete}>Delete</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateUserProfile;
