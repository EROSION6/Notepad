import React, { createContext, useContext, useState } from 'react'

export interface INotepad {
	id: string
	content: string
	url: string
}

interface NotepadContextType {
	notepad: INotepad[]
	content: string
	isShowOptionPassword: boolean
	isShowModal: boolean
	isShowModalUrl: boolean
	spelling: boolean
	setNotepad: (notepad: INotepad[]) => void
	handleUpdateChange: (
		e: React.MouseEvent<HTMLButtonElement>,
		newUrl: string
	) => void
	setContent: (content: string) => void
	setShowOptionPassword: (value: boolean) => void
	setShowModalUrl: (value: boolean) => void
	setShowModal: (value: boolean) => void
	setSpelling: (value: boolean) => void
}

const NotePadContext = createContext<NotepadContextType | undefined>(undefined)

export const NotepadProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const saved = localStorage.getItem('notepad')
	const [content, setContent] = useState('')
	const [notepad, setNotepad] = useState<INotepad[]>(() => {
		if (saved) {
			return JSON.parse(saved)
		}
		return [
			{
				id: '111',
				content: 'Hello',
				url: '3333',
			},
		]
	})

	const [isShowOptionPassword, setShowOptionPassword] = useState(false)
	const [isShowModal, setShowModal] = useState(false)
	const [isShowModalUrl, setShowModalUrl] = useState(false)
	const [spelling, setSpelling] = useState(false)

	const handleUpdateChange = (
		e: React.MouseEvent<HTMLButtonElement>,
		newUrl: string
	) => {
		e.preventDefault()

		setNotepad(
			notepad.map(note => {
				return { ...note, url: newUrl }
			})
		)
		localStorage.setItem('notepad', JSON.stringify(notepad))
		setShowModalUrl(false)
	}

	return (
		<NotePadContext.Provider
			value={{
				notepad,
				setNotepad,
				handleUpdateChange,
				isShowOptionPassword,
				setShowOptionPassword,
				isShowModal,
				setShowModal,
				isShowModalUrl,
				setShowModalUrl,
				spelling,
				setSpelling,

				content,
				setContent,
			}}
		>
			{children}
		</NotePadContext.Provider>
	)
}

export const useNotepad = () => {
	const context = useContext(NotePadContext)
	if (!context) {
		throw new Error('useNotepad must be used within a NotepadProvider')
	}
	return context
}
