import React, { Component } from 'react';
import { Text, View, StyleSheet, SafeAreaView } from 'react-native';
import hoistNonReactStatics from 'hoist-non-react-statics';
import { Agenda } from 'react-native-calendars';
import { format, eachDayOfInterval } from 'date-fns/esm';
import HeaderButtons, {
  HeaderButton,
  Item,
} from 'react-navigation-header-buttons';
import Store from '../Store';

const rand = max => Math.floor(Math.random() * max);

class AgendaS extends Component {
  constructor(props) {
    super(props);
    props.navigation.setParams({
      onPressAddButton: this.onPressAddButton,
    });
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: 'Agenda',
      headerRight: (
        <HeaderButtons>
          <Item title="Add" onPress={navigation.getParam('onPressAddButton')} />
        </HeaderButtons>
      ),
    };
  };

  onPressAddButton = () => {
    this.props.navigation.navigate('Add');
  };

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Agenda
          items={this.props.store.get('days')}
          selected={'2018-09-11'}
          renderItem={this.renderItem.bind(this)}
          renderEmptyDate={this.renderEmptyDate.bind(this)}
          rowHasChanged={this.rowHasChanged.bind(this)}
          // markingType={'period'}
          // markedDates={{
          //    '2017-05-08': {textColor: '#666'},
          //    '2017-05-09': {textColor: '#666'},
          //    '2017-05-14': {startingDay: true, endingDay: true, color: 'blue'},
          //    '2017-05-21': {startingDay: true, color: 'blue'},
          //    '2017-05-22': {endingDay: true, color: 'gray'},
          //    '2017-05-24': {startingDay: true, color: 'gray'},
          //    '2017-05-25': {color: 'gray'},
          //    '2017-05-26': {endingDay: true, color: 'gray'}}}
          // monthFormat={'yyyy'}
          // theme={{ calendarBackground: 'red', agendaKnobColor: 'green' }}
          //renderDay={(day, item) => (<Text>{day ? day.day: 'item'}</Text>)}
        />
        );
      </SafeAreaView>
    );
  }

  renderItem(item) {
    return (
      <View style={[styles.item, { height: item.height }]}>
        <Text style={{ fontWeight: 'bold' }}>{item.hours}</Text>
        <Text>{item.text}</Text>
      </View>
    );
  }

  renderEmptyDate() {
    return <View style={styles.emptyDate} />;
  }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }
}

export default hoistNonReactStatics(Store.withStore(AgendaS), AgendaS);

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 6,
    padding: 15,
    marginRight: 10,
    marginTop: 17,
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30,
  },
});
