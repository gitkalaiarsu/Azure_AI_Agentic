import { useState } from 'react'
import { validate } from './constant';

const useCommonValidation = (initialState) => {
  const [formValues, setFormValues] = useState(initialState);
  const [errorMessgae, setErrorMessgae] = useState({});

  // Handle change functionality of form
  const handleChange = (event) => {
    const { name, value } = event.target;

    

    setFormValues({
      ...formValues,
      [name]: value,
    });

    // Onchange checking the validation
    const error = validate(name, value, formValues);
    setErrorMessgae({
      ...errorMessgae,
      [name]: error,
    });
  };

  // Handle blur functionality
  const handleBlur = (event) => {
    const { name, value } = event.target;
    const error = validate(name, value, formValues);
    setErrorMessgae({
      ...errorMessgae,
      [name]: error,
    });
  };

  // Handle onSubmit functionality
  const handleSubmit = (callback) => (event) => {
    event.preventDefault();
    const newErrors = {};
    for (let name in formValues) {
      const error = validate(name, formValues[name], formValues) // Pass formValues here
      if (error) {
        newErrors[name] = error
      };
    };

    if (Object.keys(newErrors).length === 0) {
      callback()
    } else {
      setErrorMessgae(newErrors)
    };
  };

  const resetForm = () => {
    setFormValues(initialState);
    setErrorMessgae({});
  };


  return {
    formValues,
    errorMessgae,
    handleChange,
    handleSubmit,
    handleBlur,
    resetForm,
  };
};

export default useCommonValidation;
