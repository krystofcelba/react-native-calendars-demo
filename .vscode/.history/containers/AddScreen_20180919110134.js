import React, { Component } from 'react';
import { ScrollView, Text, TouchableOpacity } from 'react-native';

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

export default class AddScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { formData: {} };
  }
  handleFormChange(formData) {
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
  }
  handleFormFocus(e, component) {
    //console.log(e, component);
  }
  openTermsAndConditionsURL() {}
  render() {
    return (
      <ScrollView
        keyboardShouldPersistTaps={'never'}
        style={{ paddingLeft: 10, paddingRight: 10, height: 200 }}
      >
        <Form
          ref="registrationForm"
          onFocus={this.handleFormFocus.bind(this)}
          onChange={this.handleFormChange.bind(this)}
          label="Personal Information"
        >
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
            options={{
              never: 'Never',
              [RRule.MONTHLY]: 'Monthly',
              [RRule.WEEKLY]: 'Weekly',
              [RRule.DAILY]: 'Daily',
            }}
          />
        </Form>
        <TouchableOpacity style={styles.submitButton}>
          <Text style={styles.submitButtonText}>Add</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

const styles = {
  wrapper: {
    flex: 1,
    height: '100%',
  },
  submitButton: {
    height: 40,
    width: '80%',
    backgroundColor: 'blue',
    marginBottom: 30,
    flex: 1,
    alignSelf: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
};
