import LayoutDefault from "../Layout/LayoutDefault/LayoutDefault";
import Answer from "../Page/Answer/answer";
import Default from "../Page/Default/default";
import Homes from "../Page/Home/home";
import Login from "../Page/Logins/logins";
import NotFount from "../Page/NotFound/notfound";
import Register from "../Page/Register/register";
import ShowAnswers from "../Page/Showquestion/showAnswers";
import Excerse from "../Page/Showresult/Excerse";
import Topic from "../Page/Topic/topic";
import RequireAuth from "../auth/requireAuth";
import PublicRoute from "./PublicOnly";

export const router = [
    {
        path: '/',
        element: <LayoutDefault />,
        children: [
            {
                index: true,
                element:
                    <PublicRoute>
                        <Default />
                    </PublicRoute>
            },
            {
                path: 'Login',
                element: <Login />
            },
            {
                path: 'Register',
                element: <Register />
            },
            {
                path: 'Homes',
                element:
                    <RequireAuth>
                        <Homes />
                    </RequireAuth>
            },
            {
                path: 'Topic',
                element:
                    <RequireAuth>
                        <Topic />
                    </RequireAuth>
            },
            {
                path: 'Answer',
                element:
                    <RequireAuth>
                        <Answer />
                    </RequireAuth>
            },
            {
                path: 'Excerse/:id',
                element:
                    <RequireAuth>
                        <Excerse />
                    </RequireAuth>
            },
            {
                path: 'Showanswer/:id',
                element:
                    <RequireAuth>
                        <ShowAnswers />
                    </RequireAuth>
            },
            {
                path: '*',
                element: <NotFount />
            }
        ]
    }
];