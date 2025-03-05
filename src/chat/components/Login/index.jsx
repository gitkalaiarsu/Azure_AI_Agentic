import useCommonValidation from "chat/utility/commonValidation";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginAction } from "chat/redux/action/chatAction";

const Login = () => {
  const initialState = {
    name:'',
    email:''
  }
  const {
    formValues,
    errorMessgae,
    handleChange,
    handleSubmit,
    handleBlur,
    resetForm,
  } = useCommonValidation(initialState);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const login = () => {
    const hasErrors = Object.values(errorMessgae).some((error) => error);
    if (hasErrors) {
      console.log("Form validation failed", errorMessgae);
    } else {
      setLoading(true);
      const data = {
        name: formValues?.name,
        email: formValues?.email,
      };
      dispatch(loginAction(data)).then((res) => {
        if(res?.status === 200)
        {
          resetForm();
          setLoading(false);

        }
      })
    }
  };

  return (
    <div className="hero-wrapper">
      <div className="center_content">
        <div className="term_agree_content">
          <div className="terms_conditon_inner terms_conditon">
            <div className="emoji-article">
              <div className="term_agree_title" style={{ marginBottom: "6px" }}>
                Before we begin...
              </div>
            </div>
            <form
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                marginTop: "20px",
              }}
              onSubmit={handleSubmit(login)}
            >
              <label className="form_label_name" style={{ marginTop: "8px" }}>
                Name <span style={{ color: "#9d2872" }}>*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formValues.name}
                onChange={handleChange}
                onBlur={handleBlur}
                className={
                  errorMessgae.name
                    ? "input_fields_box_error"
                    : "input_fields_box"
                }
                autoComplete="name"
              />
              {errorMessgae.name && (
                <span className="validation-text ">{errorMessgae.name}</span>
              )}

              <label className="form_label_name">
                Email <span style={{ color: "#9d2872" }}>*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formValues.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={
                  errorMessgae.email
                    ? "input_fields_box_error"
                    : "input_fields_box"
                }
                autoComplete="email"
              />
              {errorMessgae.email && (
                <span className="validation-text">{errorMessgae.email}</span>
              )}

              <div className="login_btn_wrap text-left">
                {loading ? (
                  <button type="button" className="login_btn_disabled" disabled>
                    <span className="font-btn">Please wait...</span>
                  </button>
                ) : (
                  <button type="submit" className="login_btn agree_btn">
                    <span className="font-btn">let's start</span>
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="blank-div"></div>
    </div>
  );
};

export default Login;
