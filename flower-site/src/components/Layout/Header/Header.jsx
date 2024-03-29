import React from 'react';
import HeaderTop from './HeaderTop/HeaderTop';
import HeaderBootom from './HeaderBottom/HeaderBootom';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import logo from '../../../assets/header.png/logo.jpg'

const Header = () => {
    const data = useSelector(state=> state.auth.user)
    return (
        <header>
            <HeaderTop />
            <div className='container'>
                <div className="header">
                    <div className='header__logo'>
                        <Link to={'/'}>
                            <img src={logo} alt="ФлораМаркт" />
                            <div>сеть цветочных оптово-розничных центров</div>
                        </Link>
                    </div>
                    <div className="header__contacts">
                        <ul>
                            <li>
                                <a href="tel:996772825266">+996 772 82 52 66</a>
                            </li>
                            <li>
                                <a href="tel:996550545260">+996 550 54 52 60</a>
                            </li>
                        </ul>
                        <ul>
                            <li>
                                <span>
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8 0.25C3.71875 0.25 0.25 3.71875 0.25 8C0.25 12.2812 3.71875 15.75 8 15.75C12.2812 15.75 15.75 12.2812 15.75 8C15.75 3.71875 12.2812 0.25 8 0.25ZM8 14.25C4.53125 14.25 1.75 11.4688 1.75 8C1.75 4.5625 4.53125 1.75 8 1.75C11.4375 1.75 14.25 4.5625 14.25 8C14.25 11.4688 11.4375 14.25 8 14.25ZM9.90625 11C10.0938 11.125 10.3125 11.0938 10.4375 10.9062L11.0312 10.125C11.1562 9.9375 11.125 9.71875 10.9375 9.59375L8.875 8.0625V3.625C8.875 3.4375 8.6875 3.25 8.5 3.25H7.5C7.28125 3.25 7.125 3.4375 7.125 3.625V8.78125C7.125 8.875 7.15625 9 7.25 9.0625L9.90625 11Z" fill="#4BB45E" />
                                    </svg>
                                </span> &nbsp;
                                <a href="">Ждем вас с 9:00 до 20:00</a>
                            </li>
                            <li>
                            <Link to={'/contacts'}>
                               <span>
                                    <svg width="12" height="17" viewBox="0 0 12 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M6 0C2.65625 0 0 2.71875 0 6C0 8.25 0.71875 8.9375 4.71875 15.3125C5.3125 16.25 6.65625 16.25 7.25 15.3125C11.25 8.9375 12 8.25 12 6C12 2.6875 9.28125 0 6 0ZM6 14.5C2 8.125 1.5 7.71875 1.5 6C1.5 3.53125 3.5 1.5 6 1.5C8.46875 1.5 10.5 3.53125 10.5 6C10.5 7.71875 10 8.0625 6 14.5ZM3.5 6C3.5 7.40625 4.59375 8.5 6 8.5C7.375 8.5 8.5 7.40625 8.5 6C8.5 4.625 7.375 3.5 6 3.5C4.59375 3.5 3.5 4.625 3.5 6Z" fill="#4BB45E" />
                                    </svg>

                               </span> &nbsp;
                               <a href="">Адреса цветочных центров</a> 
                            </Link>      
                            </li>
                        </ul>
                    </div>
                   {
                    data ?  <div className="header__buttons">
                        <Link to="/favorites" className='header__fav'>
                            <span>
                                <svg width="32" height="29" viewBox="0 0 32 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M30.3828 4H7.30469L6.8125 1.59375C6.70312 0.992188 6.15625 0.5 5.55469 0.5H0.90625C0.523438 0.5 0.25 0.828125 0.25 1.15625V1.59375C0.25 1.97656 0.523438 2.25 0.90625 2.25H5.17188L9 22.6484C8.45312 23.3047 8.125 24.125 8.125 25C8.125 26.9688 9.65625 28.5 11.625 28.5C13.5391 28.5 15.125 26.9688 15.125 25C15.125 24.3984 14.9062 23.7969 14.6328 23.25H22.5625C22.2891 23.7969 22.125 24.3984 22.125 25C22.125 26.9688 23.6562 28.5 25.625 28.5C27.5391 28.5 29.125 26.9688 29.125 25C29.125 24.0703 28.6875 23.1406 28.0312 22.5391C27.9219 21.9375 27.375 21.5 26.7734 21.5H10.5859L9.92969 18H28.0312C28.6875 18 29.1797 17.6172 29.3438 16.9609L31.6953 5.58594C31.8594 4.76562 31.2578 4 30.3828 4ZM13.375 25C13.375 25.9844 12.5547 26.75 11.625 26.75C10.6406 26.75 9.875 25.9844 9.875 25C9.875 24.0703 10.6406 23.25 11.625 23.25C12.5547 23.25 13.375 24.0703 13.375 25ZM25.625 26.75C24.6406 26.75 23.875 25.9844 23.875 25C23.875 24.0703 24.6406 23.25 25.625 23.25C26.5547 23.25 27.375 24.0703 27.375 25C27.375 25.9844 26.5547 26.75 25.625 26.75ZM27.7031 16.25H9.60156L7.63281 5.75H29.8906L27.7031 16.25Z" fill="#4BB45E" />
                                </svg>
                            </span>
                            Корзина
                        </Link>
                    </div> :
                    <p>Вам нужно регистрация, <br /> чтобы оформить заказ.</p>
                   }
                   
                </div>
            </div>
            <HeaderBootom/>
        </header>
    );
}

export default Header;
