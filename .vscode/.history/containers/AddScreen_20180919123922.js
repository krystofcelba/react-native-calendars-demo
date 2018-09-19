import React, { Component } from 'react';
import { ScrollView, Text, TouchableOpacity } from 'react-native';
import hoistNonReactStatics from 'hoist-non-react-statics';
import Store from '../Store';
import { StackActions } from 'react-navigation';

import {
  Form,
  Separator,
  InputField,
  LinkField,
  SwitchField,
  PickerField,
  DatePickerField,
  TimePickerField,
} from 'react-native-form-generator';

import { RRule, RRuleSet, rrulestr } from 'rrule';
import { DateTime, Interval } from 'luxon';

class AddScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { formData: {} };
  }
  handleFormChange = formData => {
    /*
    formData will contain all the values of the form,
    in this example.

    formData = {
    first_name:"",
    last_name:"",
    gender: '',
    birthday: Date,
    has_accepted_conditions: bool
    }
    */

    this.setState({ formData: formData });
    this.props.onFormChange && this.props.onFormChange(formData);
  };

  onPressAdd = () => {
    console.log('ddd');
    const { store } = this.props;
    const { formData } = this.state;

    console.log(formData);

    const startTime = DateTime.fromJSDate(formData.start);
    const endDateTime = DateTime.fromJSDate(formData.end);
    const endTime = startTime.set({
      hour: endDateTime.hour,
      minute: endDateTime.minute,
    });
    const eventObject = {
      text: formData.title,
      hours: `${startTime.toLocaleString(
        DateTime.TIME_SIMPLE,
      )} - ${endTime.toLocaleString(DateTime.TIME_SIMPLE)}`,
    };

    let days = store.get('days');

    if (formData.recurring === undefined || formData.recurring === -1) {
      days = {
        ...days,
        [startTime.toISODate()]: [...days[startTime.toISODate()], eventObject],
      };
    } else {
      const rule = new RRule({
        freq: formData.recurring,
        interval: 1,
        dtstart: startTime.toUTC().toJSDate(),
        until: new Date(2019, 1, 1),
      });

      console.log(rule.all());
      rule.all().map(val => {
        const date = DateTime.fromJSDate(val).toISODate();
        days = { ...days, [date]: [...days[date], eventObject] };
      });
    }

    console.log(days);
    store.set('days')(days);

    this.props.navigation.dispatch(StackActions.popToTop());
  };

  render() {
    const { formData } = this.state;
    return (
      <ScrollView
        keyboardShouldPersistTaps={'never'}
        style={{ paddingLeft: 10, paddingRight: 10, height: 200 }}
      >
        <Form ref="addForm" onChange={this.handleFormChange}>
          <InputField ref="title" label="Title" placeholder="Title" />
          <Separator />
          <DatePickerField
            ref="start"
            minimumDate={new Date(2018, 1, 1)}
            maximumDate={new Date(2030, 1, 1)}
            mode="datetime"
            placeholder="Start date"
          />
          <TimePickerField ref="end" placeholder="End date" />
          <Separator />
          <PickerField
            ref="recurring"
            label="Recurring"
            value={-1}
            options={{
              [-1]: 'Never',
              [RRule.MONTHLY]: 'Monthly',
              [RRule.WEEKLY]: 'Weekly',
              [RRule.DAILY]: 'Daily',
            }}
          />
        </Form>
        {formData.title &&
          formData.start &&
          formData.end && (
            <TouchableOpacity
              style={styles.submitButton}
              onPress={() => this.onPressAdd()}
            >
              <Text style={styles.submitButtonText}>Add</Text>
            </TouchableOpacity>
          )}
      </ScrollView>
    );
  }
}
export default hoistNonReactStatics(Store.withStore(AddScreen), AddScreen);

const styles = {
  wrapper: {
    flex: 1,
    height: '100%',
  },
  submitButton: {
    height: 40,
    width: '100%',
    backgroundColor: 'blue',
    marginBottom: 30,
    marginTop: 10,
    flex: 1,
    alignSelf: 'center',
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
    height: '100%',
    textAlignVertical: 'center',
  },
};
