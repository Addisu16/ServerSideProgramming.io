
window.onload=function(){
    fetchProfile();
    document.getElementById('unfollow').onclick=unfollow;
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

        const responseData = await response.json(); // Parse the JSON response
        console.log(responseData);

        // Get the container where you want to display the usernames
        const usernameContainer = document.getElementById('username');
        const unfollowButton = document.getElementById('unfollow');
        // Iterate through the followers array and create divs for each username
        for (const username of responseData.followers) {
            const usernameDiv = document.createElement('div');
            usernameDiv.textContent = username;
            usernameContainer.appendChild(usernameDiv);
            usernameContainer.appendChild(unfollowButton)
        }
    } catch (error) {
        console.error('Error fetching users:', error);
    }
}






async function unfollow(){
    const token = sessionStorage.getItem('accessToken');
    const usernameContainer=document.getElementById('username');
    try {
        const unfollowResponse = await fetch('http://localhost:3000/tweets/unfollow', {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username }) // Send the username to unfollow
        });

        if (!unfollowResponse.ok) {
            throw new Error('Failed to unfollow.');
        }else{

        // Remove the unfollowed username from the UI
        usernameContainer.removeChild(usernameDiv);
        }
    } catch (error) {
        console.error('Error unfollowing:', error);
    }
};




