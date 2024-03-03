import React from 'react';

const Contacts = () => {
    return (
        <div className='contacts'>
            <div className="container">
                <h1>Контакты</h1>
                <div className="can">
                    <p className='pq'>Адреса и телефоны цветочных центров:</p>
                    <div className="contact__buttons">
                        <a  className="contact-buttons__option js-fast-order-form" data-id="1627"><p>Кыргызстан.  г.Ош.   Жапалак.  Ул. М.Маматеминова 12 <a href="tel:996772825266">+996 772 82 52 66</a></p></a>
                    </div>
                    <div className="contact__buttons">
                        <a  className="contact-buttons__option js-fast-order-form" data-id="1627"><p>Кыргызстан.  г.Ош.   Жапалак.  Ул. М.Маматеминова 12 <a href="tel:996550545260">+996 550 54 52 60</a></p></a>
                    </div>
                    <p className='po'>Время работы: с 9:00 до 20:00</p>
                    <p className='pa'>E-mail: <a>nurelnasirov8@gmail.com</a></p>
                </div>
            </div>
        </div>
    );
}

export default Contacts;
