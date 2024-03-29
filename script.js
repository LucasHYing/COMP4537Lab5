document.addEventListener("DOMContentLoaded", function () {
    const insertDataButton = document.getElementById("insertDataButton");
    const submitQueryButton = document.getElementById("submitQueryButton");
    const sqlQueryTextArea = document.getElementById("sqlQuery");
    const resultDiv = document.getElementById("result");
  
    const API_URL = "https://nainzhou.com/comp4537lab5/backend/query"; // Change to your server's domain
  
    insertDataButton.addEventListener("click", function () {
      const patientsData = [
        { name: "Sara Brown", dateOfBirth: "1901-01-01" },
        { name: "John Smith", dateOfBirth: "1941-01-01" },
        { name: "Jack Ma", dateOfBirth: "1961-01-30" },
        { name: "Elon Musk", dateOfBirth: "1999-01-01" },
      ];
  
      let valuesString = patientsData
        .map((patient) => `('${patient.name}', '${patient.dateOfBirth}')`)
        .join(", ");
  
      let sqlInsertStatement = `INSERT INTO patient (name, dateOfBirth) VALUES ${valuesString};`;
  
      fetch(`${API_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain",
        },
        body: sqlInsertStatement,
      })
        .then((response) => response.json())
        .then((data) => {
          resultDiv.textContent = `Insert response: ${JSON.stringify(data)}`;
        })
        .catch((error) => {
          resultDiv.textContent = `Insert error: ${error.message}`;
        });
    });
  
    // Function to submit SQL queries
    submitQueryButton.addEventListener("click", function () {
      const sqlQuery = sqlQueryTextArea.value.trim();
      const isSelectQuery = sqlQuery.toLowerCase().startsWith("select");
      const isInsertQuery = sqlQuery.toLowerCase().startsWith("insert into");
  
      if (isSelectQuery) {
        const encodedSqlQuery = encodeURIComponent(sqlQuery);
        fetch(`${API_URL}?sql=${encodedSqlQuery}`, {
          method: "GET",
        })
          .then((response) => response.json())
          .then((data) => {
            displayResults(data);
          })
          .catch((error) => {
            resultDiv.textContent = `Query error: ${error.message}`;
          });
      } else if (isInsertQuery) {
        fetch(`${API_URL}`, {
          method: "POST",
          headers: {
            "Content-Type": "text/plain",
          },
          body: sqlQuery,
        })
          .then((response) => response.json())
          .then((data) => {
            displayResults(data);
          })
          .catch((error) => {
            resultDiv.textContent = `Execution error: ${error.message}`;
          });
      } else {
        resultDiv.textContent = "Only SELECT and INSERT operations are allowed.";
      }
    });
  
    function displayResults(data) {
      if (Array.isArray(data)) {
        // Handle the display of an array (e.g., results of a SELECT query)
        resultDiv.innerHTML =
          "<h3>Query Results:</h3>" +
          data.map((row) => JSON.stringify(row)).join("<br>");
      } else {
        // Handle the display of a single result object (e.g., result of an INSERT query)
        resultDiv.textContent = `Query response: ${JSON.stringify(data)}`;
      }
    }
  });
  