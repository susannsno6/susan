document.addEventListener('DOMContentLoaded', function () {
    const scanBtn = document.getElementById('scanBtn');
    const fileInput = document.getElementById('fileInput');
    const previewBox = document.getElementById('previewBox');
    const proceedManualBtn = document.getElementById('proceedManualBtn'); // Manual proceed button
  
    scanBtn.addEventListener('click', () => {
      fileInput.click();
    });
  
    fileInput.addEventListener('change', () => {
      const file = fileInput.files[0];
      if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = function (e) {
          previewBox.innerHTML = '';
          const img = document.createElement('img');
          img.src = e.target.result;
          img.style.maxWidth = '100%';
          img.style.maxHeight = '100%';
          img.style.borderRadius = '8px';
          previewBox.appendChild(img);
  
          // OCR processing
          Tesseract.recognize(
            e.target.result,
            'eng',
            { logger: m => console.log(m) }
          ).then(({ data: { text } }) => {
            console.log("OCR Raw Output:", text);
  
            const lines = text.split('\n').map(line => line.trim()).filter(Boolean);
            const mrzLines = lines.filter(line => line.match(/[A-Z0-9<]{30,}/));
            let result = {};
  
            if (mrzLines.length >= 2) {
              const mrz1 = mrzLines[0];
              const mrz2 = mrzLines[1];
  
              // Parse MRZ line 1
              const nameParts = mrz1.split('<<');
              const surnameRaw = nameParts[0].replace(/^P<[A-Z]{3}/, '');
              const givenNamesRaw = nameParts[1] || '';
              const surname = surnameRaw.replace(/</g, ' ').trim();
              const givenNames = givenNamesRaw.replace(/</g, ' ').trim();
  
              result.name = `${surname} ${givenNames}`;
              result.givenNames = givenNames;
              result.nationality = mrz2.substring(10, 13);
              result.passportNumber = mrz2.substring(0, 9).replace(/</g, '');
              result.dob = formatDateFromYYMMDD(mrz2.substring(13, 19));
              result.gender = mrz2.substring(20, 21);
              result.expiry = formatDateFromYYMMDD(mrz2.substring(21, 27));
  
              console.log("Extracted Fields:", result);
  
              // Save and redirect
              localStorage.setItem('passportData', JSON.stringify(result));
              window.location.href = 'form.html';
            } else {
              alert("Could not detect MRZ lines. Please try a clearer image.");
            }
          });
        };
        reader.readAsDataURL(file);
      } else {
        alert("Please upload a valid image file.");
      }
    });
  
    // Proceed manually button click handler
    proceedManualBtn.addEventListener('click', () => {
      window.location.href = 'form.html';
    });
  
    function formatDateFromYYMMDD(dateStr) {
      const yy = dateStr.substring(0, 2);
      const mm = dateStr.substring(2, 4);
      const dd = dateStr.substring(4, 6);
      const year = parseInt(yy, 10) > 30 ? '19' + yy : '20' + yy;
      return `${year}-${mm}-${dd}`;
    }
  });
  