import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { FaArrowLeft, FaLock } from 'react-icons/fa'
import { usePassword } from '../../context/PasswordContext'
import styles from './password.module.scss'

export const Password = () => {
	const { password } = usePassword()
	const [inputPassword, setInputPassword] = useState('')
	const navigation = useNavigate()

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (inputPassword === password) {
			navigation('/')
			alert('Пароль правильный!')
			setInputPassword('')
		} else {
			alert('Неверный пароль')
		}
	}

	console.log(password)

	return (
		<div className={styles.password}>
			<div className={styles.form}>
				<h1>
					<FaLock />
				</h1>
				<form onSubmit={handleSubmit}>
					<input
						type='password'
						placeholder='Password'
						value={inputPassword}
						onChange={e => setInputPassword(e.target.value)}
					/>
					<input type='submit' title='Login' value={'Login'} />
				</form>
				<Link to={'/'}>
					<FaArrowLeft /> Go back to Notepad
				</Link>
			</div>
		</div>
	)
}
