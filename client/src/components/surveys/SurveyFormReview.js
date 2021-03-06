import React from 'react';
import { connect } from 'react-redux';
import formFields from './formFields';
import { withRouter } from 'react-router-dom';
import * as actions from '../../actions';

const SurveyFormReview = ({onCancel, formValues, submitSurvey, history}) => {
    const reviewFields =  formFields.map( ({name, label}) => {
        return (
            <div key={name}>
                <label>{label}</label>
                <div>{formValues[name]}</div>
            </div>
        )
    });

    return (
        <div>
            <h5>Please confirm your entries</h5>
            <div>
                {reviewFields}
                {/* <div>
                    <label>Survey Title</label>
                    <div>{formValues.title}</div>
                </div> */}
                
            </div>
            <button className="yellow darken-3 btn-flat" onClick={onCancel}>
                Back
            </button>
            <button className="green btn-flat right" onClick={() => submitSurvey(formValues, history)}>
                Send Survey
                <i className="material-icons right">email</i>
            </button>
        </div>
    )
}

function mapStateToProps(state) {
    return { formValues: state.form.surveyForm.values }
}

export default connect(mapStateToProps, actions)(withRouter(SurveyFormReview));