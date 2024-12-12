import React, { CSSProperties } from 'react'
import styles from './modal.module.scss'

interface IModal {
	children: React.ReactNode
	style: CSSProperties
}

export const Modal = ({ children, style }: IModal) => {
	return (
		<div className={styles.overflow} style={style}>
			<div className={styles.content}>{children}</div>
		</div>
	)
}
