
function openEditModal() {
    document.getElementById('edit-modal').style.display = 'block';
  }
  
  function closeEditModal() {
    document.getElementById('edit-modal').style.display = 'none';
  }
  
 
var userProfile = {
    username: '',
    bio: '',
    profilePicture: ''
};

var userPosts = [];




function addNewPost() {
    var imageInput = document.getElementById('post-image-input');
    var title = document.getElementById('post-title').value;

    if (imageInput.files.length > 0) {
        var reader = new FileReader();

        reader.onload = function (e) {
            var imageUrl = e.target.result;

            var newPost = {
                imageUrl: imageUrl,
                title: title,
                likes: 0,
                saves: 0,
                comments: []
            };

            userPosts.push(newPost);
            renderUserPosts();
            hideCreatePostForm();

            saveToLocalStorage();
        };

        reader.readAsDataURL(imageInput.files[0]);
    } else {
        alert("Lütfen bir resim dosyası seçin.");
    }
}

function deletePost(index) {
    userPosts.splice(index, 1);
    renderUserPosts();
    saveToLocalStorage();
}

function likePost(index) {
    userPosts[index].likes++;
    renderUserPosts();
    saveToLocalStorage();
}

function savePost(index) {
    userPosts[index].saves++;
    renderUserPosts();
    saveToLocalStorage();
}

function commentOnPost(index, comment) {
    userPosts[index].comments.push(comment);
    renderUserPosts();
    saveToLocalStorage();
}

function renderUserPosts() {
    var postContainer = document.getElementById('posts-container');

    postContainer.innerHTML = '';

    userPosts.forEach(function (post, index) {
        var postElement = document.createElement('div');
        postElement.className = 'post';

        var postImage = document.createElement('img');
        postImage.src = post.imageUrl;
        postImage.alt = 'User Post Image';

        var postTitle = document.createElement('p');
        postTitle.className = 'post-title';
        postTitle.textContent = post.title;

        var postActions = document.createElement('div');
        postActions.className = 'post-actions';

        var likeButton = document.createElement('button');
        likeButton.textContent = 'Like (' + post.likes + ')';
        likeButton.onclick = function () {
            likePost(index);
        };

        var saveButton = document.createElement('button');
        saveButton.textContent = 'Save (' + post.saves + ')';
        saveButton.onclick = function () {
            savePost(index);
        };

        var commentButton = document.createElement('button');
        commentButton.textContent = 'Comment';
        commentButton.onclick = function () {
            var comment = prompt('Yorumunuzu girin:');
            commentOnPost(index, comment);
        };

        var deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = function () {
            deletePost(index);
        };

        postActions.appendChild(likeButton);
        postActions.appendChild(saveButton);
        postActions.appendChild(commentButton);
        postActions.appendChild(deleteButton);

        postElement.appendChild(postImage);
        postElement.appendChild(postTitle);
        postElement.appendChild(postActions);

        postContainer.appendChild(postElement);
    });
}


function showCreatePostForm() {
    var createPostForm = document.getElementById('create-post-form');
    createPostForm.style.display = 'block';
}

function hideCreatePostForm() {
    var createPostForm = document.getElementById('create-post-form');
    createPostForm.style.display = 'none';

    document.getElementById('post-image-input').value = '';
    document.getElementById('post-title').value = '';
}

function saveToLocalStorage() {
    localStorage.setItem('userPosts', JSON.stringify(userPosts));
}

function loadFromLocalStorage() {
    var storedPosts = localStorage.getItem('userPosts');
    var storedProfile = localStorage.getItem('userProfile');

    if (storedPosts) {
        userPosts = JSON.parse(storedPosts);
        renderUserPosts();
    }

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
function loadUserProfile() {
    var storedProfile = localStorage.getItem('userProfile');

    if (storedProfile) {
        userProfile = JSON.parse(storedProfile);
        renderUserProfile();
    }
}

// Profil bilgilerini kaydetmek için
function saveUserProfile() {
    localStorage.setItem('userProfile', JSON.stringify(userProfile));
}

loadUserProfile();

document.addEventListener('DOMContentLoaded', function () {
    loadFromLocalStorage();
});