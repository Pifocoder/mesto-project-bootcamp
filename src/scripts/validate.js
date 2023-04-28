export {enableValidation}

const hideInputErrors = function (formElement, formInput, inputErrorClass,  errorClass) {
    const errorElement = formElement.querySelector(`.${formInput.name}-${inputErrorClass}`);
    errorElement.textContent = "";
    formInput.classList.remove(errorClass);
}
const showInputErrors = function (formElement, formInput, inputErrorClass,  errorClass) {
    const errorElement = formElement.querySelector(`.${formInput.name}-${inputErrorClass}`);
    errorElement.textContent = formInput.validationMessage;
    formInput.classList.add(errorClass);
}
const checkInputValidity = function (formElement, formInput, inputErrorClass,  errorClass) {
    if (formInput.validity.valid) {
        hideInputErrors(formElement, formInput, inputErrorClass,  errorClass)
    } else {
        showInputErrors(formElement, formInput, inputErrorClass,  errorClass);
    }
}
function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    }); 
  }
const checkButtonSubmit = function(formInputs, submitButton, inactiveButtonClass) {
    if (hasInvalidInput(formInputs)) {
        submitButton.classList.add(inactiveButtonClass);
        submitButton.setAttribute('disabled', 'disabled');
    } else {
        submitButton.classList.remove(inactiveButtonClass);
        submitButton.removeAttribute('disabled', 'disabled');
    }
}
function enableValidation(data) {
    const formElements = document.querySelectorAll(data.formSelector);
    formElements.forEach((formElement) => {
        formElement.addEventListener('submit', function(evt) {
            evt.preventDefault()
            checkButtonSubmit(formInputs, submitButton, data.inactiveButtonClass);
        })
        const formInputs = Array.from(formElement.querySelectorAll(data.inputSelector));
        const submitButton = formElement.querySelector(data.submitButtonSelector);

        checkButtonSubmit(formInputs, submitButton, data.inactiveButtonClass);
    
        formInputs.forEach((formInput) => {
            formInput.addEventListener('input', function(evt) {
                checkInputValidity(formElement, formInput, data.inputErrorClass,  data.errorClass, submitButton, data.inactiveButtonClass);
                checkButtonSubmit(formInputs, submitButton, data.inactiveButtonClass);
            })
        });
    });
}