import logo from './logo.svg';
import './App.css';
import Accueil from './Components/Accueil';
import { Provider } from 'react-redux';
import store from './Components/Redux/Store';
import { Fragment } from 'react';

function App() {
  return (
    <Fragment>
      <Provider store={store}>
        <Accueil />
      </Provider>
    </Fragment>
  );
}

export default App;
