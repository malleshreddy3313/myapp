const API_BASE_URL = window.location.origin;  //  <=====  CHECK THIS VALUE

// Function to fetch and display user data
function displayUserData() {
    const dataContainer = document.getElementById('data-container');
    dataContainer.innerHTML = '<p class="text-gray-700 text-center">Loading data...</p>'; // Initial loading message

    fetch(`${API_BASE_URL}/api/users/users`) // Corrected URL
        .then(response => {
            if (!response.ok) {
                return response.json().then(errorData => {
                    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
                });
            }
            return response.json();
        })
        .then(data => {
            if (data && data.length > 0) {
                dataContainer.innerHTML = ''; // Clear the loading message
                const table = document.createElement('table');
                table.className = "min-w-full leading-normal shadow-md rounded-lg overflow-hidden";

                const thead = document.createElement('thead');
                thead.className = "bg-gray-200 text-gray-700";

                const trHead = document.createElement('tr');
                const thName = document.createElement('th');
                thName.className = "px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold uppercase tracking-wider";
                thName.textContent = 'Name';
                const thEmail = document.createElement('th');
                thEmail.className = "px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold uppercase tracking-wider";
                thEmail.textContent = 'Email';
                const thPhone = document.createElement('th');
                thPhone.className = "px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold uppercase tracking-wider";
                thPhone.textContent = 'Phone';

                trHead.appendChild(thName);
                trHead.appendChild(thEmail);
                trHead.appendChild(thPhone);
                thead.appendChild(trHead);
                table.appendChild(thead);

                const tbody = document.createElement('tbody');
                tbody.className = "bg-white";
                data.forEach(user => {
                    const tr = document.createElement('tr');
                    const tdName = document.createElement('td');
                    tdName.className = "px-5 py-5 border-b border-gray-200 text-sm";
                    tdName.textContent = user.name;
                    const tdEmail = document.createElement('td');
                    tdEmail.className = "px-5 py-5 border-b border-gray-200 text-sm";
                    tdEmail.textContent = user.email;
                    const tdPhone = document.createElement('td');
                    tdPhone.className = "px-5 py-5 border-b border-gray-200 text-sm";
                    tdPhone.textContent = user.phone;

                    tr.appendChild(tdName);
                    tr.appendChild(tdEmail);
                    tr.appendChild(tdPhone);
                    tbody.appendChild(tr);
                });
                table.appendChild(tbody);
                dataContainer.appendChild(table);
            } else {
                dataContainer.innerHTML = '<p class="text-gray-700 text-center">No user data available.</p>';
            }
        })
        .catch(error => {
            dataContainer.innerHTML = `<p class="text-red-600 text-center">Error fetching data: ${error.message}</p>`;
            console.error('Error fetching user data:', error);
        });
}

document.addEventListener('DOMContentLoaded', displayUserData);