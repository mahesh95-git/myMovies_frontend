import {useState} from 'react'
import { useDispatch } from 'react-redux';
import { changePassword } from '../../reducer/user.reducer';

function ResetPassword() {
    const [newPassword, setNewPassword] = useState("");
const [confirmPassword, setconfirmPassword] = useState("");
const [oldPassword,setOldPassword]=useState("")
const dispatch = useDispatch();
const handleChangePassword=(e)=>{
    e.preventDefault()
dispatch(changePassword({newPassword:newPassword,confirmPassword:confirmPassword,oldPassword:oldPassword}))
}
  return (
    <div className="container-23">
      <div className="container-23-1">
        <h2>MYMOVIES</h2>
        <form action="">
        <label htmlFor="oldPassword">Old Password</label>
          <input
            type="text"
            id="oldPassword"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            placeholder="Old Password"
          />
          <label htmlFor="newPassword">New Password</label>
          <input
            type="text"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="New Password"
          />
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="text"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setconfirmPassword(e.target.value)}
            placeholder="Confirm Password"
          />

          <button onClick={handleChangePassword}>Submit</button>
        </form>
        <div className="container-23-1-1">
          <p>Copyright © 2021 My Movies All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}

export default ResetPassword
