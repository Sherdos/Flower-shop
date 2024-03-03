import React, { useState, useEffect } from 'react';
import { useGetAllReviewsQuery } from '../../store/reviewsSlice';
import { useForm } from 'react-hook-form';
import { useSetCommentMutation } from '../../store/reviewsSlice';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import img from '../../assets/reviews/img.png'

const Reviews = () => {
	const  user = useSelector((state) => state.auth.user)
	const { data} = useGetAllReviewsQuery()
	const [show, setShow] = useState('none');
	const handleClose = () => setShow("none");
	const handleShow = () => setShow("block");
	console.log(show);
	const [addComment] = useSetCommentMutation({
		onSuccess: () => {
			queryClient.invalidateQueries('getAllReviews'); // Название вашего запроса для получения всех отзывов
		  },
	})
	const navigate = useNavigate()
	const {
		register,
		handleSubmit,
		reset
	} = useForm()
	const onSubmit = async (data) => {
			try {
				const commentData = await addComment(data).unwrap()
				await refetch();  // обновление данных после успешного добавления
				reset();  // сброс формы
				handleClose();
				navigate('/reviews')
				
			} catch (e) {
				console.log(e.message);
			}
		}
	return (
		<div className='reviews'>
			<form style={{ display: show }} onSubmit={handleSubmit(onSubmit)}>
				<div
					show={show}
					onHide={handleClose}
					backdrop="static"
					keyboard={false}
				>
					<div closeButton className='btn__name'>
						<input  value={user?.user.name} {...register('name')}   required type="text" placeholder='имя' />
					</div>
					<div className='btn__kom'>
						<input  {...register('title')} required type="text" placeholder='комментари' /> <br />
					</div>
					<div className='btn__opr'>
						<button variant="secondary" onClick={handleClose}>
							Close
						</button>
						<button type='submit' variant="primary" onClick={handleClose}>отправить</button>
					</div>
				</div>
			</form>
			<div className="page">
				<div className="page__title">
					<div class="title__wrap">
						<h1>Отзывы</h1>
						{
							user ? <button onClick={handleShow} class="watch-all" >Оставить отзыв</button> :
							<p>Вам нужно регистрация, <br /> чтобы </p>
						}
						
					</div>
				</div>
				{
					data?.map((item) => (
						<div key={item.id} className="comments">
							<div className="comments__wrap">
								<div className="comments__item-content">
									<div className="feedback-swiper__slide">
										<div className="feedback-swiper__slide-title">
											<span>{item.name}</span>
										</div>
										<div className="feedback-swiper__slide-stars">
											<span><img src={img} alt="star" /></span>
											<span><img src={img} alt="star" /></span>
											<span><img src={img} alt="star" /></span>
											<span><img src={img} alt="star" /></span>
											<span><img src={img} alt="star" /></span>
										</div>
										<p>{item.title}</p>
									</div>
									<div className="comments__item" id="bx_3218110189_1402"></div>
								</div>
							</div>
						</div>
					))
				}

			</div>
		</div>
	);
}

export default Reviews;
