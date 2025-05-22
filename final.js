document.addEventListener('DOMContentLoaded', () => {
  const data = JSON.parse(localStorage.getItem('passportData') || '{}');

  const visaDays = data.visaDays || '';
  let visaCost = '';
  if (visaDays === '15') visaCost = '$30';
  else if (visaDays === '30') visaCost = '$60';
  else if (visaDays === '90') visaCost = '$90';
  else visaCost = data.visaCost ? `$${data.visaCost}` : 'Unknown';

  const summaryHTML = `
    <h2>Passport Information</h2>
    <p><strong>Full Name:</strong> ${data.name || 'N/A'}</p>
    <p><strong>Nationality:</strong> ${data.nationality || 'N/A'}</p>
    <p><strong>Passport Number:</strong> ${data.passportNumber || 'N/A'}</p>
    <p><strong>Date of Birth:</strong> ${data.dob || 'N/A'}</p>
    <p><strong>Gender:</strong> ${data.gender || 'N/A'}</p>
    <p><strong>Passport Expiry:</strong> ${data.expiry || 'N/A'}</p>

    <h2>Visa & Contact Information</h2>
    <p><strong>Visa Reason:</strong> ${data.visaOption || 'N/A'}</p>
    <p><strong>Visa Duration:</strong> ${visaDays} Days</p>
    <p><strong>Visa Cost:</strong> ${visaCost}</p>
    <p><strong>Contact Number:</strong> ${data.contactNumber || 'N/A'}</p>
    <p><strong>Email:</strong> ${data.emailAddress || 'N/A'}</p>
    <p><strong>Occupation:</strong> ${data.occupation || 'N/A'}</p>
    <p><strong>Address of Your Country:</strong> ${data.homeAddress || 'N/A'}</p>
    <p><strong>Nepal Address:</strong> ${data.nepalAddress || 'N/A'}</p>
  `;

  document.getElementById('summaryData').innerHTML = summaryHTML;
});
