import { CgArrowsExpandRight } from 'react-icons/cg'
import { FiMinus, FiPlus } from 'react-icons/fi'
import styles from './settings.module.scss'

interface ISetting {
	background: boolean
	handleZoomPlus: () => void
	handleMinimize: () => void
	handleZoomMinus: () => void
}

export const Setting = ({
	background,
	handleMinimize,
	handleZoomPlus,
	handleZoomMinus,
}: ISetting) => {
	const btns = [
		{
			icon: <CgArrowsExpandRight size={16} />,
			onClick: handleMinimize,
		},
		{
			icon: <FiPlus size={16} />,
			onClick: handleZoomPlus,
		},
		{
			icon: <FiMinus size={16} />,
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
		<div className={styles.setting}
		style={{background: background ? '#121212' : 'white'}}>
			{btns.map((btn, index) => (
				<button
					key={index}
					onClick={btn.onClick}
					style={{
						background: background ? '#2c2c2c' : 'white',
						border: background ? '1px solid #484848' : '1px solid #ddd',
					}}
				>
					<span>{btn.icon}</span>
				</button>
			))}
		</div>
	)
}
