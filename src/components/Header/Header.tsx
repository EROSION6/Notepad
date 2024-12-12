import { FaLightbulb, FaLock, FaPen, FaTimes, FaUser } from 'react-icons/fa'
import { FiPlus } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import { INotepad } from '../../context/NotePadContext'
import styles from './header.module.scss'

interface IHeader {
	notepad: INotepad[]
	hanbleCreateNewNotepad: () => void
	handleDeleteNotepad: (id: string) => void
	setShowModal: (value: boolean) => void
	setShowModalUrl: (value: boolean) => void
	handleSpellings: (value: boolean) => void // Ожидает аргумент boolean
	background: boolean
	handleToggleBackground: () => void
}

export const Header = ({
	notepad,
	hanbleCreateNewNotepad,
	setShowModal,
	handleDeleteNotepad,
	setShowModalUrl,
	background,
	handleToggleBackground,
	handleSpellings,
}: IHeader) => {
	const navigation = useNavigate()
	const options = [
		{
			icon: <FiPlus size={16} />,
			onClick: hanbleCreateNewNotepad,
		},
		{
			icon: <FaLock size={16} />,
			onClick: () => setShowModal(true),
		},
		{
			icon: <FaPen size={16} />,
			onClick: () => setShowModalUrl(true),
		},
		{
			icon: <FaUser size={16} />,
			onClick: () => navigation('/login'),
		},
		{
			label: 'SP',
			onClick: () => handleSpellings(true),
		},
		{
			label: 'MO',
			onClick: () => console.log('MO'),
		},
		{
			icon: <FaLightbulb size={16} />,
			onClick: handleToggleBackground,
		},
	]

	const currentNote = notepad.find(
		note => note.url === window.location.pathname.split('/').pop()
	)
	return (
		<header
			className={styles.header}
			style={{
				background: background ? '#181818' : 'transparent',
				border: background ? 'none' : '1px solid #D9D9D9',
			}}
		>
			<div className={styles.left}>
				<h2>Notepad.cc</h2>
			</div>
			<div className={styles.right}>
				{options.map((opt, index) => (
					<button key={index} onClick={opt.onClick}>
						{opt.label && <span className={styles.label}>{opt.label}</span>}
						{opt.icon && <span>{opt.icon}</span>}
					</button>
				))}
				{currentNote && (
					<button onClick={() => handleDeleteNotepad(currentNote.id)}>
						<FaTimes size={16} />
					</button>
				)}
			</div>
		</header>
	)
}
