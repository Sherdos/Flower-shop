import React from 'react';
import Title from '../../components/Title/Title';
import { Link , useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { setUser } from '../../store/authSlice';
import { useLoginUserMutation } from '../../store/cardSlice';


const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {register , handleSubmit} = useForm()
    const [getUser] = useLoginUserMutation()
    const onSumbit = async (data)=> {
        try{
            const userDate = await getUser(data).unwrap()
            dispatch(setUser(userDate))
            navigate('/')
        }catch(e){
            console.log(e.message);
        }
    }
    return (
        <div>
            <Title title='Вход'/>
            <form onSubmit={handleSubmit(onSumbit)}>
                <label htmlFor="username">Имя пользователя</label><br />
                <input {...register('username')} type="username" placeholder='username' /><br />
                <label htmlFor="password">Ваш пароль</label><br />
                <input {...register('password')} type="password" placeholder='Пароль' /><br />
                <button type='submit' className='login__btn btn'>Вход</button>
                <p>Нет акканута?</p>
                <p><Link to={'/auth/register'}> Зарегистрироваться</Link></p>
            </form>
        </div>
    );
}

export default Login;
