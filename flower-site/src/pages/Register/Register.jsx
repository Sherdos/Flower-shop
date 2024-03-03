import React from 'react';
import Title from '../../components/Title/Title';
import { Link } from 'react-router-dom';
import { useRegisterUserMutation } from '../../store/cardSlice';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../../store/authSlice';

const Register = () => {
    const navigate = useNavigate()
    const [addUser] = useRegisterUserMutation()
    const dispatch = useDispatch()
    const onSubmit = async(data)=>{
        try{    
           const userData = await addUser(data).unwrap()
           dispatch(setUser(userData))
            navigate('/auth/login')
        }catch(e){
            console.log(e.message);
        }
    }
    const {register, handleSubmit, watch, formState:{errors}} = useForm()
    return (
        <div>
            <Title title='Регистрация'/>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="email">Ваш email</label><br />
                <input {...register('email')} type="email" placeholder='Email' /><br />
                <label htmlFor="password">Ваш пароль</label><br />
                <input {...register('password')} type="password" placeholder='Пароль' /><br />
                <label htmlFor="name">Ваше имя</label><br />
                <input {...register('name')} type="text" placeholder='Имя' /><br />
                <button type='submit' className='login__btn btn'>Зарегистрироваться</button>
                <p>Есть акканут?</p>
                <p><Link to={'/auth/login'}> Войти</Link></p>
            </form>
        </div>
    );
}

export default Register;
