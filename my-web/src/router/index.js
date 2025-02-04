import { createBrowserRouter, Navigate } from 'react-router-dom'
import Main from '../pages/main'
import Home from '../pages/home'
import Mall from '../pages/mall'
import User from '../pages/user'
import pageOne from '../pages/other/pageOne'
import pageTwo from '../pages/other/pageTwo'
import Login from '../pages/login'
import PaymentPage from '../pages/other/payment'
import Discard from '../pages/other/discard'
import Delivery from '../pages/other/delivery'
import Recharge from '../pages/other/recharge'
import OrderInfoPage from '../pages/other/orderInfoPage'
import LogisticsInfo from '../pages/other/logisticsInfo'


const routes = [
    {
        path: '/',
        Component: Main,
        children: [
            {
                path: '/',
                element: <Navigate to="home" replace />
            },
            {
                path: 'home',
                Component: Home,
            },
            {
                path: 'mall',
                Component: Mall,
            },
            {
                path: 'user',
                Component: User,
            },
            {
                path: 'other',
                children: [
                    {
                        path: 'pageOne',
                        Component: pageOne
                    },
                    {
                        path: 'pageTwo',
                        Component: pageTwo
                    }
                ]
            },
            {
                path: 'payment',
                Component: PaymentPage
            },
            {
                path: 'discard',
                Component: Discard
            },
            {
                path: 'delivery',
                Component: Delivery
            },
            {
                path: 'recharge',
                Component: Recharge
            },
            {
                path: 'order',
                Component: OrderInfoPage
            },
            {
                path: 'logisticsInfo',
                Component: LogisticsInfo
            }
        ]
    },
    {
        path: '/login',
        Component: Login
    }
]
export default createBrowserRouter(routes)