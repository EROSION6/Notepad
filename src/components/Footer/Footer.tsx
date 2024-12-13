import { useBackground } from '../../context/BackgroundContext'
import { useNotepad } from '../../context/NotePadContext'
import styles from './footer.module.scss'

export const Footer = () => {
	const { background } = useBackground()
	const { content } = useNotepad()

	const handleShareLink = () => {
		const currentUrl = window.location.href
		if (navigator.share) {
			navigator
				.share({
					title: 'Check out my Notepad',
					text: 'Here is my notepad content!',
					url: currentUrl,
				})
				.then(() => {
					console.log('Share successful')
				})
				.catch(error => {
					console.error('Error sharing:', error)
				})
		} else {
			alert(
				'Sharing is not supported in this browser. You can copy the link manually.'
			)
			navigator.clipboard
				.writeText(currentUrl)
				.then(() => {
					alert('Ссылка скопирована в буфер обмена!')
				})
				.catch(err => {
					console.error('Ошибка при копировании ссылки: ', err)
				})
		}
	}

	
	const handleCopyLink = () => {
		const currentUrl = window.location.href
		navigator.clipboard
			.writeText(currentUrl)
			.then(() => {
				alert('Ссылка скопирована в буфер обмена!')
			})
			.catch(err => {
				console.error('Ошибка при копировании ссылки: ', err)
			})
	}


	return (
		<footer
			className={styles.footer}
			style={{
				background: background ? '#181818' : 'transparent',
			}}
		>
			<div className={styles.top}>
				<button onClick={handleCopyLink}>Editable Link</button>
				<button onClick={handleShareLink}>Share Link</button>
			</div>
			<div className={styles.bottom}>
				<span>Words: {content.trim().split(/\s+/).length}</span>
				<span>Chars: {content.length}</span>
			</div>
		</footer>
	)
}
