document.addEventListener('DOMContentLoaded', function() {
    const tableBody = document.getElementById('table-body');

    // Fetch JSON data
    fetch("/express")
        .then(response => response.json())
        .then(data => {
            // Clear existing table rows
            tableBody.innerHTML = '';

            // Iterate through JSON data and create table rows
            data.forEach(item => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <th scope="row">${item.id}</th>
                    <td>${item.first_name}</td>
                    <td>${item.last_name}</td>
                    <td>${item.email}</td>
                    <td>${item.birthdate}</td>
                    <td>${item.credit_card}</td>
                `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => console.error('Error fetching JSON:', error));
});