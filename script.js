document.addEventListener('DOMContentLoaded', function() {
    const insertDataButton = document.getElementById('insertDataButton');
    const submitQueryButton = document.getElementById('submitQueryButton');
    const getAllPatientsButton = document.getElementById('getAllPatientsButton');
    const sqlQueryTextArea = document.getElementById('sqlQuery');
    const resultDiv = document.getElementById('result');

    const API_URL = 'https://nainzhou.com/comp4537lab5/backend'; // Change to your server's domain

    insertDataButton.addEventListener('click', function() {
        const patientsData = [
            { name: 'Sara Brown', dateOfBirth: '1901-01-01' },
            { name: 'John Smith', dateOfBirth: '1941-01-01' },
            { name: 'Jack Ma', dateOfBirth: '1961-01-30' },
            { name: 'Elon Musk', dateOfBirth: '1999-01-01' }
        ];

        fetch(`${API_URL}/insert`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(patientsData),
        })
        .then(response => response.json())
        .then(data => {
            resultDiv.textContent = `Insert response: ${JSON.stringify(data)}`;
        })
        .catch((error) => {
            resultDiv.textContent = `Insert error: ${error.message}`;
        });
    });

    submitQueryButton.addEventListener('click', function() {
        const sqlQuery = sqlQueryTextArea.value.trim();
        const endpoint = sqlQuery.toLowerCase().startsWith('select') ? 'select' : 'insert';
        const method = sqlQuery.toLowerCase().startsWith('select') ? 'GET' : 'POST';

        fetch(`${API_URL}/${endpoint}`, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: method === 'POST' ? JSON.stringify({ query: sqlQuery }) : null,
        })
        .then(response => response.json())
        .then(data => {
            resultDiv.textContent = `Query response: ${JSON.stringify(data)}`;
        })
        .catch((error) => {
            resultDiv.textContent = `Query error: ${error.message}`;
        });
    });

    getAllPatientsButton.addEventListener('click', function() {
        fetch(`${API_URL}/select%20*%20from%20patient`, {
            method: 'GET'
        })
        .then(response => response.json())
        .then(data => {
            resultDiv.innerHTML = '<h3>Patients List:</h3>' + 
            data.map(patient => `ID: ${patient.patientid}, Name: ${patient.name}, Date of Birth: ${patient.dateOfBirth}`).join('<br>');
        })
        .catch((error) => {
            resultDiv.textContent = `Error fetching patients: ${error.message}`;
        });
    });
});
