import {
  DropdownQuestion,
  FormConfig,
  ReferenceQuestion,
  TextboxQuestion,
} from "components/forms/dynamicform";
import propTypes from "prop-types";
import { DynamicForm } from "components/forms/dynamicform/DynamicForm";
import React, { useEffect, useState } from "react";
const _ = require("lodash");

const AccountForm = (props) => {
  let formConfig = new FormConfig();
  const [afterComponentDidMount, setComponentDidMount] = useState(false); //check if the componentDidMount is run
  const [accountRecord, setAccountRecord] = useState({});
  const [questions, setQuestions] = useState([]);

  /**
   * ComponentDidMount
   */
  useEffect(() => {
    setComponentDidMount(true);
  }, []);

  /**
   * ComponentDidUpdate: props.account
   * Reset Selected Account
   */
  useEffect(() => {
    if (props.account) {
      //set incomming selected account to state
      setTimeout(() => {
        //Need timeout to wait for other thread are completed
        //clone companyMap single value (in case to use when user's type is company)
        let account = props.account;
        // account.insurerCodeSingle = account.insurerCode
        //   ? account.insurerCode[0]
        //   : null;
        setAccountRecord(account);
      }, 100);
    }
  }, [props.account]);

  /**
   * ComponentDidUpdate: accountRecord
   * To regenerate questions
   */
  useEffect(() => {
    setQuestions(getQuestion(accountRecord));
  }, [accountRecord]);

  /**
   * Handle submit Account
   * @param form Dynamic form state
   */
  const handleSubmit = async (form) => {
    //convert from dynamic form to Account object
    let accountObject = convertFormToObject(form);
    if (props.onSubmit) {
      props.onSubmit(accountObject);
    }
  };

  /**
   * Handle Form's value changed
   * @param {*} form Dynamic form state
   */
  const handleOnUpdate = async (form) => {
    //convert from dynamic form to account object
    let accountObject = convertFormToObject(form);
    if (afterComponentDidMount && !_.isEqual(accountRecord, accountObject)) {
      setAccountRecord(accountObject);
    }
  };

  /**
   * Convert object from dynamic form to Account
   * @param form Dynamic form state
   */
  const convertFormToObject = (form) => {
    let accountObject = {};
    accountObject.userId = accountRecord.userId;
    accountObject.username = form.username;
    accountObject.email = form.email;
    accountObject.roleId = form.roleId;
    accountObject.type = form.type;
    accountObject.whiteLabelId = form.whiteLabelId;
    // accountObject.insurerCode = form.insurerCode;
    // accountObject.insurerCodeSingle = form.insurerCodeSingle;
    return accountObject;
  };

  /**
   * Generate Account questions
   * @param record Account object
   */
  const getQuestion = (record) => {
    let questions = [];
    let validators = {};
    let options = [];

    //Add [Username] text
    validators = {};
    validators[formConfig.formValidators.require] = {
      value: true,
      errorMessage: "[Username] is required.",
    };
    questions.push(
      new TextboxQuestion({
        key: "username",
        label: "Username",
        value: record.username,
        validators: validators,
        type: formConfig.inputTypeDef.text,
        readonly: props.viewMode,
        order: 1000,
      })
    );

    //Add [Email] text
    validators = {};
    validators[formConfig.formValidators.require] = {
      value: true,
      errorMessage: "[Email] is required.",
    };
    questions.push(
      new TextboxQuestion({
        key: "email",
        label: "Email",
        value: record.email,
        validators: validators,
        type: formConfig.inputTypeDef.email,
        readonly: props.viewMode,
        order: 2000,
      })
    );

    //Add [Role ID] reference list
    validators = {};
    validators[formConfig.formValidators.require] = {
      value: true,
      errorMessage: "[Role ID] is required.",
    };
    questions.push(
      new ReferenceQuestion({
        key: "roleId",
        label: "Role ID",
        value: record.roleId,
        serverUrl: `${process.env.REACT_APP_API_ENDPOINT}/parse/functions/getRoles`,
        displayField: "name",
        idField: "objectId",
        listFields: ["objectId", "name"],
        searchBar: true,
        readonly: props.viewMode,
        validators: validators,
        order: 3000,
      })
    );

    //Add [Type] dropdown
    options = [];
    formConfig.options.accountType.forEach((val) => {
      options.push(val);
    });
    validators = {};
    validators[formConfig.formValidators.require] = {
      value: true,
      errorMessage: "[Type] is required.",
    };
    questions.push(
      new DropdownQuestion({
        key: "type",
        label: "Type",
        value: record.type,
        options: options,
        readonly: props.viewMode,
        validators: validators,
        order: 4000,
      })
    );

    //Add [White Label] reference list
    validators = {};
    validators[formConfig.formValidators.require] = {
      value: true,
      errorMessage: "[White Label] is required.",
    };
    questions.push(
      new ReferenceQuestion({
        key: "whiteLabelId",
        label: "White Label",
        value: record.whiteLabelId,
        serverUrl: `${process.env.REACT_APP_API_ENDPOINT}/parse/functions/getWhiteLabelSetting`,
        displayField: "name",
        idField: "objectId",
        listFields: ["objectId", "name", "mainColor"],
        searchBar: true,
        readonly: props.viewMode,
        validators: validators,
        order: 5000,
      })
    );

    // // Add [Insurer Code] reference list
    // validators = {};
    // validators[formConfig.formValidators.require] = {
    //   value: true,
    //   errorMessage: "[Insurer Code] is required.",
    // };
    // //type = broker => show the below variable
    // questions.push(
    //   new ReferenceQuestion({
    //     key: "insurerCode",
    //     label: "Insurer Code",
    //     value: record.insurerCode,
    //     serverUrl: `${process.env.REACT_APP_API_ENDPOINT}/parse/functions/insurers`,
    //     displayField: "INSURERCODE",
    //     idField: "INSURERCODE",
    //     listFields: ["INSURERCODE", "TIA_NOM"],
    //     validators: validators,
    //     order: 6000,
    //     searchBar: true,
    //     multiple: true,
    //     hidden: record.type != formConfig.options.accountType[0].key,
    //     readonly: props.viewMode,
    //   })
    // );
    // //type = company => show the behind variable
    // questions.push(
    //   new ReferenceQuestion({
    //     key: "insurerCodeSingle",
    //     label: "Insurer Code",
    //     value: record.insurerCodeSingle,
    //     serverUrl: `${process.env.REACT_APP_API_ENDPOINT}/parse/functions/insurers`,
    //     displayField: "INSURERCODE",
    //     idField: "INSURERCODE",
    //     listFields: ["INSURERCODE", "TIA_NOM"],
    //     validators: validators,
    //     order: 6000,
    //     searchBar: true,
    //     multiple: false,
    //     hidden: record.type != formConfig.options.accountType[1].key,
    //     readonly: props.viewMode,
    //   })
    // );
    return questions.sort((a, b) => a.order - b.order);
  };

  return (
    <div className="plr-15">
      <div className="mtb-30 theme-color">
        <div className="introduction"></div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <DynamicForm
            ListFields={questions}
            OnUpdateCallback={handleOnUpdate}
            OnSubmitCallback={handleSubmit}
            viewMode={props.viewMode}
          />
        </div>
      </div>
    </div>
  );
};

AccountForm.prototype = {
  account: propTypes.object.isRequired,
  onSubmit: propTypes.func,
  viewMode: propTypes.bool,
};

export default AccountForm;
