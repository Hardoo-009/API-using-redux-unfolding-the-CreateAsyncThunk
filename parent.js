import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import Header from './Header';
import stores from './Stores';
import Top from './Top';

const App = () => {
  return (
    <>
      <Top></Top>
      <Header />
    </>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={stores}>
    <App />
  </Provider>,
);

// Global state is stored something like this
// const state ={
// slice1: {
// count:0

// },
// slice2: {
// count:2,
// name: "Rohit"
// },
// slice3: {
// login:true,
// }
// }
