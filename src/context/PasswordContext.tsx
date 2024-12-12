import React, { createContext, useContext, useState } from 'react'

interface PasswordContextType {
	password: string
	setPassword: (password: string) => void
}

const PasswordContext = createContext<PasswordContextType | undefined>(
	undefined
)

export const PasswordProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [password, setPassword] = useState<string>('')

	return (
		<PasswordContext.Provider
			value={{
				password,
				setPassword,
			}}
		>
			{children}
		</PasswordContext.Provider>
	)
}

export const usePassword = () => {
	const context = useContext(PasswordContext)
	if (!context) {
		throw new Error('usePassword must be used within a PasswordProvider')
	}
	return context
}
