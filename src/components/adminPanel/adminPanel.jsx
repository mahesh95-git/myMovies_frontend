import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
function AdminPanel() {
  const AdminHeaders = [
    {
      name: "Dashboard",
      path: "/admin/dashboard",
    },
    {
      name: "Add New Content",
      path: "addnewconent",
    },

    {
      name: "Update Content",
      path: "updatecontent",
    },
    {
      name: "All User",
      path: "alluser",
    },
    {
      name: "Edit User Profile",
      path: "edituserprofile",
    },
    {
      name: "Logout",
      path: "logout",
    },
  ];

  return (
    <>
      <div className="container-5">
        <div className="container-5-1">
          <ul className="allOptions">
            <h2>Admin Panel</h2>
            {AdminHeaders.map((item) => (
              <li key={item.name}>
                <Link to={item.path}>{item.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <Outlet />
      </div>
    </>
  );
}

export default AdminPanel;

