const toggle = document.getElementById('input');
  
    toggle.addEventListener('change', () => {
      if (toggle.checked) {
        document.body.classList.add('dark');
        document.body.classList.remove('light');
      } else {
        document.body.classList.add('light');
        document.body.classList.remove('dark');
      }
    });
  
    // Define o tema inicial com base no estado do toggle
    if (toggle.checked) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.add('light');
    }
