import HomePage from '../Pages/HomePage/Cnema'
import Booking from '../Pages/BookingMoviePage/BookingMoviePage'
import Category from '../Pages/FilmCategory/FilmCategory'
import Login from '../Pages/LoginLogoutPage/Login'
import SelectYourSeat from '../Pages/SelectSeat/SelectYourSeat'
import NotFound from '../Pages/NotFoundPage/NotFoundPage'
import Signup from '../Pages/LoginLogoutPage/Signup'
import ResultPage from '../Pages/LoginLogoutPage/ResultPage';

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
        path: '/signup',
        page: Signup
    },
    {
        path: '/SelectYourSeat',
        page: SelectYourSeat,
        isShowHeader: true
    },
    {
        path: '/result',
        page: ResultPage,
        isShowHeader: false // or true based on your layout needs
    },
    {
        path: '*',
        page: NotFound
    }

]