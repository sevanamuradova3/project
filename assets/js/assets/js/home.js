// JavaScript (scripts/script.js)
window.addEventListener('load', showHomePage);

function fetchPosts() {
    return fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json());
}

function createPostList(posts) {
    const postListElement = document.getElementById('postList');
    postListElement.innerHTML = '';

    posts.forEach(post => {
        fetch('https://source.unsplash.com/800x600/?nature') // Unsplash API'den resim al
            .then(response => {
                const postElement = document.createElement('div');
                postElement.className = 'post';
                postElement.innerHTML = `
                    <img src="${response.url}" alt="Post Image">
                    <h3>${post.title}</h3>
                    <p>${post.body}</p>
                    <button onclick="likePost(${post.id})">Beğen</button>
                    <button onclick="savePost(${post.id})">Kaydet</button>
                `;
                postListElement.appendChild(postElement);
            })
            .catch(error => console.error('Error fetching image:', error));
    });
}

function showHomePage() {
    fetchPosts()
        .then(posts => createPostList(posts))
        .catch(error => console.error('Error fetching posts:', error));
}
/// JavaScript (scripts/script.js)
window.addEventListener('load', showHomePage);

function fetchFollowedProfiles() {
    // JSONPlaceholder API'den kullanıcı bilgilerini al
    return fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json());
}

function createFollowedProfilesList(profiles) {
    const followedProfilesListElement = document.getElementById('followedProfilesList');
    followedProfilesListElement.innerHTML = '';

    profiles.forEach(profile => {
        const profileListItem = document.createElement('li');
        profileListItem.innerHTML = `
            <img src="https://i.pravatar.cc/50?u=${profile.id}" alt="${profile.username} Avatar">
            <span>${profile.username}</span>
        `;
        profileListItem.addEventListener('click', () => showProfileDetails(profile.id));
        followedProfilesListElement.appendChild(profileListItem);
    });
}

function fetchProfileDetails(profileId) {
    // JSONPlaceholder API'den kullanıcı bilgilerini al
    return fetch(`https://jsonplaceholder.typicode.com/users/${profileId}`)
        .then(response => response.json());
}

function showProfileDetails(profileId) {
    fetchProfileDetails(profileId)
        .then(profile => {
            const contentElement = document.querySelector('.content');
            contentElement.innerHTML = `
                <h2>${profile.name}</h2>
                <p>Username: ${profile.username}</p>
                <p>Email: ${profile.email}</p>
                <p>Phone: ${profile.phone}</p>
                <p>Website: ${profile.website}</p>
            `;
        })
        .catch(error => console.error('Error fetching profile details:', error));
}

function showHomePage() {
    fetchPosts()
        .then(posts => createPostList(posts))
        .catch(error => console.error('Error fetching posts:', error));

    fetchFollowedProfiles()
        .then(profiles => createFollowedProfilesList(profiles))
        .catch(error => console.error('Error fetching followed profiles:', error));
}
 // JavaScript (scripts/script.js)
window.addEventListener('load', showHomePage);

// Aktif profili tutmak için bir değişken
let activeProfileId = null;

function fetchFollowedProfiles() {
    return fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json());
}

function createFollowedProfilesList(profiles) {
    const followedProfilesListElement = document.getElementById('followedProfilesList');
    followedProfilesListElement.innerHTML = '';

    profiles.forEach(profile => {
        const profileListItem = document.createElement('li');
        profileListItem.innerHTML = `
            <img src="https://i.pravatar.cc/50?u=${profile.id}" alt="${profile.username} Avatar">
            <span>${profile.username}</span>
        `;
        profileListItem.addEventListener('click', () => showProfileDetails(profile.id));
        followedProfilesListElement.appendChild(profileListItem);
    });
}

function fetchProfileDetails(profileId) {
    return fetch(`https://jsonplaceholder.typicode.com/users/${profileId}`)
        .then(response => response.json());
}

function showProfileDetails(profileId) {
    fetchProfileDetails(profileId)
        .then(profile => {
            // Aktif profili güncelle
            activeProfileId = profile.id;

            const contentElement = document.querySelector('.content');
            contentElement.innerHTML = `
                <h2>${profile.name}</h2>
                <p>Username: ${profile.username}</p>
                <p>Email: ${profile.email}</p>
                <p>Phone: ${profile.phone}</p>
                <p>Website: ${profile.website}</p>
                
                <button onclick="likeProfile()">Beğen</button>
                <button onclick="saveProfile()">Kaydet</button>
            `;
        })
        .catch(error => console.error('Error fetching profile details:', error));
}

function likeProfile() {

    console.log(`Profil ID ${activeProfileId} beğenildi.`);
}

function saveProfile() {

    console.log(`Profil ID ${activeProfileId} kaydedildi.`);
}

function showHomePage() {
    fetchPosts()
        .then(posts => createPostList(posts))
        .catch(error => console.error('Error fetching posts:', error));

    fetchFollowedProfiles()
        .then(profiles => createFollowedProfilesList(profiles))
        .catch(error => console.error('Error fetching followed profiles:', error));
}


