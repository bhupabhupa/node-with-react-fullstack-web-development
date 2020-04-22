//SurveyForm shows form for a user to add input
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom'
import SurveyField from './SurveyField';
import validateEmails from '../../utils/validateEmails';
import formFields from './formFields';

class SurveyForm extends Component {
    renderFields() {
        return formFields.map(({label, name}) => {
            return (
                <Field component={SurveyField} type="text" label={label} name={name} />
            )
        })
        // return(
        //     <div>
        //         <Field label="Survey Title" type="text" name="title" component={SurveyField} />
        //         <Field label="Subject Line" type="text" name="subject" component={SurveyField} />
        //         <Field label="Email Body" type="text" name="body" component={SurveyField} />
        //         <Field label="Recipients List" type="text" name="emails" component={SurveyField} />
        //     </div>
        // )
    }

    render() {
        return(
            <div>
                <form 
                    onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}
                >
                {/* <Field type="text" name="surveyTitle" component="input" /> */}
                { this.renderFields() }
                <Link to="/surveys" className="red btn-flat white-text">
                    Cancel
                </Link>
                <button 
                    type="submit" 
                    className="teal btn-flat right white-text">
                    Next
                    <i className="material-icons right">done</i>
                </button>
                </form>
                
            </div>
        )
    }
}

function validate(values) {
    const errors = {};

    errors.recipients = validateEmails(values.recipients || '');

    formFields.map(({ name}) => {
        if(!values[name]) {
            errors[name] = 'You must provide a '+name;
        }
    });

    return errors;
}

export default reduxForm({
    validate,
    form: 'surveyForm',
    destroyOnUnmount: false
})(SurveyForm);