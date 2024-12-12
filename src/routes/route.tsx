import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import { Login } from '../pages/Auth/Login/Login'
import { Notepad } from '../pages/Notepad/Notepad'
import NotepadDetail from '../pages/NotepadDetail/NotepadDetail'
import { Password } from '../pages/Password/Password'
import { Register } from '../pages/Auth/Register/Register'

export const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [
			{
				path: '/',
				element: <Notepad />,
				children: [{ path: '/:id', element: <NotepadDetail /> }],
			},
			{ path: '/login', element: <Login /> },
			{ path: '/register', element: <Register /> },
			{ path: '/password', element: <Password /> },
		],
	},
])
