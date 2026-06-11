
const spreadsheetId = '1wbJSoqMV6hJCYX0ttGPNm-LSLr95NQ11bKiucsdi6sU';

// Replace with your API Key

const apiKey = "";
// Construct the URL for Google Sheets API v4
const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values:batchGet?ranges=2025-2026&ranges=2024-2025&key=${apiKey}`;

//https://sheets.googleapis.com/v4/spreadsheets/1wbJSoqMV6hJCYX0ttGPNm-LSLr95NQ11bKiucsdi6sU/values:batchGet?ranges=2025-2026&ranges=2024-2025&key=AIzaSyBNPWwjcyeeqQxEs7a8RuWCUCGL3tRl3Mc

async function fetchGoogleSheetData() {
    try {
        console.log(apiKey);
        // Fetch data from Google Sheets API
        const response = await fetch(url);
        const data = await response.json();

        console.log(data.valueRanges)
        // Extract rows from the data

        for (let i = 0; i < data.valueRanges.length; i++) {
            const rows = data.valueRanges[i].values;

            // Get the table body element
            const tableBody = document.querySelector(`#data-table${i} tbody`);

            // Loop through the rows (starting from row 1 to skip headers)
            for (let i = 1; i < rows.length; i++) {
                const row = document.createElement('tr');

                // Loop through each cell in the row and create a table cell for each
                rows[i].forEach(cell => {
                    const cellElement = document.createElement('td');
                    cellElement.textContent = cell;
                    row.appendChild(cellElement);
                });

                // Append the row to the table
                tableBody.appendChild(row);
            }
        }
    } catch (error) {
        console.error('Error fetching Google Sheets data:', error);
    }
}

// Call the function to fetch and display data
document.addEventListener('DOMContentLoaded', fetchGoogleSheetData);

