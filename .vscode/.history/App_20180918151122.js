import React from 'react';
import {
  createBottomTabNavigator,
  createStackNavigator,
} from 'react-navigation';
import AgendaScreen from './containers/AgendaScreen';
import AddScreen from './containers/AddScreen';
import Store from './store';

const AgendaStack = createStackNavigator({
  Agenda: {
    screen: AgendaScreen,
    path: 'agenda',
  },
  Add: {
    screen: AddScreen,
    path: 'add',
  },
});

class SimpleTabsContainer extends React.Component {
  render() {
    return (
      <Store.Container>
        <AgendaStack navigation={this.props.navigation} />
      </Store.Container>
    );
  }
}

export default SimpleTabsContainer;
