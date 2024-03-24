//cjenik

document.addEventListener('DOMContentLoaded', function() {
  var rows = document.querySelectorAll('#cjenik tbody tr');

  for (var i = 0; i < rows.length; i++) {
    rows[i].addEventListener('mouseover', showAdditionalInfo);
    rows[i].addEventListener('mouseout', hideAdditionalInfo);
  }

  var infoContainer;

  function showAdditionalInfo() {

    if(window.innerWidth > 480){
      return;
    }
    var opis = '';
    var cijena = '';

    var cells = this.querySelectorAll('td');
    for (var j = 0; j < cells.length; j++) {
      var cell = cells[j];
      var cellText = cell.textContent.trim();

      if (cell.classList.contains('opis')) {
        opis += cellText + ' ';
      } else if (cell.classList.contains('cijena')) {
        cijena += cellText + ' ';
      }
    }

    if (!infoContainer) {
      infoContainer = document.createElement('div');
      infoContainer.className = 'additional-info';
      document.querySelector('.table-responsive').appendChild(infoContainer);
    }
    if(opis === '')
      var podaci = cijena; 
    else
      var podaci = cijena + ' || ' + opis;
    infoContainer.textContent = podaci;
  }

  function hideAdditionalInfo() {
    if (infoContainer) {
      infoContainer.textContent = '';
    }
  }
});

