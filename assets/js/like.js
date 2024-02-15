


var userProfile = {
    profilePicture: '',
    username: '',
    bio: ''
};


function openEditModal() {
    document.getElementById('edit-modal').style.display = 'block';
}

function closeEditModal() {
    document.getElementById('edit-modal').style.display = 'none';
}

function updateProfile() {
    var newUsername = document.getElementById('new-username').value;
    var newBio = document.getElementById('new-bio').value;
    var newProfilePicture = document.getElementById('new-profile-picture').files[0];

    // Profil sayfasındaki etiketleri güncelle
    document.getElementById('current-username').innerText = newUsername;
    document.getElementById('current-bio').innerText = newBio;

    if (newProfilePicture) {
        var reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById('profile-picture').src = e.target.result;

            // userProfile nesnesini güncelle
            userProfile.username = newUsername;
            userProfile.bio = newBio;
            userProfile.profilePicture = e.target.result; // Base64 formatında fotoğrafı kaydet

            saveUserProfile(); // Değişiklikleri yerel depolamada kaydet
        };
        reader.readAsDataURL(newProfilePicture);
    }

    closeEditModal();
}

// Diğer fonksiyonlarınızı buraya ekleyin...
// Takip edilen kullanıcıları saklamak için boş bir dizi tanımlayın
var followingUsers = [];

function searchUsers() {
    var searchInput = document.getElementById('searchInput').value.trim().toLowerCase();
    if (searchInput === '') {
        alert('Lütfen bir arama terimi girin.');
        return;
    }

    fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(users => {
            var searchResults = users.filter(user => user.name.toLowerCase().includes(searchInput));
            displaySearchResults(searchResults);
        })
        .catch(error => console.error('Arama sırasında bir hata oluştu: ', error));
}

function displaySearchResults(results) {
    var searchResultsContainer = document.getElementById('searchResults');
    searchResultsContainer.innerHTML = '';

    results.forEach(user => {
        var userElement = document.createElement('div');
        userElement.textContent = user.name;

        var followButton = document.createElement('button');
        followButton.textContent = 'Follow';
        followButton.onclick = function() {
            followUser(user);
        };

        userElement.appendChild(followButton);
        searchResultsContainer.appendChild(userElement);
    });
}

function followUser(user) {
    if (!followingUsers.some(u => u.id === user.id)) {
        followingUsers.push(user);
        saveFollowingList();
        updateFollowingCount();
    }
}

function saveFollowingList() {
    localStorage.setItem('followingUsers', JSON.stringify(followingUsers));
}

function loadFollowingList() {
    var storedFollowing = localStorage.getItem('followingUsers');
    if (storedFollowing) {
        followingUsers = JSON.parse(storedFollowing);
        updateFollowingCount();
    }
}

function updateFollowingCount() {
    document.getElementById('followingCount').textContent = '(' + followingUsers.length + ')';
}

function showFollowingList() {
    var followingListContainer = document.getElementById('followingUsers');
    followingListContainer.innerHTML = '';

    followingUsers.forEach(user => {
        var listItem = document.createElement('li');
        listItem.textContent = user.name;
        followingListContainer.appendChild(listItem);
    });
}

// Sayfa yüklendiğinde takip edilen kullanıcıları yükleyin
document.addEventListener('DOMContentLoaded', function () {
    loadFollowingList();
});


function saveUserProfile() {
    localStorage.setItem('userProfile', JSON.stringify(userProfile));
}

function loadUserProfile() {
    var storedProfile = localStorage.getItem('userProfile');
    if (storedProfile) {
        userProfile = JSON.parse(storedProfile);
        renderUserProfile();
    }
}

function renderUserProfile() {
    document.getElementById('current-username').textContent = userProfile.username;
    document.getElementById('current-bio').textContent = userProfile.bio;

    if (userProfile.profilePicture) {
        document.getElementById('profile-picture').src = userProfile.profilePicture;
    }
}

// Profil bilgilerini yüklemek için
document.addEventListener('DOMContentLoaded', function () {
    loadUserProfile();
});

document.addEventListener('DOMContentLoaded', function() {
    const likedPosts = JSON.parse(localStorage.getItem('likedPosts')) || [];
    const savedPosts = JSON.parse(localStorage.getItem('savedPosts')) || [];
    const likedPostsContainer = document.getElementById('liked-posts');
    const savedPostsContainer = document.getElementById('saved-posts');

    likedPosts.forEach(postId => fetchPost(postId, likedPostsContainer, 'liked'));
    savedPosts.forEach(postId => fetchPost(postId, savedPostsContainer, 'saved'));

    document.addEventListener('click', function(event) {
        const target = event.target;
        if (target.classList.contains('like-button')) {
            const postId = target.getAttribute('data-post-id');
            if (savedPosts.includes(postId)) deletePost(postId, 'saved');
            likePost(postId);
        }
    });

    function likePost(postId) {
        likedPosts.push(postId);
        localStorage.setItem('likedPosts', JSON.stringify(likedPosts));
    }

    function deletePost(postId, type) {
        const container = type === 'liked' ? likedPostsContainer : savedPostsContainer;
        const posts = type === 'liked' ? likedPosts : savedPosts;
        const index = posts.indexOf(postId);
        if (index !== -1) {
            posts.splice(index, 1);
            localStorage.setItem(type === 'liked' ? 'likedPosts' : 'savedPosts', JSON.stringify(posts));
            const postElement = container.querySelector(`.post[data-post-id="${postId}"]`);
            if (postElement) postElement.remove();
        }
    }

    function fetchPost(postId, container, type) {
        fetch(`https://65ca5a7b3b05d29307e03692.mockapi.io/posts/${postId}`)
            .then(response => response.json())
            .then(post => container.appendChild(createPostElement(post, type)))
            .catch(error => console.error('There was a problem fetching the post:', error));
    }

    function createPostElement(post, type) {
        const postElement = document.createElement('div');
        postElement.classList.add('post');
        postElement.setAttribute('data-post-id', post.id);

        const postPhoto = document.createElement('img');
        postPhoto.src = post.postphoto;
        postElement.appendChild(postPhoto);

        const profilePhoto = document.createElement('img');
        profilePhoto.src = `https://i.pravatar.cc/50?u=${post.profilephoto}`;
        postElement.appendChild(profilePhoto);

        const nameElement = document.createElement('p');
        nameElement.textContent = post.name;
        postElement.appendChild(nameElement);

        const captionElement = document.createElement('p');
        captionElement.textContent = post.caption;
        postElement.appendChild(captionElement);

        const likeButton = document.createElement('button');
        likeButton.innerHTML = '<i class="fas fa-heart"></i> Beğen';
        likeButton.classList.add('like-button');
        likeButton.setAttribute('data-post-id', post.id);
        postElement.appendChild(likeButton);

        if (type === 'liked') {
            const deleteButton = document.createElement('button');
            deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
            deleteButton.classList.add('delete-button');
            deleteButton.onclick = () => deletePost(post.id, 'liked');
            postElement.appendChild(deleteButton);
        }

        return postElement;
    }
});
