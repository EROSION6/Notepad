import React, { createContext, useContext, useState } from 'react'

interface BackgroundContextType {
	handleToggleBackground: () => void
	background: boolean
	setBackground: (vg: boolean) => void
}

const BackgroundContext = createContext<BackgroundContextType | undefined>(
	undefined
)

export const BackgroundProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [background, setBackground] = useState(false)

	// eslint-disable-next-line @typescript-eslint/no-unused-expressions
	background
		? (document.body.style.background = '#323232')
		: (document.body.style.background = 'white')

	const handleToggleBackground = () => {
		setBackground(!background)
	}

	return (
		<BackgroundContext.Provider
			value={{ handleToggleBackground, background, setBackground }}
		>
			{children}
		</BackgroundContext.Provider>
	)
}

export const useBackground = () => {
	const context = useContext(BackgroundContext)
	if (!context) {
		throw new Error('useBackground must be used within a BackgroundProvider')
	}
	return context
}
