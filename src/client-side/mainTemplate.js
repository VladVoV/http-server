export default () => `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Cars Dashboard</title>
<style>
  body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
  }
  
  h1 {
    margin-bottom: 20px;
  }
  
  button {
    margin-bottom: 10px;
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  
  #carForm {
    display: none;
    margin-top: 20px;
    border: 1px solid #ccc;
    padding: 20px;
    border-radius: 5px;
    background-color: #f9f9f9;
  }
  
  label {
    display: block;
    margin-bottom: 5px;
  }
  
  input {
    width: 100%;
    padding: 8px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-sizing: border-box;
  }
  
  form button[type="submit"] {
    background-color: #28a745;
  }
  
  form button[type="submit"]:hover {
    background-color: #218838;
  }
  
  #carContainer {
    margin-top: 20px;
  }
  
  #carContainer h2 {
    margin-bottom: 10px;
  }
  
  #carContainer p {
    margin-bottom: 5px;
  }
</style>
</head>
<body>
<h1>Cars Dashboard</h1>
<button onclick="showAllCars()">Show All Cars</button>
<button onclick="showRandomCar()">Show Random Car</button>
<button onclick="showCarForm()">Add a New Car</button>

<div id="carContainer"></div>

<div id="carForm" style="display:none;">
  <h2>Add a New Car</h2>
  <form id="newCarForm">
    <label for="brand">Brand:</label>
    <input type="text" id="brand" name="brand"><br><br>
    <label for="model">Model:</label>
    <input type="text" id="model" name="model"><br><br>
    <label for="year">Year:</label>
    <input type="number" id="year" name="year"><br><br>
    <button type="submit">Submit</button>
  </form>
</div>

<div id="updateCarForm" style="display:none;">
  <h2>Update Car</h2>
  <form id="updateForm">
    <label for="brandUpdate">Brand:</label>
    <input type="text" id="brandUpdate" name="brandUpdate"><br><br>
    <label for="modelUpdate">Model:</label>
    <input type="text" id="modelUpdate" name="modelUpdate"><br><br>
    <label for="yearUpdate">Year:</label>
    <input type="number" id="yearUpdate" name="yearUpdate"><br><br>
    <button type="submit">Update</button>
  </form>
</div>

<script>
function clearAll() {
    document.getElementById('carForm').style.display = 'none';
    document.getElementById('updateCarForm').style.display = 'none';
    const carContainer = document.getElementById('carContainer');
      carContainer.innerHTML = '';
}

function showAllCars() {
    clearAll();
    fetch('/cars')
    .then(response => response.json())
    .then(data => {
      const carContainer = document.getElementById('carContainer');
      carContainer.innerHTML = '<h2>All Cars</h2>';
      data.forEach(car => {
        carContainer.innerHTML += '<p>' + car.brand + ' ' + car.model + ' (' + car.year + ') <button onclick="showCarById(' + car.id + ')">Details</button></p>';
      });
    });
}

function showRandomCar() {
    clearAll();
    document.getElementById('carForm').style.display = 'none';
    fetch('/cars/random')
    .then(response => response.json())
    .then(data => {
      const carContainer = document.getElementById('carContainer');
      carContainer.innerHTML = '<h2>Random Car</h2>';
      carContainer.innerHTML += '<p>' + data.brand + ' ' + data.model + ' (' + data.year + ')</p>';
    });
}

function showCarForm() {
    clearAll();
    document.getElementById('carForm').style.display = 'block';
}

function showCarById(id) {
    clearAll();
    fetch('/cars/' + id)
    .then(response => response.json())
    .then(data => {
      const carContainer = document.getElementById('carContainer');
      carContainer.innerHTML = '<h2>Car Details</h2>';
      carContainer.innerHTML += '<p>' + data.brand + ' ' + data.model + ' (' + data.year + ')</p>';
      carContainer.innerHTML += '<button onclick="showUpdateForm(' + data.id + ')">Update</button>';
      carContainer.innerHTML += '<button onclick="deleteCar(' + data.id + ')">Delete</button>';
    });
}

function showUpdateForm(id) {
    clearAll();
    fetch('/cars/' + id)
    .then(response => response.json())
    .then(data => {
      document.getElementById('updateCarForm').style.display = 'block';
      document.getElementById('brandUpdate').value = data.brand;
      document.getElementById('modelUpdate').value = data.model;
      document.getElementById('yearUpdate').value = data.year;
      
      document.getElementById('updateForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const brand = document.getElementById('brandUpdate').value;
        const model = document.getElementById('modelUpdate').value;
        const year = document.getElementById('yearUpdate').value;
        
        fetch('/cars/' + id, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ brand, model, year })
        })
        .then(response => response.json())
        .then(data => {
          alert('Car updated successfully!');
          showAllCars();
        })
        .catch(error => {
          console.error('Error:', error);
          alert('Failed to update car. Please try again.');
        });
      });
    });
}

function deleteCar(id) {
    fetch('/cars/' + id, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        alert('Car deleted successfully!');
        clearAll();
        showAllCars();
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Failed to delete car. Please try again.');
    });
}

document.getElementById('newCarForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const brand = formData.get('brand');
  const model = formData.get('model');
  const year = formData.get('year');
  
  fetch('/cars', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ brand, model, year })
  })
  .then(response => response.json())
  .then(data => {
    alert('New car added successfully!');
    document.getElementById('newCarForm').reset();
    showAllCars();
  })
  .catch(error => {
    console.error('Error:', error);
    alert('Failed to add new car. Please try again.');
  });
});
</script>
</body>
</html>
`;
