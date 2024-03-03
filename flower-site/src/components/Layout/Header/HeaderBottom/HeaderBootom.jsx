import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCategory } from '../../../../store/card';
import { useSelector } from 'react-redux';

const HeaderBootom = () => {
    const dispatch = useDispatch()
    const {category} = useSelector((state)=> state.category)
    const handleCategoryClick = (category) => {
        dispatch(setCategory(category));
    };
    return (
        <div className='header__bottom'>
            <div className="container">
                <div className="header__lower-wrap">
                    <ul className='menu'>
                        <li onClick={() => handleCategoryClick('All')} className={category === 'All' ? 'active' : ''} >
                                Все
                           </li>
                        <li onClick={() => handleCategoryClick('Пеларгония')} className={category === 'Пеларгония' ? 'active' : ''}>
                                
                                Пеларгония
                        </li>
                        <li onClick={() => handleCategoryClick('Бегония')} className={category === 'Бегония' ? 'active' : ''}>
                                Бегония
                        </li>
                        <li onClick={() => handleCategoryClick('Фуксия')} className={category === 'Фуксия' ? 'active' : ''}> 
                                Фуксия
                        </li>
                        <li onClick={() => handleCategoryClick('Бальзамин')} className={category === 'Бальзамин' ? 'active' : ''}>
                                Бальзамин
                        </li>
                        <li onClick={() => handleCategoryClick('Олеандр')} className={category === 'Олеандр' ? 'active' : ''}>
                                Олеандр
                        </li>
                        <li onClick={() => handleCategoryClick('Хризантема')} className={category === 'Хризантема' ? 'active' : ''}>
                                Хризантема
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default HeaderBootom;
