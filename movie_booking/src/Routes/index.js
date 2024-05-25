import HomePage from '../Pages/HomePage/Cnema'
import Booking from '../Pages/BookingMoviePage/BookingMoviePage'
import Category from '../Pages/FilmCategory/FilmCategory'
import Login from '../Pages/LoginLogoutPage/Login'
import SelectYourSeat from '../Pages/SelectSeat/SelectYourSeat'
import Payment from '../Pages/PaymentPage/Payment'
import NotFound from '../Pages/NotFoundPage/NotFoundPage'

export const routes = [
    {
        path: '/',
        page: HomePage,
        isShowHeader: true
    },
    {
        path: '/booking',
        page: Booking,
        isShowHeader: true
    },
    {
        path: '/category',
        page: Category,
        isShowHeader: true
    },
    {
        path: '/login',
        page: Login,
        isShowHeader: true
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