/* @refresh reload */
import { render } from 'solid-js/web';

import 'virtual:windi.css';
import './index.css';
import App from './App';
import { Router } from '@solidjs/router';

render(
	() => (
		<Router>
			<App />
		</Router>
	),
	document.getElementById('root'),
);
