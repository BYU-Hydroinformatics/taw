import Dashboard from "../views/Dashboard/Dashboard"
import UserProfile from "../views/UserProfile/UserProfile"
import Login from "../views/Login/Login"
import Register from "../views/Register/Register"
import ManageUsers from "../views/UserManagement/ManageUser"
import { AllApp, AppView, EditApp } from "../views/Apps"
import AddApp from "../views/Apps/new"
const dashboardRoutes = [
  {
    path: "/landing",
    name: "Home",
    icon: "pe-7s-graph",
    component: Dashboard
  },
  {
    path: "/user",
    name: "Edit My Profile",
    icon: "pe-7s-user",
    component: UserProfile,
    loginRequired:true,
    minimumStatus:1
  },
  {
    path: "/login",
    name: "Login",
    icon: "pe-7s-unlock",
    component: Login,
    noShow:true
  },
  {
    path: "/register",
    name: "Register",
    icon: "pe-7s-unlock",
    component: Register,
    noShow:true
  },
  {
    path: "/manageusers",
    name: "Manage Users",
    icon: "pe-7s-users",
    component: ManageUsers,
    loginRequired:true,
        minimumStatus:2

  },
  {
    path: "/apps",
    name: "All Apps",
    icon: "pe-7s-menu",
    component: AllApp
  },
 
  {
    path: "/app/new",
    name: "New App",
    icon: "pe-7s-menu",
    component: AddApp,
    loginRequired:true,
    minimumStatus:1
  },
  {
    path: "/app/:appid",
    name: "All Apps",
    icon: "pe-7s-menu",
    component: AppView,
    noShow:true
  },
  {
    path: "/app/edit/:appid",
    name: "Edit App",
    icon: "pe-7s-menu",
    component: EditApp,
    noShow:true
  },
  {
    redirect: true,
    path: "/",
    to: "/landing",
    name: "Home"
  }
]

export default dashboardRoutes