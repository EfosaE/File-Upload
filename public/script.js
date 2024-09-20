const fileNamesDiv = document.getElementById('file-names');
const errorMessageDiv = document.getElementById('error-message');
const uploadForm = document.getElementById('file-upload-form');
const fileInputDiv = document.getElementById('files');
// Function to update the file names display
function updateFileNames(files) {
  // Clear the existing content
  fileNamesDiv.innerHTML = '';

  if (files.length === 0) {
    fileNamesDiv.textContent = 'No files chosen';
    return;
  }

  // Create a <p> element for each file name, add a class, and append to the <div>
  Array.from(files).forEach((file) => {
    const p = document.createElement('p');
    p.textContent = file.name;
    p.classList.add('file-name'); // Add a class to the <p> element
    fileNamesDiv.appendChild(p);
  });
}
fileInputDiv.addEventListener('change', function (event) {
  const fileInput = event.target;
  const files = fileInput.files;
  console.log(files);
  if (files.length > 0) {
    errorMessageDiv.textContent = '';
    updateFileNames(files);
  }
});

function validateForm() {
  if (fileInputDiv.files.length === 0) {
    errorMessageDiv.textContent = 'Please select at least one file.';
    return false; // Validation failed
  }

  errorMessageDiv.textContent = ''; // Clear any previous error message
  return true; // Validation passed
}

// Event listener for form submission
uploadForm.addEventListener('submit', (event) => {
  event.preventDefault(); // Prevent the default form submission
  if (validateForm()) {
    const formData = new FormData(uploadForm); // Create FormData from the form
    console.log(formData);
    // Use fetch to send the FormData to a server endpoint
    fetch('/api/v1/uploads', {
      // Change '/upload' to your server endpoint
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle response data from the server
        console.log('Success:', data);
        event.target.reset();
        fileNamesDiv.textContent = 'No files chosen';
        alert('Files uploaded successfully!');
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('Error uploading files.');
      });
  }
});
