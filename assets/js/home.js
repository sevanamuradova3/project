// JavaScript (scripts/script.js)
window.addEventListener('load', showHomePage);



              



function fetchPosts() {
    return fetch('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.json());
}

function fetchUser(userId) {
    return fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
        .then(response => response.json());
}

function fetchComments(postId) {
    return fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
        .then(response => response.json());
}

function createPostList(posts) {
    const postListElement = document.getElementById('postList');
    postListElement.innerHTML = '';

    posts.forEach(post => {
        fetchUser(post.userId)
            .then(user => {
                fetch('https://source.unsplash.com/800x600/?nature') // Unsplash API'den resim al
                    .then(response => {
                        const postElement = document.createElement('div');
                        postElement.className = 'post';
                        postElement.innerHTML = `
                            <img src="${response.url}" alt="Post Image">
                             <div class="actions">
                                <button onclick="likePost(${post.id})"><i class="fa-regular fa-heart"></i></button>
                                <button onclick="savePost(${post.id})"><i class="fa-regular fa-bookmark"></i></button>
                                <button onclick="toggleComments(${post.id})"><i class="fa-regular fa-comment"></i></button>
                            </div>
                            <div class="user-info">
                            <img src="https://i.pravatar.cc/50?u=${user.id}" alt="${user.username} Avatar">
                                <span>${user.name}</span>
                            </div>
                           
                            <h4>${post.title}</h4>
                            <p>${post.body}</p>
                            <div class="comments hidden" id="comments-${post.id}">
                                <input type="text" placeholder="Yorumunuzu buraya yazın..." id="commentInput-${post.id}">
                                <button onclick="commentPost(${post.id})">Yorum Yap</button>
                                <div class="comments-list" id="commentsList-${post.id}"></div>
                            </div>
                        `;
                        postListElement.appendChild(postElement);

                        fetchComments(post.id)
                            .then(comments => {
                                createCommentList(comments, post.id);
                            })
                            .catch(error => console.error('Error fetching comments:', error));
                    })
                    .catch(error => console.error('Error fetching image:', error));
            })
            .catch(error => console.error('Error fetching user:', error));
    });
}

function toggleComments(postId) {
    const commentsSection = document.getElementById(`comments-${postId}`);
    commentsSection.classList.toggle('hidden');
}

function createCommentList(comments, postId) {
    const commentsListElement = document.getElementById(`commentsList-${postId}`);
    commentsListElement.innerHTML = '';

    comments.forEach(comment => {
        const commentElement = document.createElement('div');
        commentElement.className = 'comment';
        commentElement.innerHTML = `
            <p><strong>${comment.name}</strong>: ${comment.body}</p>
            <button onclick="replyToComment(${comment.id}, ${postId})">Yanıtla</button>
            <div class="replies" id="replies-${comment.id}"></div>
            <div class="reply-form hidden" id="replyForm-${comment.id}">
                <input type="text" placeholder="Yanıtınızı buraya yazın..." id="replyInput-${comment.id}">
                <button onclick="postReply(${comment.id}, ${postId})">Gönder</button>
            </div>
        `;
        commentsListElement.appendChild(commentElement);

        fetchReplies(comment.id, postId)
            .then(replies => createReplyList(replies, comment.id))
            .catch(error => console.error('Error fetching replies:', error));
    });
}

function fetchReplies(commentId, postId) {
    return fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments/${commentId}/replies`)
        .then(response => response.json());
}

function createReplyList(replies, commentId) {
    const repliesListElement = document.getElementById(`replies-${commentId}`);
    repliesListElement.innerHTML = '';

    replies.forEach(reply => {
        const replyElement = document.createElement('div');
        replyElement.className = 'reply';
        replyElement.innerHTML = `
            <p><strong>${reply.name}</strong>: ${reply.body}</p>
        `;
        repliesListElement.appendChild(replyElement);
    });
}

function commentPost(postId) {
    const commentInput = document.getElementById(`commentInput-${postId}`);
    const comment = commentInput.value.trim();
    if (comment) {
        const commentElement = document.createElement('div');
        commentElement.className = 'comment';
        commentElement.innerHTML = `
            <p><strong>Sizin Yorumunuz:</strong> ${comment}</p>
            <button onclick="replyToComment(null, ${postId})">Yanıtla</button>
            <div class="replies" id="replies-0"></div>
            <div class="reply-form hidden" id="replyForm-0">
                <input type="text" placeholder="Yanıtınızı buraya yazın..." id="replyInput-0">
                <button onclick="postReply(null, ${postId})">Gönder</button>
            </div>
        `;
        const commentsListElement = document.getElementById(`commentsList-${postId}`);
        commentsListElement.appendChild(commentElement);
        commentInput.value = '';
    }
}

function replyToComment(commentId, postId) {
    const replyForm = document.getElementById(`replyForm-${commentId}`);
    replyForm.classList.toggle('hidden');
}

function postReply(commentId, postId) {
    const replyInput = document.getElementById(`replyInput-${commentId}`);
    const reply = replyInput.value.trim();
    if (reply) {
        const replyElement = document.createElement('div');
        replyElement.className = 'reply';
        replyElement.innerHTML = `
            <p><strong>Yanıtınız:</strong> ${reply}</p>
        `;
        const repliesListElement = document.getElementById(`replies-${commentId}`);
        repliesListElement.appendChild(replyElement);
        replyInput.value = '';
    }
}

function showHomePage() {
    fetchPosts()
        .then(posts => createPostList(posts))
        .catch(error => console.error('Error fetching posts:', error));
}

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


