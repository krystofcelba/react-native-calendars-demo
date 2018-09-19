import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import GenerateForm from 'react-native-form-builder';

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

const styles = {
  wrapper: {
    flex: 1,
    height: '100%',
  },
  submitButton: {
    paddingHorizontal: 10,
    paddingTop: 20,
  },
};
// These Fields will create a login form with three fields
const fields = [
  {
    type: 'text',
    name: 'user_name',
    required: true,
    icon: 'ios-person',
    label: 'Username',
  },
  {
    type: 'password',
    name: 'password',
    icon: 'ios-lock',
    required: true,
    label: 'Password',
  },
  {
    type: 'picker',
    name: 'country',
    mode: 'dialog',
    label: 'Select Country',
    defaultValue: 'INDIA',
    options: ['US', 'INDIA', 'UK', 'CHINA', 'FRANCE'],
  },
];

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
          <Separator />
          <InputField ref="title" label="Title" placeholder="Title" />

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
        <Text>{JSON.stringify(this.state.formData)}</Text>
      </ScrollView>
    );
  }
}
