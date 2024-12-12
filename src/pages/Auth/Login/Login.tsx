import { useNavigate } from 'react-router-dom'
import styles from './login.module.scss'

export const Login = () => {
	const navigation = useNavigate()
	return (
		<div className={styles.containerLogin}>
			<div className={styles.login}>
				<h3>
					Login <strong>Area</strong>
				</h3>
				<form>
					<div className={styles.group}>
						<label htmlFor='username'>Username:</label>
						<input type='text' id='username' required />
					</div>
					<div className={styles.group}>
						<label htmlFor='password'>Password:</label>
						<input type='password' id='password' required />
					</div>
					<div className={styles.groupBtn}>
						<button>Login</button>
						<button onClick={() => navigation('/register')}>Signup</button>
					</div>
				</form>
			</div>
		</div>
	)
}
