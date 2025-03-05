import { Provider } from 'react-redux';
import { Global, css } from '@emotion/react';
import { store } from './store/store';
import { MainPage } from '../pages/main/ui/MainPage';

const globalStyles = css`
	body {
		margin: 0;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto',
			'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
			'Helvetica Neue', sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		background-color: #06080C;
		color: white;
	}

	* {
		box-sizing: border-box;
	}
`;

function App() {
	return (
		<Provider store={store}>
			<Global styles={globalStyles} />
			<MainPage />
		</Provider>
	);
}

export default App;
