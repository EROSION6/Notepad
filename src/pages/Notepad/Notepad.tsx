import { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { Footer } from '../../components/Footer/Footer'
import { Header } from '../../components/Header/Header'
import { Modal } from '../../components/ui/Modal/Modal'
import { useBackground } from '../../context/BackgroundContext'
import { INotepad, useNotepad } from '../../context/NotePadContext'
import { usePassword } from '../../context/PasswordContext'
import { useSetting } from '../../context/SettingContext'
import styles from './notepad.module.scss'

interface IPassword {
	password: string
	isShowModal: boolean
	handleCreatePassword: React.MouseEventHandler<HTMLButtonElement>
	setPassword: (password: string) => void
	setShowModal: (show: boolean) => void
}

interface ILogoutPassword {
	handleDeletePassword: () => void
	setShowOptionPassword: (show: boolean) => void
	isShowOptionPassword: boolean
	navigation: (value: string) => void
}

interface IUrl {
	url: string
	isShowModalUrl: boolean
	setShowModalUrl: (value: boolean) => void
	handleUpdateChange: (
		e: React.MouseEvent<HTMLButtonElement>,
		url: string
	) => void
	setUrl: (password: string) => void
}

export const Notepad = () => {
	const { password, setPassword } = usePassword()
	const { textareaWidth } = useSetting()
	const { background, handleToggleBackground } = useBackground()
	const {
		notepad,
		setNotepad,
		setShowModal,
		spelling,
		setSpelling,
		isShowOptionPassword,
		setShowOptionPassword,
		isShowModal,
		isShowModalUrl,
		setShowModalUrl,
		handleUpdateChange,
		setContent,
	} = useNotepad()
	const navigation = useNavigate()
	const [url, setUrl] = useState(window.location.href)

	const handleCreateNewNotepad = () => {
		const newNotepad: INotepad = {
			id: Date.now().toString(),
			content: '',
			url: `${Date.now()}`,
		}
		const updatedNotepad = [...notepad, newNotepad]
		setNotepad(updatedNotepad)
		localStorage.setItem('notepad', JSON.stringify(updatedNotepad))
		setContent('')
		navigation(`/${newNotepad.url}`)
	}

	const handleDeletePassword = () => {
		setNotepad(
			notepad.map(not => {
				return {
					...not,
					password: '',
				}
			})
		)
		localStorage.setItem('notepad', JSON.stringify(notepad))
		setShowOptionPassword(false)
	}

	const handleCreatePassword: React.MouseEventHandler<
		HTMLButtonElement
	> = e => {
		e.preventDefault()
		if (password === '') {
			alert('Пароль не может быть пустым')
			return
		} else {
			setNotepad(
				notepad.map(not => {
					return {
						...not,
						password: password,
					}
				})
			)
			localStorage.setItem('notepad', JSON.stringify(notepad))
			setShowModal(false)
			setShowOptionPassword(true)
		}
	}

	const handleDeleteNotepad = (id: string) => {
		if (notepad.length === 1) {
			return
		} else {
			const updatedNotepad = notepad.filter(item => item.id !== id)
			setNotepad(updatedNotepad)
			localStorage.setItem('notepad', JSON.stringify(updatedNotepad))
		}
	}

	const handleSpellings = () => {
		setSpelling(!spelling)
	}

	return (
		<div className='container'>
			<div
				className={styles.block}
				style={{
					width: textareaWidth,
					background: background ? '#121212' : 'transparent',
					border: background ? 'none ' : ' 1px solid #d9d9d9',
				}}
			>
				<Header
					notepad={notepad}
					hanbleCreateNewNotepad={handleCreateNewNotepad}
					handleDeleteNotepad={handleDeleteNotepad}
					setShowModal={setShowModal}
					setShowModalUrl={setShowModalUrl}
					background={background}
					handleToggleBackground={handleToggleBackground}
					handleSpellings={handleSpellings}
				/>
				<Outlet />
				<ModalPassword
					isShowModal={isShowModal}
					handleCreatePassword={handleCreatePassword}
					password={password}
					setPassword={setPassword}
					setShowModal={setShowModal}
				/>
				<ModalLink
					setShowModalUrl={setShowModalUrl}
					isShowModalUrl={isShowModalUrl}
					handleUpdateChange={handleUpdateChange}
					url={url}
					setUrl={setUrl}
				/>
				<ModalLogoutPassword
					handleDeletePassword={handleDeletePassword}
					setShowOptionPassword={setShowOptionPassword}
					isShowOptionPassword={isShowOptionPassword}
					navigation={navigation}
				/>
				<Footer />
			</div>
		</div>
	)
}

const ModalPassword = ({
	isShowModal,
	handleCreatePassword,
	password,
	setPassword,
	setShowModal,
}: IPassword) => (
	<Modal style={{ display: isShowModal ? 'flex' : 'none' }}>
		<b className={styles.modalTitle}>Add Password</b>
		<form className={styles.modalFrom}>
			<input
				type='password'
				value={password}
				placeholder='Password'
				onChange={e => setPassword(e.target.value)}
			/>
			<button onClick={handleCreatePassword}>Save</button>
			<button
				onClick={e => {
					e.preventDefault()
					setShowModal(false)
				}}
			>
				X
			</button>
		</form>
	</Modal>
)

const ModalLink = ({
	setShowModalUrl,
	isShowModalUrl,
	handleUpdateChange,
	url,
	setUrl,
}: IUrl) => (
	<Modal style={{ display: isShowModalUrl ? 'flex' : 'none' }}>
		<b className={styles.modalTitle}>Change URL</b>
		<form className={styles.modalFrom}>
			<input type='text' value={url} onChange={e => setUrl(e.target.value)} />
			<button onClick={e => handleUpdateChange(e, url)}>Save</button>
			<button
				onClick={e => {
					e.preventDefault()
					setShowModalUrl(false)
				}}
			>
				X
			</button>
		</form>
	</Modal>
)

const ModalLogoutPassword = ({
	handleDeletePassword,
	setShowOptionPassword,
	isShowOptionPassword,
	navigation,
}: ILogoutPassword) => (
	<Modal style={{ display: isShowOptionPassword ? 'flex' : 'none' }}>
		<b className={styles.modalTitle}>Password Options</b>
		<form className={styles.modalFrom}>
			<button onClick={handleDeletePassword}>Remove</button>
			<button
				onClick={e => {
					e.preventDefault()
					navigation('/password')
				}}
			>
				Logout
			</button>
			<button
				onClick={e => {
					e.preventDefault()
					setShowOptionPassword(false)
				}}
			>
				X
			</button>
		</form>
	</Modal>
)
