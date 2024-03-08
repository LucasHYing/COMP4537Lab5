document.addEventListener('DOMContentLoaded', function() {
    const insertDataButton = document.getElementById('insertDataButton');
    const submitQueryButton = document.getElementById('submitQueryButton');
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

        // Function to submit SQL queries
        submitQueryButton.addEventListener('click', function() {
            const sqlQuery = sqlQueryTextArea.value.trim();
            const isSelectQuery = sqlQuery.toLowerCase().startsWith('select');
    
            if (isSelectQuery) {
                // Encode and send a GET request for SELECT queries
                const encodedSqlQuery = encodeURIComponent(sqlQuery);
                fetch(`${API_URL}/${encodedSqlQuery}`, {
                    method: 'GET',
                })
                .then(response => response.json())
                .then(data => {
                    displayResults(data);
                })
                .catch((error) => {
                    resultDiv.textContent = `Query error: ${error.message}`;
                });
            } else {
                // The body now needs to be an array of patient objects
                try {
                    // Attempt to parse the input as an array of patient objects
                    const patientData = JSON.parse(sqlQuery);

                    // Send a POST request with the patient data array
                    fetch(`${API_URL}/comp4537lab5/backend/insert`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(patientData), // This should be an array of objects
                    })
                    .then(response => response.json())
                    .then(data => {
                        displayResults(data);
                    })
                    .catch((error) => {
                        resultDiv.textContent = `Query error: ${error.message}`;
                    });
                } catch(e) {
                    // If parsing fails, inform the user
                    resultDiv.textContent = `Insert error: Invalid input format. Please provide a valid JSON array of patient objects.`;
                }
            }
        });

    function displayResults(data) {
        if (Array.isArray(data)) {
            // Handle the display of an array (e.g., results of a SELECT query)
            resultDiv.innerHTML = '<h3>Query Results:</h3>' + 
            data.map(row => JSON.stringify(row)).join('<br>');
        } else {
            // Handle the display of a single result object (e.g., result of an INSERT query)
            resultDiv.textContent = `Query response: ${JSON.stringify(data)}`;
        }
    }
});