import styles from './settings.module.scss'

interface ISetting {
	background: boolean
	handleZoomPlus: (textarea: HTMLTextAreaElement) => void
	handleMinimize: (textarea: HTMLTextAreaElement) => void
	handleZoomMinus: (textarea: HTMLTextAreaElement) => void
}

export const Setting = ({
	background,
	handleMinimize,
	handleZoomPlus,
	handleZoomMinus,
}: ISetting) => {
	const btns = [
		{
			icon: '/public/double-arrow_1761657 1.svg',
			onClick: handleMinimize,
		},
		{
			icon: '/public/Vector (3).svg',
			onClick: handleZoomPlus,
		},
		{
			icon: '/public/Vector (4).svg',
			onClick: handleZoomMinus,
		},
		{
			icon: 'Raw',
			onClick: () => console.log('Raw'),
		},
		{
			icon: 'MarkDown',
			onClick: () => console.log('MarkDown'),
		},
		{
			icon: 'Code',
			onClick: () => console.log('Code'),
		},
	]

	return (
		<div className={styles.setting}>
			{btns.map((btn, index) => (
				<button
					key={index}
					onClick={btn.onClick}
					style={{
						background: background ? '#2c2c2c' : 'white',
						border: background ? '1px solid #484848' : '1px solid #ddd',
					}}
				>
					{btn.icon.endsWith('.svg') ||
					btn.icon.endsWith('.png') ||
					btn.icon.endsWith('.jpg') ? (
						<img src={btn.icon} alt='' />
					) : (
						<span>{btn.icon}</span>
					)}
				</button>
			))}
		</div>
	)
}
