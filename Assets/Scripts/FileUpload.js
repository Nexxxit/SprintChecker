const INPUT = document.querySelector('input[name="readable"]');

const PREVIEW = document.querySelector('#display_csv_data');

const REGEX = new RegExp('(.*?)\.(csv)$', 'i');


function handleFile(event) {
  
  const file = event.target.files[0];

  
  if (file && REGEX.test(file.name)) {
    
    const reader = new FileReader();

    
    reader.onload = (e) => renderTable(e.target.result);

    
    reader.readAsText(file);
  } else {
    
    alert('Файл не выбран, либо его формат не поддерживается.');
    event.target.value = '';
  }
}


function renderTable(data) {
  
  let table = document.createElement('table');
  let thead = document.createElement('thead');
  let tbody = document.createElement('tbody');

  table.classList.add('table');

  data.split(/\r\n|\r|\n/)
    .forEach(function(row, index) {
     
      let trow = document.createElement('tr');

      row.split(/,/).forEach(function(cell) {
       
        let tcell = document.createElement(index > 0 ? 'td' : 'th');
       
        tcell.textContent = cell;
      
        trow.appendChild(tcell);
          
   //Изменение цвета строки от статуса       
          
          if (cell === 'ВСЕ ХОРОШО'){
              trow.style.backgroundColor = "green";
          }
          
          if((cell === 'ССЫЛКА НЕВАЛИДНА') || (cell === 'НЕТ БИБЛИОТЕКИ У НУЖНОГО ТАСКА') || (cell ==='БИБЛИОТЕКА НЕ СКОМПИЛИРОВАЛАСЬ')) {
              trow.style.backgroundColor = "white";
          }
          
          if((cell === 'НЕКОРРЕКТНОЕ НАЗВАНИЕ ТАСКА') || (cell === 'ОШИБКА ИНТЕРФЕЙСА') || (cell ==='НЕ СОШЛИСЬ ОТВЕТЫ')) {
              trow.style.backgroundColor = "yellow";
          }
            
      });

      index > 0 ? tbody.appendChild(trow) : thead.appendChild(trow);
    });

    
  table.appendChild(thead);
  
  table.appendChild(tbody);
    
    
  PREVIEW.innerHTML = '';

  PREVIEW.appendChild(table);
}

INPUT.addEventListener('change', handleFile);






