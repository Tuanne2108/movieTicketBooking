import HomePage from '../Pages/HomePage/Cnema'
import Booking from '../Pages/BookingMoviePage/BookingMoviePage'
import Category from '../Pages/FilmCategory/FilmCategory'

import SelectYourSeat from '../Pages/SelectSeat/SelectYourSeat'
import Payment from '../Pages/PaymentPage/Payment'
import NotFound from '../Pages/NotFoundPage/NotFoundPage'
import { MovieDetail } from '../Pages/MovieDetail/MovieDetail'
import { AdminPage } from '../Pages/Admin/AdminPage'
import { SignIn } from '../Pages/User/SignIn'
import { SignUp } from '../Pages/User/SignUp'


export const routes = [
    {
        path: '/',
        page: HomePage,
        isShowHeader: true,
        showFooter: true
    },
    {
        path: '/booking/:movieId',
        page: Booking,
        isShowHeader: true,
    },
    {
        path:'/movie/:movieId',
        page: MovieDetail,
        isShowHeader: true,
        showFooter: true
    },
    {
        path:'/admin',
        page: AdminPage,
        isShowHeader: false
    },
    {
        path: '/category',
        page: Category,
        isShowHeader: true,
        showFooter: true
    },
    {
        path: "/sign-in",
        page: SignIn,
    },
    {
        path: "/sign-up",
        page: SignUp,
    },
    {
        path: '/SelectYourSeat',
        page: SelectYourSeat,
        isShowHeader: true
    },
    {
        path: '/Payment',
        page: Payment,
        isShowHeader: true
    },
    {
        path: '*',
        page: NotFound
    }

]