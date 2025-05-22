document.getElementById('visaForm').addEventListener('submit', function(e) {
    e.preventDefault();
  
    // Get previous passport data
    const passportData = JSON.parse(localStorage.getItem('passportData') || '{}');
  
    // Get selected visa days and calculate visa cost
    const visaDays = document.getElementById('visadays').value;
    let visaCost = 0;
    if (visaDays === '15') visaCost = 30;
    else if (visaDays === '30') visaCost = 60;
    else if (visaDays === '90') visaCost = 90;
  
    // Get new visa-related data from the form
    const visaData = {
      visaOption: document.getElementById('visaOption').value,
      contactNumber: document.getElementById('contactNumber').value,
      emailAddress: document.getElementById('emailAddress').value,
      occupation: document.getElementById('occupation').value,
      homeAddress: document.getElementById('homeAddress').value,
      nepalAddress: document.getElementById('nepalAddress').value,
      visaDays: visaDays,  // **capital D**
      visaCost: visaCost
    };
  
    // Merge passport and visa data
    const allData = { ...passportData, ...visaData };
  
    // Store merged data back to localStorage
    localStorage.setItem('passportData', JSON.stringify(allData));
  
    // Redirect to the final summary page
    window.location.href = 'summary.html';
  });
  