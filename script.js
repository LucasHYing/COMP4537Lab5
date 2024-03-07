// Storing strings at the top as constants
const INSERT_API_URL = 'https://YourDomain.xyz/lab5/api/v1/insert';
const QUERY_API_URL = 'https://YourDomain.xyz/lab5/api/v1/query';

const insertData = () => {
    // Data to be inserted
    const data = [
        { name: 'Sara Brown', dateOfBirth: '1901-01-01' },
        { name: 'John Smith', dateOfBirth: '1941-01-01' },
        { name: 'Jack Ma', dateOfBirth: '1961-01-30' },
        { name: 'Elon Musk', dateOfBirth: '1999-01-01' }
    ];
    
    // Make a POST request to insert data
    fetch(INSERT_API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
};

const submitQuery = () => {
    const query = document.getElementById('sqlQuery').value.trim();
    const isSelect = query.toLowerCase().startsWith('select');

    // Determine if it's a SELECT or INSERT query
    const url = isSelect ? QUERY_API_URL : INSERT_API_URL;
    const method = isSelect ? 'GET' : 'POST';

    // Make the request
    fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: isSelect ? null : JSON.stringify({ query }),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
};
