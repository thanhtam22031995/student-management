import studentApi from './api/studentApi.js';
import { API_URL, CITY_MAP } from './constants.js';

function parseUrlString(str) {
  const params = {};

  // Write your code here ...
  const keyValuePairs = str.split('&');
  // console.log(keyValuePairs);
  keyValuePairs.forEach((pairString) => {
    // const values = pairString.split('=');
    // const key = values[0];
    // const value = values[1];

    // array desctructoring
    const [key, value] = pairString.split('=');
    params[key] = value;

    // key = page
    // params.page = value;
  });

  return params;
}

// Global variables
// TODO: URLSearchParams()
const urlParams = parseUrlString(window.location.search.slice(1));
const studentId = urlParams.id;
const isEditMode = !!studentId;
// const studentList = JSON.parse(localStorage.getItem("student_list")) || [];
const studentList = JSON.parse(localStorage.getItem('student_list')) || [];

const student = isEditMode ? studentList.find((x) => x.id === +studentId) : {};

// console.log("Found student", student);

const handleUploadAvatarChange = (e) => {
  console.log(e.target.files);
  const file = e.target.files.length > 0 ? e.target.files[0] : null;

  if (!file) return; // no file selected

  console.log('selected file', file);
  const reader = new FileReader();

  reader.addEventListener('load', (data) => {
    // console.log('Parse image successfully', data.target.result);

    const previewElement = document.querySelector('#avatarPreview');
    if (previewElement) {
      previewElement.src = data.target.result;
      const iconElement = document.querySelector('#icon');
      if (iconElement) {
        iconElement.style.display = 'none';
      }
    }
  });

  reader.readAsDataURL(file);
};

(async function () {
  // find and bind change event to upload avatar

  const avatarElement = document.querySelector('#avatar');
  if (avatarElement) {
    avatarElement.addEventListener('change', handleUploadAvatarChange);
  }

  if (isEditMode) {
    const student = await studentApi.get(studentId);
    console.log(student);
    setFormValue(student);
  }
})();

const getFormValues = (form) => {
  if (!form) return {};

  const formValues = {};

  // Get value of name
  const nameInput = form.querySelector('#name');
  if (nameInput) {
    formValues.name = nameInput.value;
  }

  // Get value of age
  const ageInput = form.querySelector('#age');
  if (ageInput) {
    formValues.age = ageInput.value;
  }

  // Get selected radio
  const selectedGenderRadio = form.querySelector('[name="gender"]:checked');
  if (selectedGenderRadio) {
    formValues.gender = selectedGenderRadio.value;
  }

  // Get value of city
  const citySelect = form.querySelector('#city');
  if (citySelect) {
    formValues.city = citySelect.value;
  }

  return formValues;
};

const validateForm = (values) => {
  if (!values) return false;

  let isValid = true;

  // Validate name: at least 2 words
  const isValidName = values.name.split(' ').filter((x) => !!x).length >= 2;
  if (!isValidName) {
    // TODO: Update DOM to show error message

    isValid = false;
    console.log('Name is invalid');
  }

  // Validate age: >= 18
  const isValidAge = values.age >= 18;
  if (!isValidAge) {
    // TODO: Update DOM to show error message

    isValid = false;
    console.log('Age is invalid');
  }

  return isValid;
};

const getNewId = (increment) => {
  let currentId = +localStorage.getItem('max_id');

  return () => {
    // Calculate the next id
    currentId += increment;

    // save to storage
    localStorage.setItem('max_id', currentId.toString());

    return currentId;
  };
};

const uniqueId = getNewId(1);

const handleFormSubmit = async (e) => {
  e.preventDefault();

  const studentForm = e.target;
  const formValues = getFormValues(studentForm);

  // Validation
  const isValid = validateForm(formValues);
  if (!isValid) return;

  // ADD/EDIT
  // console.log('Form submit successfully', formValues);
  if (isEditMode) {
    // update
    // const foundIdx = studentList.findIndex((x) => x.id === +studentId);
    // if (foundIdx >= 0) {
    //   studentList[foundIdx] = {
    //     ...studentList[foundIdx],
    //     ...formValues,
    //   };
    // }
    console.log('update', formValues);
    formValues.id = studentId;
    await studentApi.update(formValues);

    // window.location = `/student-detail.html?id=${studentList[foundIdx].id}`;
  } else {
    // add
    // Add student to list
    // formValues.id = uniqueId();
    // studentList.push(formValues);
    // console.log("Student list: ", studentList);

    // Redirect to detail page

    await studentApi.add(formValues);
  }

  // Save to local storage
  // localStorage.setItem("student_list", JSON.stringify(studentList));

  // Reset form
  studentForm.reset();

  // Back home
  console.log('END OF FUNCTION');
  // window.location = "/";
};

// Find form element and attach submit event
const formElement = document.querySelector('#studentForm');
if (formElement) {
  formElement.addEventListener('submit', handleFormSubmit);
}

const setFormValue = (student) => {
  // Populate data to student form

  // Set name
  const nameInput = formElement.querySelector('#name');
  if (nameInput) {
    nameInput.value = student.name;
  }

  // Get value of age
  const ageInput = formElement.querySelector('#age');
  if (ageInput) {
    ageInput.value = student.age;
  }

  // Get selected radio
  const selectedGenderRadio = formElement.querySelector(
    `[name="gender"][value="${student.gender}"]`
  );
  if (selectedGenderRadio) {
    selectedGenderRadio.checked = true;
  }

  // Get value of city
  const citySelect = formElement.querySelector('#city');
  if (citySelect) {
    citySelect.value = student.city;
  }
};
