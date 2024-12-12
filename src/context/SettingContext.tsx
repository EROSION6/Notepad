import React, { createContext, useContext, useState } from 'react'

interface SettingContextType {
	textareaScale: string
	setTextareaScale: (value: string) => void
	textareaWidth: string
	setTextareaWidth: (value: string) => void
}

const SettingContext = createContext<SettingContextType | undefined>(undefined)

export const SettingProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [textareaWidth, setTextareaWidth] = useState('1500px')
	const [textareaScale, setTextareaScale] = useState('15')
	return (
		<SettingContext.Provider
			value={{
				textareaScale,
				setTextareaScale,
				textareaWidth,
				setTextareaWidth,
			}}
		>
			{children}
		</SettingContext.Provider>
	)
}

export const useSetting = () => {
	const context = useContext(SettingContext)
	if (!context) {
		throw new Error('useSetting must be used within a SettingProvider')
	}
	return context
}
