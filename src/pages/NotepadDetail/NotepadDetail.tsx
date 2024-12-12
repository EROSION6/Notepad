import { useEffect, useState } from 'react'
import { Setting } from '../../components/Setting/Setting'
import { useBackground } from '../../context/BackgroundContext'
import { useNotepad } from '../../context/NotePadContext'
import { useSetting } from '../../context/SettingContext'
import styles from '../Notepad/notepad.module.scss'

const NotepadDetail = () => {
	const { textareaWidth, setTextareaScale, setTextareaWidth, textareaScale } =
		useSetting()
	const { background } = useBackground()
	const { notepad, setNotepad, spelling, content, setContent } = useNotepad()
	const [currentNoteId, setCurrentNoteId] = useState('')

	useEffect(() => {
		if (notepad.length > 0) {
			setCurrentNoteId(notepad[0].id)
			setContent(notepad[0].content)
		}
	}, [notepad])

	const handleMinimize = () => {
		if (textareaWidth === '1500px') {
			setTextareaWidth('1000px')
		} else {
			setTextareaWidth('1500px')
		}
	}

	const handleZoomPlus = () => {
		const currentScale = parseInt(textareaScale)
		setTextareaScale(`${currentScale + 1}`)
	}

	const handleZoomMinus = () => {
		const currentScale = parseInt(textareaScale)
		if (currentScale > 15) {
			setTextareaScale(`${currentScale - 1}`)
		}
	}

	const handleContentChange = (content: string) => {
		const updatedNotepad = notepad.map(item => {
			if (item.id === currentNoteId) {
				return {
					...item,
					content,
				}
			}
			return item
		})
		setNotepad(updatedNotepad)
		localStorage.setItem('notepad', JSON.stringify(updatedNotepad))
	}

	return (
		<div className={styles.notepadContainer}>
			<div className={styles.textarea}>
				<textarea
					value={content}
					onChange={e => {
						setContent(e.target.value)
						handleContentChange(e.target.value)
					}}
					placeholder='Введите текст заметки...'
					style={{
						background: background ? '#121212' : 'transparent',
						color: background ? 'white' : 'black',
						fontSize: `${textareaScale}px`,
					}}
					spellCheck={spelling}
				/>
			</div>
			<Setting
				background={background}
				handleZoomPlus={handleZoomPlus}
				handleMinimize={handleMinimize}
				handleZoomMinus={handleZoomMinus}
			/>
		</div>
	)
}

export default NotepadDetail
