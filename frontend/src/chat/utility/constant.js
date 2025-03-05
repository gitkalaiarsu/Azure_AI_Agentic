import ErrorCode from "chat/components/CardFeatures/errorCode";
import InconvenienceCode from "chat/components/CardFeatures/inconvenienceCode";
import SerialNumber from "chat/components/CardFeatures/serialNumber";
import ReactMarkdown from "react-markdown";

export const CHAT_API_URL = process.env.REACT_APP_CHAT_URL


export const disbaleChat = ["Thank you for contacting us. We will share the details with your email address."];
                            
export function generateUniqueId() {
    const timestamp = Date.now(); 
    const randomNumber = Math.floor(Math.random() * 1000); 
    return `${timestamp}-${randomNumber}`;
}
  
  
export const validate = (name, value, formValues) => {
  let error = ''

  switch (name) {
    case 'email':
      if (!value) {
        error = 'Email is required'
      } else if (!/\S+@\S+\.\S+/.test(value)) {
        error = 'Email address is invalid'
      }
      break
      
    case 'password':
      error =
        !value ||
        value.length < 8 ||
        !/[a-z]/.test(value) ||
        !/[A-Z]/.test(value) ||
        !/\d/.test(value) ||
        !/[!@#$%^&*(),.?":{}|<> ]/.test(value)
          ? 'Password must be at least 8 characters long, contain at least one lowercase letter, one uppercase letter, one number, and one special character or space.'
          : ''
      break

    
    case 'password_login':
      let passwordLogin = []

      if (!value) {
        passwordLogin.push('Password is required.')
      }

      error = passwordLogin[0]
      break

    case 'confirm_password':
      if (!value) {
        error = 'Confirm password is required'
      } else if (value !== formValues?.password) {
        error = 'Passwords do not match'
      }
      break

    case 'proposal_name':
      if (!value?.trim()) {
        error = 'This field is required.'
      }
      else if (value.length > 200) {
        error = 'Proposal name cannot exceed 200 characters.';
      }    
      break
    case 'proposal_description':
      if (!value?.trim()) {
        error = 'This field is required.'
      }
      else if (value.length > 500) {
        error = 'Proposal description cannot exceed 500 characters.';
      }   
      break

    case 'phone_number':
      if (!value) {
        error = 'Phone number is required'
      } else if (value.includes('_')) {
        error = 'Phone number is incomplete'
      } else if (!/^\(\d{3}\) \d{3}-\d{4}$/.test(value)) {
        error = 'Phone number is invalid'
      }
      break

    case 'dob':
      const selectedDate = new Date(value)
      const currentDate = new Date()
      if (!selectedDate || !value) {
        error = 'DOB is required'
      }
      if (selectedDate > currentDate) {
        error = 'Date of Birth cannot be in the future.'
      }
      break

    case 'company_url':
      if (!value) {
        error = 'URL is required'
      } else if (
        !/^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/.test(value)
      ) {
        error = 'URL is invalid'
      }
      break

      case 'first_name':
        if (!value.trim()) {
          error = 'First name is required';
        } 
        else if (!/^[A-Za-z\s]+$/.test(value)) {
          error = 'First name can only contain characters';
        }        
        else if (value?.length < 2) {
          error = 'First name must be at least 2 characters';
        } 
      break

      case 'last_name':
        if (!value.trim()) {
          error = 'Last name is required';
        } 
        else if (!/^[A-Za-z\s]+$/.test(value)) {
          error = 'Last name can only contain characters';
        } 
      break

    default:
      if (!value) {
        error = `${name.replace(/_/g, ' ').charAt(0).toUpperCase() + name.replace(/_/g, ' ').slice(1)} is required`
      }
      break
  }
  return error
}


export const  ToastMessagesSuccess = {
  Login:{
    Success:'Login Successful! ',
    Fail:'Login Failed',
  }
}



export function getLocalStorageData(key, defaultValue = null) {
  try {
    const storedData = localStorage.getItem(key)

    if (storedData === null || storedData === undefined) {
      return defaultValue
    }

    return JSON.parse(storedData)
  } catch (error) {
    console.error('Error parsing localStorage data', error)
    return defaultValue
  }
}


export const content = "The customer is experiencing issues with their therapy machine, but they haven't provided any specific details about the problem or an error code. Understanding the exact nature of the issue is crucial for effective troubleshooting. Without an error code, it becomes challenging to pinpoint the problem and provide accurate solutions.To assist the customer effectively, I need them to provide any error code that may be displayed on the therapy machine. This information is essential because error codes are designed to indicate specific issues, allowing for targeted troubleshooting steps. If the customer cannot provide an error code, I will need to generate a support ticket for further assistance.Possible issues with therapy machines"

export const statementDetails = [ 
  "error_code",
  "want_warranty",
  "serial_number",
]

export const cardStatementsDetails = [
  {
    id:1,
    statement:"To help you better, could you tell me if there's any error code showing up?",
    Component: <ErrorCode />
  },
  {
    id:2,
    statement:"Sorry for the inconvenience, as the troubleshooting steps have not resolved the issue. Do you want to claim a warranty?",
    Component: <InconvenienceCode />
  },
  {
    id:3,
    statement:"Sorry for the inconvenience, as the troubleshooting steps have not resolved the issue. Do you want to claim a warranty?",
    Component: <SerialNumber />
  },
]

export const assistsType = {
  FurtherAssisstance: "further_assistance",
  TroubleshootAssistance: "troubleshoot_assistance"
}

export  const renderTextWithLinks = (text, status) => {
    const textWithClickableLinks = text?.replace(
      /(^|\s)(https?:\/\/[^\s]+)/g,
      (match, space, url) => {
        return `${space}[${url}](${url})`;
      }
    );
    return (
      <ReactMarkdown
        className={
          status === "agent" ? "reason-processing" : "reason-processed"
        }
      >
        {textWithClickableLinks}
      </ReactMarkdown>
    );
  };


  export function formatText(input) {
    let formattedText = input.replace(/[\s_]+/g, ' ').trim();
  
    formattedText = formattedText.replace(/\b\w/g, char => char.toUpperCase());
  
    return formattedText;
  }
  
  