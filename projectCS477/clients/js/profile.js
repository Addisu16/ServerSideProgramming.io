window.onload = function () {
    fetchProfile();
    searchUser();
    const username = sessionStorage.getItem('username');

    document.getElementById('profilepage').innerText = 'Welcome' + " " + username;
    document.getElementById('profilepage').style.color='yellow';


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

        const usernameContainer = document.getElementById('usernameContainer'); // Update the ID

        for (const { username, id } of responseData.followers) {
            const usernameDiv = document.createElement('div');
            usernameDiv.textContent = username;
            usernameDiv.setAttribute('data-userid', id);

            const unfollowButton = document.createElement('button');
            unfollowButton.innerHTML = 'Unfollow';
            unfollowButton.addEventListener('click', () => unfollow(id));

            usernameDiv.appendChild(unfollowButton);
            usernameContainer.appendChild(usernameDiv);
        }
    } catch (error) {
        console.error('Error fetching users:', error);
    }
}

async function unfollow(username) {
    const token = sessionStorage.getItem('accessToken');
    try {
        const unfollowResponse = await fetch(`http://localhost:3000/tweets/unfollow/${username}`, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
        });

        if (!unfollowResponse.ok) {
            const errorText = await unfollowResponse.text();
            console.error(`Failed to unfollow. Server response: ${errorText}`);
        } else {
            const usernameDivs = document.querySelectorAll('#username');
            usernameDivs.forEach(usernameDiv => {
                if (usernameDiv.getAttribute('data-username') === username) {
                    usernameDiv.remove();



                }
                location.reload();
            });
        }
    } catch (error) {
        console.error('Error unfollowing:', error);
    }
}

const search = async () => {
    const searchInput = document.getElementById('search-input');
    const searchResultsContainer = document.getElementById('search-results');
    const token = sessionStorage.getItem('accessToken');
    const searchTerm = searchInput.value.trim();
    try {
        const headers = {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        };

        const response = await fetch(`http://localhost:3000/tweets/searchAll?username=${encodeURIComponent(searchTerm)}`, {
            method: 'GET',
            headers: headers,

        });

        if (response.ok) {

            const matchingUserProfile = await response.json();
            console.log(matchingUserProfile)
            searchResultsContainer.innerHTML = '';
            matchingUserProfile.forEach((o) => {
                const createdUser = createUserElement(o);
                searchResultsContainer.append(createdUser);
            })

        } else {
            console.error('Request failed:', response.status, response.statusText);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

function searchUser() {
    const searchButton = document.getElementById('search-button');
    searchButton.addEventListener('click', search)
}


async function follow(userId) {
    const token = sessionStorage.getItem('accessToken');
    try {
        const headers = {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        };
        const response = await fetch(`http://localhost:3000/tweets/follow/${userId}`, {
            method: 'POST',
            headers: headers,
        });
    } catch (error) {
        console.error('Error:', error);
    }
}
function createUserElement(user) {
    const userDiv = document.createElement('div');
    userDiv.className = 'user';

    const usernameElement = document.createElement('span');
    usernameElement.textContent = user.username;
    userDiv.appendChild(usernameElement);

    const followButton = document.createElement('button');
    followButton.textContent = user.isFollowed ? 'Unfollow' : 'Follow';
    followButton.setAttribute('id', 'follow');
    followButton.addEventListener('click', async () => {
        if (!user.isFollowed) {
            await follow(user.id);
            location.reload();

        }
        user.isFollowed = !user.isFollowed;
        followButton.textContent = user.isFollowed ? 'Unfollow' : 'Follow';

    });
    userDiv.appendChild(followButton);
    return userDiv;
}

