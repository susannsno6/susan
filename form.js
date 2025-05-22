document.addEventListener('DOMContentLoaded', () => {
    const savedData = localStorage.getItem('passportData');
    console.log('Loaded passportData from localStorage:', savedData);
  
    if (savedData) {
      const data = JSON.parse(savedData);
      document.getElementById('fullName').value = data.name || '';
      document.getElementById('nationality').value = data.nationality || '';
      document.getElementById('passportNumber').value = data.passportNumber || '';
      document.getElementById('dob').value = data.dob || '';
      document.getElementById('gender').value = data.gender || '';
      document.getElementById('expiry').value = data.expiry || '';
    }
  
    const form = document.getElementById('passportForm');
    if (!form) {
      console.error('Form with ID "passportForm" not found!');
      return;
    }
  
    form.addEventListener('submit', function(e) {
      e.preventDefault();
  
      const data = {
        name: document.getElementById('fullName').value,
        nationality: document.getElementById('nationality').value,
        passportNumber: document.getElementById('passportNumber').value,
        dob: document.getElementById('dob').value,
        gender: document.getElementById('gender').value,
        expiry: document.getElementById('expiry').value,
      };
  
      console.log('Saving form data:', data);
  
      localStorage.setItem('passportData', JSON.stringify(data));
      window.location.href = 'visa.html';
    });
  });
  