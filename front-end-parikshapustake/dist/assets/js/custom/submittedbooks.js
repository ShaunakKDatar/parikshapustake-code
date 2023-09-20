
// A $( document ).ready() block.
$( document ).ready(function() {
    console.log( "ready!" );

    // URL of the API you want to fetch data from
const apiUrl = 'http://localhost:3000/api/submittedbooks';

// Fetch options including CORS headers
const fetchOptions = {
  method: 'GET', // You can change this to 'POST' or other HTTP methods if needed
  headers: {
    // Set the necessary headers for CORS
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    // Add any other headers as needed
  },
  mode: 'cors', // Enable CORS
  credentials: 'same-origin', // You can use 'include' if you need to include cookies in the request
};

// Perform the fetch request
fetch(apiUrl, fetchOptions)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    // Handle the JSON data received from the server
    // Loop through the data and set values for each field in the book row
    for (let i = 0; i < data.length; i++) {
      const rowSelector = `#kt_project_users_table > tbody > tr:nth-child(${i + 1})`;
      const titleElement = document.querySelector(`${rowSelector} > td:nth-child(1) > div > div.d-flex.flex-column.justify-content-center > a`);
      //const authorElement = document.querySelector(`${rowSelector} > td:nth-child(2)`);
      const publisherElement = document.querySelector(`${rowSelector} > td:nth-child(2)`);
      //const statusElement = document.querySelector(`${rowSelector} > td:nth-child(3) > span`);
      const statusElementParent = document.querySelector(`${rowSelector} > td:nth-child(3)`);
      
      if (titleElement && publisherElement && statusElementParent) {
          console.log(titleElement.textContent);
          titleElement.textContent = data[i].title;
          // console.log(authorElement.textContent);
          // authorElement.textContent = data[i].author;
          console.log(publisherElement.textContent);
          publisherElement.textContent = data[i].publisher;
          //console.log(statusElement.textContent);
          //statusElement.textContent = data[i].status;

          if(data[i].status === 'rejected')
            statusElementParent.innerHTML = `<span class="badge badge-light-danger fw-bolder px-4 py-3">Rejected</span>`;
          if(data[i].status === 'accepted')
            statusElementParent.innerHTML = `<span class="badge badge-light-success fw-bolder px-4 py-3">Accepted</span>`;

          // Select the element containing "melody@altbox.com"
          const emailElement = document.querySelector(`${rowSelector} .fw-bold.fs-6.text-gray-400`);
          
          if (emailElement) {
              // Replace the email text with "sk das"
              emailElement.textContent = data[i].author;
          }
      }
    }
  })
  .catch(error => {
    // Handle errors, e.g., network issues or server errors
    console.error('Fetch error:', error);
  });

      

});