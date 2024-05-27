function validateRut(event) {
  const input = event.target.value;
  // Expresión regular para permitir números y la letra 'k'
  const regex = /^[0-9kK]*$/;
  if (!regex.test(input)) {
    event.target.value = input.slice(0, -1); // Eliminar el último carácter no válido
  }

}

document.getElementById('clientForm').addEventListener('submit', function (event) {
  event.preventDefault();

  const formData = new FormData(this);
  const data = Object.fromEntries(formData.entries());

  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0'); // Meses van de 0 a 11
  const day = String(today.getDate()).padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`;

  // Agregar la fecha al objeto data
  data.date = formattedDate;

  fetch('http://localhost:5000/add-client', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(response => response.json())
    .then(data => {
      alert('Client saved successfully!');
      this.reset();
    })
    .catch(error => {
      console.error('Error:', error);
    });
});
