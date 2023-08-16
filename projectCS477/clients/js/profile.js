window.onload = function () {
    fetchProfile();
    searchUser();

}

// Fetch user profiles and populate followers
async function fetchProfile() {
    const token = sessionStorage.getItem('accessToken');
    try {
        const response = await fetch('http://localhost:3000/tweets/follower', {
            headers: {
                'Authorization': 'Bearer ' + token,
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch users.');
        }

        const responseData = await response.json();

        const usernameContainer = document.getElementById('username');

        for (const username of responseData.followers) {
            const usernameDiv = document.createElement('div');
            usernameDiv.textContent = username;
            usernameDiv.setAttribute('data-username', username); // Set data attribute

            const unfollowButton = document.createElement('button');
            unfollowButton.innerHTML = 'Unfollow';
            unfollowButton.addEventListener('click', () => unfollow(username)); // Pass the username

            usernameDiv.appendChild(unfollowButton); // Append the button inside the div
            usernameContainer.appendChild(usernameDiv);
        }
    } catch (error) {
        console.error('Error fetching users:', error);
    }
}

// Unfollow function
async function unfollow(username) {
    // Your existing code

    const usernameDivs = document.querySelectorAll('.username');
    usernameDivs.forEach(usernameDiv => {
        if (usernameDiv.getAttribute('data-username') === username) { // Compare data-username
            usernameDiv.remove();
        }
    });

    // Your existing code
}



function searchUser() {
    const searchButton = document.getElementById('search-button');
    const searchInput = document.getElementById('search-input');
    const searchResultsContainer = document.getElementById('search-results');
    const token = sessionStorage.getItem('accessToken');

    searchButton.addEventListener('click', async () => {
        const searchTerm = searchInput.value.trim();

        if (searchTerm) {
            try {
                const headers = {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json'
                };

                const response = await fetch(`http://localhost:3000/tweets/search?username=${encodeURIComponent(searchTerm)}`, {
                    method: 'GET',
                    headers: headers
                });

                if (response.ok) {
                    const matchingUsernames = await response.json();
                    displaySearchResults(matchingUsernames);
                } else {
                    console.error('Request failed:', response.status, response.statusText);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
    });

    function displaySearchResults(usernames) {
        searchResultsContainer.innerHTML = '';

        if (usernames.length === 0) {
            searchResultsContainer.innerHTML = '<p>No matching followers found.</p>';
        } else {
            const resultList = document.createElement('div');
            const button=document.createElement('button');
            button.innerHTML='unfollow';

            usernames.forEach(username => {
                const listItem = document.createElement('li');
                listItem.textContent = username ;
                resultList.appendChild(button);
                resultList.appendChild(listItem);
            });
            searchResultsContainer.appendChild(resultList);
        }
    }
}
