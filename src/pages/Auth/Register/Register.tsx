import { useNavigate } from 'react-router-dom'
import styles from './register.module.scss'

export const Register = () => {
	const navigation = useNavigate()
	return (
		<div className={styles.containerLogin}>
			<div className={styles.login}>
				<h3>
					Registration<strong>Area</strong>
				</h3>
				<form>
					<div className={styles.group}>
						<label htmlFor='email'>Email:</label>
						<input type='text' id='email' required />
					</div>
					<div className={styles.group}>
						<label htmlFor='username'>Username:</label>
						<input type='text' id='username' required />
					</div>
					<div className={styles.group}>
						<label htmlFor='password'>Password:</label>
						<input type='password' id='password' required />
					</div>
					<div className={styles.group}>
						<label htmlFor='confirm'>Confirm Password:</label>
						<input type='password' id='confirm' required />
					</div>
					<div className={styles.groupBtn}>
						<button>Signup</button>
						<button onClick={() => navigation('/login')}>Go to Login</button>
					</div>
				</form>
			</div>
		</div>
	)
}
