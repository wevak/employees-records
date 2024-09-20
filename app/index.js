import { Provider } from 'react-redux';
import { store } from '../redux/store';
import Application from './app';

export default function App() {
  return (
	<Provider store={store}>
		<Application />
	</Provider>
  );
}