//obrazac

  document.addEventListener('DOMContentLoaded', function() {
    var form = document.querySelector('form');
    var errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    var overlayDiv = document.createElement('div');
    overlayDiv.className = 'overlay';
    var myTimeInput = document.getElementById("vrijeme");
    if(myTimeInput === null)
    {}
    else
    myTimeInput.disabled = true;
  
    var dateField = document.getElementById('rezervacija_date');
    var timeField = document.getElementById('vrijeme');
  
    form.addEventListener('submit', function(event) {
      event.preventDefault();
      if (validateForm()) {
        form.submit();
      }
    });
  
    errorDiv.addEventListener('click', function() {
      if (errorDiv.parentNode) {
        errorDiv.parentNode.removeChild(errorDiv);
        overlayDiv.parentNode.removeChild(overlayDiv);
      }
    });
    
    form.addEventListener('focusout', function() {
      if(!validateForm()){
        console.log("Error");
        removeErrorMessage(this);
        validateForm(this);
      }
      });
  
    
    var dateField = document.getElementById('rezervacija_date');
    var myTimeInput = document.getElementById('vrijeme');
    var currentDate = new Date().toISOString().split('T')[0];
    if(dateField === null){
    }
    else
    {
    dateField.addEventListener('change', function() {
      if (dateField.value < currentDate) {
        myTimeInput.disabled = true;
      } else {
        myTimeInput.disabled = false;
      }
    });
    }

    function setDefaultTime() {

    
      if (dateField.value === currentDate) {
        var currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        var timeField = document.getElementById('vrijeme');
        console.log("Tocčno");
    
        timeField.value = currentTime;
    
    
        timeField.addEventListener('input', function() {
          if (this.value < currentTime) {
            this.value = currentTime;
          }
        });
      } else {

        var timeField = document.getElementById('vrijeme');
        timeField.value = '';
        timeField.removeEventListener('input', function() {});
      }
    }
    if(this.getElementById('rezervacija_date') === null){}
    else{
    document.getElementById('rezervacija_date').addEventListener('change', setDefaultTime);
    }
    function validateForm() {
      var errorMessage = '';
      var fields = form.querySelectorAll('input, select, textarea');
  
      for (var i = 0; i < fields.length; i++) {
        var field = fields[i];
        var fieldType = field.type;
        var fieldValue = field.value.trim();
  
        if (field.hasAttribute('required') && fieldValue === '') {
          errorMessage += 'Polje ' + field.name + ' je obavezno. ';
          field.style.border = '1px solid #ff0000';
        } else {
          field.style.border = '';
        }
  
        switch (fieldType) {
          case 'text':
            var specialCharsRegex = /[!#<>?]/;
            if (specialCharsRegex.test(fieldValue)) {
              errorMessage += 'Polje ' + field.name + ' ne smije sadržavati specijalne znakove (!,?,#,<,>). ';
              field.style.border = '1px solid #ff0000';
            }
            break;
  
          case 'textarea':
            var multilineRegex = /^[^!#<>?]{10,1000}$/;
            if (!multilineRegex.test(fieldValue)) {
              errorMessage += 'Polje ' + field.name + ' mora imati najmanje 10 i najviše 1000 znakova. Nedozvoljeni znakovi su: (!,?,#,<,>). ';
              field.style.border = '1px solid #ff0000';
            }
            break;
  
          case 'date':
            var currentDate = new Date().setHours(0, 0, 0, 0);
            var selectedDate = new Date(fieldValue).setHours(0, 0, 0, 0);
            if (selectedDate < currentDate) {
              errorMessage += 'Odabrani datum ne može biti u prošlosti. ';
              field.style.border = '1px solid #ff0000';
            }
            break;
            
  
          case 'time':
            var currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            if (fieldValue !== '' && timeField.disabled) {
              var selectedTime = new Date('2000-01-01T' + fieldValue);
              var currentTimeObj = new Date('2000-01-01T' + currentTime);
              var selectedDate = new Date(dateField.value);
              var currentDate = new Date().toLocaleDateString();
              if (selectedDate.toDateString() === currentDate && selectedTime < currentTimeObj) {
                errorMessage += 'Ako je odabrani datum današnji datum, ne može se unijeti vrijeme koje je manje od trenutnog vremena. ';
                field.style.border = '1px solid #ff0000';
              }
            }
            break;
        }
      }
      if(document.getElementById('text_uvjet') === null)
      {}
      else{


      var text_uvjet = document.getElementById('text_uvjet');

      var checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
      if (checkboxes.length === 0) {
      errorMessage += 'Morate prihvatiti uvjete korištenja!';
      text_uvjet.style.border = '1px solid red';
      }
      }


      if (errorMessage !== '') {
        errorDiv.textContent = errorMessage;
        document.body.appendChild(overlayDiv);
        document.body.appendChild(errorDiv);
        return false;
      } else {
        if (errorDiv.parentNode) {
          errorDiv.parentNode.removeChild(errorDiv);
          overlayDiv.parentNode.removeChild(overlayDiv);
        }
        return true;
         }
        }
    });

    function rotirajSadrzaj() {
      const element = document.getElementById('logoanime');
      let rotacija = 0;
    
      function rotiraj() {
        rotacija += 1;
        element.style.transform = `rotate(${rotacija}deg)`;
    
        if (rotacija < 360) {
          setTimeout(rotiraj, 10);
        }
      }
    
      rotiraj();
    }

    const banner = document.getElementById('banner');
    let opacity = 1;
    let isFadingOut = true;
    
    function fadeBanner() {
      if (isFadingOut) {
        opacity -= 0.01;
        banner.style.opacity = opacity;
    
        if (opacity <= 0) {
          isFadingOut = false;
          setTimeout(fadeBanner, 1000); 
        } else {
          setTimeout(fadeBanner, 10); 
        }
      } else {
        opacity += 0.01;
        banner.style.opacity = opacity;
    
        if (opacity >= 1) {
          isFadingOut = true;
          setTimeout(fadeBanner, 1000); 
        } else {
          setTimeout(fadeBanner, 10); 
        }
      }
    }
    
    function animacija2() {
      const element = document.querySelector('h2');
      const boje = ['red', 'blue', 'green', 'purple'];
      let index = 0;
    
      function promijeniBoju() {
        element.style.color = boje[index];
    
        index = (index + 1) % boje.length;
    
        setTimeout(promijeniBoju, 1000);
      }
    
      promijeniBoju();
    }


window.addEventListener('load', () => {
  rotirajSadrzaj();
  animacija2();
  fadeBanner();
});
