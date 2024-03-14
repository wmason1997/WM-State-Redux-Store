import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';

import { Provider } from 'react-redux';
import store from './utils/store'; // Import your Redux store and got rid of setContext

import Nav from './components/Nav';
import { Outlet } from 'react-router-dom';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <Nav />
        <Outlet />
      </Provider>
    </ApolloProvider>
  );
}

export default App;

