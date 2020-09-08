import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { hot } from 'react-hot-loader/root';
import { History } from 'history';
import { Store } from '../store';
import Routes from '../Routes';

type Props = {
  store: Store;
  history: History;
};

// const Root = ({ store, history }: Props) => (
//   <Provider store={store}>
//     <ConnectedRouter history={history}>
//       <Routes />
//     </ConnectedRouter>
//   </Provider>
// );

/**
 * https://github.com/mobxjs/mobx-react/issues/471
 * mobx context 传递封装
 */
export function createObserableContext<T>(
  defaultValue: any,
  calculateChangedBits?: (prev: T, next: T) => number
) {
  const Context = React.createContext(defaultValue, calculateChangedBits);
  const ObservableConsumer = ({ children }: { children: Function }) => {
    return (
      <Context.Consumer>
        {(value: T) => <Observer>{() => children(value)}</Observer>}
      </Context.Consumer>
    );
  };
  return { Provider: Context.Provider, Consumer: ObservableConsumer };
}
import { HashRouter as Router } from 'react-router-dom';
import { observer, useLocalStore, Observer } from 'mobx-react';
import TodoTimeStore from '../store/todo-time';

export const storesContext = createObserableContext(null);

const Root = () => {
  // const store = useLocalStore(() => ({
  //   todoTimeStore: new TodoTimeStore(),
  // }));

  return (
    // <storesContext.Provider value={store}>
    <Router>
      <Routes />
    </Router>
    // </storesContext.Provider>
  );
};

export default hot(Root);
