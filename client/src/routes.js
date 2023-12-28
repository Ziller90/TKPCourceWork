import Account from './pages/account/Account'
import Auth from './pages/auth/Auth'
import Main from './pages/dataPage/dataPage'
import GroupPage from "./pages/groupPage/groupPage";
import facultyPage from "./pages/facultyPage/facultyPage";

export const publicRoutes = [
    {
        path:  '/account',
        Component: Account
    },
    {
        path:  '/',
        Component: Main
    },
    {
        path:  '/courses',
        Component: Account
    },
    {
        path:  '/faculties',
        Component: facultyPage
    },
    {
        path:  '/groups',
        Component: GroupPage
    },
    {
        path:  '/login',
        Component: Auth
    },
    {
        path:  '/registration',
        Component: Auth
    },
]

