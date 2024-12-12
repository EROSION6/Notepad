import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { BackgroundProvider } from './context/BackgroundContext.tsx'
import { NotepadProvider } from './context/NotePadContext.tsx'
import { PasswordProvider } from './context/PasswordContext.tsx'
import { SettingProvider } from './context/SettingContext.tsx'
import './index.css'
import { router } from './routes/route.tsx'

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<SettingProvider>
			<BackgroundProvider>
				<PasswordProvider>
					<NotepadProvider>
						<RouterProvider router={router} />
					</NotepadProvider>
				</PasswordProvider>
			</BackgroundProvider>
		</SettingProvider>
	</StrictMode>
)
