window.onload = function () {
    fetchProfile();
}

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

            const unfollowButton = document.createElement('button');
            unfollowButton.innerHTML = 'Unfollow';
            unfollowButton.addEventListener('click', () => unfollow(username)); // Pass the username

            usernameContainer.appendChild(usernameDiv);
            usernameContainer.appendChild(unfollowButton);
        }
    } catch (error) {
        console.error('Error fetching users:', error);
    }
}

async function unfollow(username) {
    const token = sessionStorage.getItem('accessToken');
    const usernameContainer = document.getElementById('username');
    try {
        const unfollowResponse = await fetch('http://localhost:3000/tweets/unfollow', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username }) // Send the username
        });

        if (!unfollowResponse.ok) {
            const errorText = await unfollowResponse.text();
            console.error(`Failed to unfollow. Server response: ${errorText}`);
        } else {
            // Find the div containing the username and remove it
            const usernameDivs = usernameContainer.querySelectorAll('div');
            for (const div of usernameDivs) {
                if (div.textContent === username) {
                   
                    div.remove();
                    break; // No need to continue searching
                
            }
            }
        }
    } catch (error) {
        console.error('Error unfollowing:', error);
    }
}

