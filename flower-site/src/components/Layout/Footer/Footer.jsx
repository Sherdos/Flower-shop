import React from 'react';
import { Link } from 'react-router-dom';


const Footer = () => {
    return (
        <div className="footer">
            <div className="container">
                <div className="con1">
                    <div className="footer__logo">
                        <Link to={'/'}>
                            <img src="src/assets/header.png/logo-w 1.png" alt="ФлораМаркт" />
                            <div>© ФлораМаркт, 2022-2024</div>
                        </Link>
                    </div>
                    <div className="footer__tel">
                        <div className="footer__tel-img">
                            <img src="src/assets/header.png/footer-tel.svg" alt="ФлораМаркт"/>
                        </div>
                        <div className="footer__tel-links">
                            <a href="tel:+996772825266">+996 772 82 52 66</a>
                            <a href="tel:+996550545260">+996 550 54 52 60</a>
                        </div>
                    </div>
                    <ul>
                        <li><a href="/contacts">Адреса цветочных центров</a></li>
                        <li><a href="/about">Политика конфиденциальности</a></li>
                    </ul>
                </div>
                <ul className="con2">
                    <li><Link to={'/'}>Каталог</Link></li>
                    <li><Link to={'/about'}>О компании</Link></li>
                    <li><Link to={'/payment'}>Способы оплаты</Link></li>
                    <li><Link to={'/delivery'}>Доставка</Link></li>
                    <li><Link to={'/contacts'}>Контакты</Link></li>
                    <li><a href="/">Пеларгония</a></li>
                    <li><a href="/">Бегония</a></li>
                    <li><a href="/">Фуксия</a></li>
                    <li><a href="/">Бальзамин</a></li>
                    <li><a href="/">Олеандра</a></li>
                    <li><a href="/">Хризантема</a></li>
                    <li><a href="">Украшение залов</a></li>
                    <li><a href="">Игрушки</a></li>
                    <li><a href="">Торты</a></li>
                    <li><a href="">Открытки</a></li>
                    <li><a href="">Авторские работы</a></li>
                </ul>
                <p style={{textAlign:"center", fontSize:"30px", color:"white"}}>copyright <a style={{textAlign:"center", fontSize:"30px"}} href="mail">code run</a></p>
            </div>
        </div>
    );
}

export default Footer;
