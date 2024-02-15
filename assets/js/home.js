function fetchPosts() {
    axios.get('https://65ca5a7b3b05d29307e03692.mockapi.io/posts')
      .then(response => {
        const data = response.data;
        const postsContainer = document.getElementById('posts');
        data.forEach(post => {
          const postElement = document.createElement('div');
          postElement.classList.add('post');
          postElement.setAttribute('data-post-id', post.id);

          // Avatarı içeren div
          postElement.innerHTML = `
            <div class="avatar-container">
              <img src="https://i.pravatar.cc/50?u=${post.profilePhoto}" alt="Avatar">
              <p>${post.name}</p>
            </div>
            <img src="${post.postphoto}" alt="Post Photo">
            <p>${post.caption}</p>
            <div class="buttonDiv">
            <button class="like-button" onclick="likePost(${post.id})"><i class="fa-regular fa-heart"></i></button>
            <button class="save-button" onclick="savePost(${post.id})"><i class="far fa-bookmark"></i> </button>
            <button class="comment-button" onclick="toggleCommentInput(${post.id})"><i class="far fa-comment"></i> </button>
            <input class="comment-input" type="text" placeholder="Yorumunuzu buraya girin...">
            <button class="send-comment-button" onclick="sendComment(${post.id})">Gönder</button>
           
            </div>
             <div class="comment-area"></div>
          `;

          postsContainer.appendChild(postElement);
        });
      })
      .catch(error => {
        console.error('There was a problem fetching the posts:', error);
      });
}

function toggleCommentInput(postId) {
    const commentInput = document.querySelector(`.post[data-post-id="${postId}"] .comment-input`);
    commentInput.style.display = 'block'; // Input alanını görünür hale getir

    const sendCommentButton = document.querySelector(`.post[data-post-id="${postId}"] .send-comment-button`);
    sendCommentButton.style.display = 'inline-block'; // Gönder butonunu görünür hale getir
}

function sendComment(postId) {
    const commentInput = document.querySelector(`.post[data-post-id="${postId}"] .comment-input`);
    const commentText = commentInput.value.trim();
    if (commentText) {
        const commentArea = document.querySelector(`.post[data-post-id="${postId}"] .comment-area`);
        const commentElement = document.createElement('div');
        commentElement.classList.add('comment');
        commentElement.textContent = commentText;
        commentArea.appendChild(commentElement);
        commentInput.value = '';

        // Yorumu lokal depolamada saklayalım
        const storedComments = JSON.parse(localStorage.getItem(`post_${postId}_comments`)) || [];
        storedComments.push(commentText);
        localStorage.setItem(`post_${postId}_comments`, JSON.stringify(storedComments));
    }
}

function likePost(postId) {
    const likeButton = document.querySelector(`.post[data-post-id="${postId}"] .like-button`);
    likeButton.classList.add('liked');

    const likedPosts = JSON.parse(localStorage.getItem('likedPosts')) || [];
    likedPosts.push(postId);
    localStorage.setItem('likedPosts', JSON.stringify(likedPosts));
}

function savePost(postId) {
    const saveButton = document.querySelector(`.post[data-post-id="${postId}"] .save-button`);
    saveButton.classList.add('saved');

    const savedPosts = JSON.parse(localStorage.getItem('savedPosts')) || [];
    savedPosts.push(postId);
    localStorage.setItem('savedPosts', JSON.stringify(savedPosts));
}

fetchPosts();


// let postList = document.getElementById("postlist");


// async function getApi(){
   
//     let res = await axios.get(`https://65ca5a7b3b05d29307e03692.mockapi.io/posts`)
//     db = res.data
//     db.forEach((item) => {
//         let div = document.createElement("div");
//         div.className="post"
//         div.innerHTML= `
//         <div class="post">
//           <div class="user">
//             <img src="${post.profilphoto}" alt="Profil Photo">
//             <p>${post.name}</p>
//           </div>
//           <img src="${post.postphoto}" alt="Post Photo">
//           <div class="actions">
//             <button onclick="addToLikedPosts(${post.id})"><i class="fa-regular fa-heart"></i></button>
//             <button onclick="savePost(${post.id})"><i class="fa-regular fa-bookmark"></i></button>
//             <button onclick="toggleComments(${post.id})"><i class="fa-regular fa-comment"></i></button>
//           </div>
//           <p>${post.caption || ''}</p>
//         </div>
//       `; 
//         postList.appendChild(div)
//     })
// }
// getApi()
// function addtoLikedPosts(index){
// let post = JSON.parse(localStorage.getItem('post')) || [];
// post.push(db.find((item) => item.id == index));
// localStorage.setItem("post", JSON.stringify(post))
// console.log(post);
// }




// // Axios ile API'den veri almak
// axios.get('https://65ca5a7b3b05d29307e03692.mockapi.io/posts')
//   .then(response => {
//     const posts = response.data;
//     const postList = document.getElementById('postList');

//     posts.forEach(post => {
//       // Her bir post için div oluştur
//       const postDiv = document.createElement('div');
//       postDiv.classList.add('post');

//       // Profil fotoğrafı
      
//       const profileImg = document.createElement('img');
//       profileImg.src = post.profilphoto || ''; // Profil fotoğrafı yoksa boş bir string kullan
//       postDiv.appendChild(profileImg);

//       // Gönderi fotoğrafı
//       const postImg = document.createElement('img');
//       postImg.src = post.postphoto || ''; // Gönderi fotoğrafı yoksa boş bir string kullan
//       postDiv.appendChild(postImg);

//       // Başlık
//       const namePara = document.createElement('p');
//       namePara.textContent = post.name || ''; // Başlık yoksa boş bir string kullan
//       postDiv.appendChild(namePara);

//       // Gönderi açıklaması
//       const captionPara = document.createElement('p');
//       captionPara.textContent = post.caption || ''; // Gönderi açıklaması yoksa boş bir string kullan
//       postDiv.appendChild(captionPara);

//       // Yorumlar
//       const commentPara = document.createElement('p');
//       commentPara.textContent = `Yorum: ${post.comment || ''}`; // Yorum yoksa boş bir string kullan
//       postDiv.appendChild(commentPara);

//       // Eylemler (Like, Save, Comment)
//       const actionsDiv = document.createElement('div');
//       actionsDiv.classList.add('actions');

//       // Like butonu ve işlevi
//       const likeBtn = document.createElement('button');
//       likeBtn.textContent = 'Like';
//       likeBtn.addEventListener('click', () => {
//         addToLikedPosts(post);
//       });
//       actionsDiv.appendChild(likeBtn);

//       const saveBtn = document.createElement('button');
//       saveBtn.textContent = 'Save';
//       actionsDiv.appendChild(saveBtn);

//       const commentBtn = document.createElement('button');
//       commentBtn.textContent = 'Comment';
//       actionsDiv.appendChild(commentBtn);

//       postDiv.appendChild(actionsDiv);

//       // Post listesine ekle
//       postList.appendChild(postDiv);
//     });
//   })
//   .catch(error => {
//     console.error('Error fetching data:', error);
//   });

// // Beğenilen gönderileri tutmak için dizi
// const likedPosts = [];

// // Beğenilen gönderiyi ekleyen işlev
// function addToLikedPosts(post) {
//   // Beğenilen gönderi daha önce eklenmemişse
//   if (!likedPosts.some(p => p.id === post.id)) {
//     likedPosts.push(post);
//     console.log('Liked posts:', likedPosts);
//     // Beğenilen gönderileri yerel depolamada sakla
//     saveLikedPosts(likedPosts);
//     // Burada beğenilen gönderiyi başka bir yerde kullanabilirsiniz, örneğin bir bildirim gösterebilirsiniz.
//   }
// }

// // Beğenilen gönderileri yerel depolamada saklamak için anahtar
// const likedPostsKey = 'likedPosts';

// // Beğenilen gönderileri yerel depolamadan yükleme işlevi
// function loadLikedPosts() {
//   const likedPosts = localStorage.getItem(likedPostsKey);
//   return likedPosts ? JSON.parse(likedPosts) : [];
// }

// // Beğenilen gönderileri yerel depolamaya kaydetme işlevi
// function saveLikedPosts(likedPosts) {
//   localStorage.setItem(likedPostsKey, JSON.stringify(likedPosts));}

// // // Axios ile API'den veri almak
// axios.get('https://65ca5a7b3b05d29307e03692.mockapi.io/posts')
//   .then(response => {
//     const posts = response.data;
//     const postList = document.getElementById('postList');

//     posts.forEach(post => {
//       // Her bir post için div oluştur
//       const postDiv = document.createElement('div');
//       postDiv.classList.add('post');

//       // Profil fotoğrafı
//       if (post.profilphoto) {
//         const profileImg = document.createElement('img');
//         profileImg.src = post.profilphoto;
//         postDiv.appendChild(profileImg);
//       }

//       // Gönderi fotoğrafı
//       if (post.postphoto) {
//         const postImg = document.createElement('img');
//         postImg.src = post.postphoto;
//         postDiv.appendChild(postImg);
//       }

//       // Başlık
//       if (post.name) {
//         const namePara = document.createElement('p');
//         namePara.textContent = post.name;
//         postDiv.appendChild(namePara);
//       }

//       // Gönderi açıklaması
//       if (post.caption) {
//         const captionPara = document.createElement('p');
//         captionPara.textContent = post.caption;
//         postDiv.appendChild(captionPara);
//       }

//       // Yorumlar
//       if (post.comment) {
//         const commentPara = document.createElement('p');
//         commentPara.textContent = `Yorum: ${post.comment}`;
//         postDiv.appendChild(commentPara);
//       }

//       // Eylemler (Like, Save, Comment)
//       const actionsDiv = document.createElement('div');
//       actionsDiv.classList.add('actions');

//       const likeBtn = document.createElement('button');
//       likeBtn.textContent = 'Like';
//       actionsDiv.appendChild(likeBtn);

//       const saveBtn = document.createElement('button');
//       saveBtn.textContent = 'Save';
//       actionsDiv.appendChild(saveBtn);

//       const commentBtn = document.createElement('button');
//       commentBtn.textContent = 'Comment';
//       actionsDiv.appendChild(commentBtn);

//       postDiv.appendChild(actionsDiv);

//       // Post listesine ekle
//       postList.appendChild(postDiv);
//     });
//   })
//   .catch(error => {
//     console.error('Error fetching data:', error);
//   });























// window.addEventListener('load', showHomePage);



  
  


// function fetchPosts() {
//     return fetch('https://jsonplaceholder.typicode.com/posts')
//         .then(response => response.json());
// }

 function fetchUser(userId) {
    return fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
        .then(response => response.json());
 }

// function fetchComments(postId) {
//     return fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
//         .then(response => response.json());
// }

// function createPostList(posts) {
//     const postListElement = document.getElementById('postList');
//     postListElement.innerHTML = '';

//     posts.forEach(post => {
//         fetchUser(post.userId)
//             .then(user => {
//                 fetch('https://source.unsplash.com/800x600/?nature') // Unsplash API'den resim al
//                     .then(response => {
//                         const postElement = document.createElement('div');
//                         postElement.className = 'post';
//                         postElement.innerHTML = `
//                             <img src="${response.url}" alt="Post Image">
//                              <div class="actions">
//                                 <button onclick="likePost(${post.id})"><i class="fa-regular fa-heart"></i></button>
//                                 <button onclick="savePost(${post.id})"><i class="fa-regular fa-bookmark"></i></button>
//                                 <button onclick="toggleComments(${post.id})"><i class="fa-regular fa-comment"></i></button>
//                             </div>
//                             <div class="user-info">
//                             <img src="https://i.pravatar.cc/50?u=${user.id}" alt="${user.username} Avatar">
//                                 <span>${user.name}</span>
//                             </div>
                           
//                             <h4>${post.title}</h4>
//                             <p>${post.body}</p>
//                             <div class="comments hidden" id="comments-${post.id}">
//                                 <input type="text" placeholder="Yorumunuzu buraya yazın..." id="commentInput-${post.id}">
//                                 <button onclick="commentPost(${post.id})">Yorum Yap</button>
//                                 <div class="comments-list" id="commentsList-${post.id}"></div>
//                             </div>
//                         `;
//                         postListElement.appendChild(postElement);
                      

//                         fetchComments(post.id)
//                             .then(comments => {
//                                 createCommentList(comments, post.id);
//                             })
//                             .catch(error => console.error('Error fetching comments:', error));
//                     })
//                     .catch(error => console.error('Error fetching image:', error));
//             })
//             .catch(error => console.error('Error fetching user:', error));
//     });
// }

// function toggleComments(postId) {
//     const commentsSection = document.getElementById(`comments-${postId}`);
//     commentsSection.classList.toggle('hidden');
// }

// function createCommentList(comments, postId) {
//     const commentsListElement = document.getElementById(`commentsList-${postId}`);
//     commentsListElement.innerHTML = '';

//     comments.forEach(comment => {
//         const commentElement = document.createElement('div');
//         commentElement.className = 'comment';
//         commentElement.innerHTML = `
//             <p><strong>${comment.name}</strong>: ${comment.body}</p>
//             <button onclick="replyToComment(${comment.id}, ${postId})">Yanıtla</button>
//             <div class="replies" id="replies-${comment.id}"></div>
//             <div class="reply-form hidden" id="replyForm-${comment.id}">
//                 <input type="text" placeholder="Yanıtınızı buraya yazın..." id="replyInput-${comment.id}">
//                 <button onclick="postReply(${comment.id}, ${postId})">Gönder</button>
//             </div>
//         `;
//         commentsListElement.appendChild(commentElement);

//         fetchReplies(comment.id, postId)
//             .then(replies => createReplyList(replies, comment.id))
//             .catch(error => console.error('Error fetching replies:', error));
//     });
// }

// function fetchReplies(commentId, postId) {
//     return fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments/${commentId}/replies`)
//         .then(response => response.json());
// }

// function createReplyList(replies, commentId) {
//     const repliesListElement = document.getElementById(`replies-${commentId}`);
//     repliesListElement.innerHTML = '';

//     replies.forEach(reply => {
//         const replyElement = document.createElement('div');
//         replyElement.className = 'reply';
//         replyElement.innerHTML = `
//             <p><strong>${reply.name}</strong>: ${reply.body}</p>
//         `;
//         repliesListElement.appendChild(replyElement);
//     });
// }

// function commentPost(postId) {
//     const commentInput = document.getElementById(`commentInput-${postId}`);
//     const comment = commentInput.value.trim();
//     if (comment) {
//         const commentElement = document.createElement('div');
//         commentElement.className = 'comment';
//         commentElement.innerHTML = `
//             <p><strong>Sizin Yorumunuz:</strong> ${comment}</p>
//             <button onclick="replyToComment(null, ${postId})">Yanıtla</button>
//             <div class="replies" id="replies-0"></div>
//             <div class="reply-form hidden" id="replyForm-0">
//                 <input type="text" placeholder="Yanıtınızı buraya yazın..." id="replyInput-0">
//                 <button onclick="postReply(null, ${postId})">Gönder</button>
//             </div>
//         `;
//         const commentsListElement = document.getElementById(`commentsList-${postId}`);
//         commentsListElement.appendChild(commentElement);
//         commentInput.value = '';
//     }
// }

// function replyToComment(commentId, postId) {
//     const replyForm = document.getElementById(`replyForm-${commentId}`);
//     replyForm.classList.toggle('hidden');
// }

// function postReply(commentId, postId) {
//     const replyInput = document.getElementById(`replyInput-${commentId}`);
//     const reply = replyInput.value.trim();
//     if (reply) {
//         const replyElement = document.createElement('div');
//         replyElement.className = 'reply';
//         replyElement.innerHTML = `
//             <p><strong>Yanıtınız:</strong> ${reply}</p>
//         `;
//         const repliesListElement = document.getElementById(`replies-${commentId}`);
//         repliesListElement.appendChild(replyElement);
//         replyInput.value = '';
//     }
// }

// function showHomePage() {
//     fetchPosts()
//         .then(posts => createPostList(posts))
//         .catch(error => console.error('Error fetching posts:', error));
// }

// window.addEventListener('load', showHomePage);





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

// function fetchProfileDetails(profileId) {
//     // JSONPlaceholder API'den kullanıcı bilgilerini al
//     return fetch(`https://jsonplaceholder.typicode.com/users/${profileId}`)
//         .then(response => response.json());
// }

// function showProfileDetails(profileId) {
//     fetchProfileDetails(profileId)
//         .then(profile => {
//             const contentElement = document.querySelector('.content');
//             contentElement.innerHTML = `
//                 <h2>${profile.name}</h2>
//                 <p>Username: ${profile.username}</p>
//                 <p>Email: ${profile.email}</p>
//                 <p>Phone: ${profile.phone}</p>
//                 <p>Website: ${profile.website}</p>
//             `;
//         })
//         .catch(error => console.error('Error fetching profile details:', error));
// }

// function showHomePage() {
//     fetchPosts()
//         .then(posts => createPostList(posts))
//         .catch(error => console.error('Error fetching posts:', error));

    fetchFollowedProfiles()
        .then(profiles => createFollowedProfilesList(profiles))
        .catch(error => console.error('Error fetching followed profiles:', error));

 // JavaScript (scripts/script.js)

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

// function fetchProfileDetails(profileId) {
//     return fetch(`https://jsonplaceholder.typicode.com/users/${profileId}`)
//         .then(response => response.json());
// }

// function showProfileDetails(profileId) {
//     fetchProfileDetails(profileId)
//         .then(profile => {
//             // Aktif profili güncelle
//             activeProfileId = profile.id;

//             const contentElement = document.querySelector('.content');
//             contentElement.innerHTML = `
//                 <h2>${profile.name}</h2>
//                 <p>Username: ${profile.username}</p>
//                 <p>Email: ${profile.email}</p>
//                 <p>Phone: ${profile.phone}</p>
//                 <p>Website: ${profile.website}</p>
                
//                 <button onclick="likeProfile()">Beğen</button>
//                 <button onclick="saveProfile()">Kaydet</button>
//             `;
//         })
//         .catch(error => console.error('Error fetching profile details:', error));
// }

// function likeProfile() {

//     console.log(`Profil ID ${activeProfileId} beğenildi.`);
// }

// function saveProfile() {

//     console.log(`Profil ID ${activeProfileId} kaydedildi.`);
// }

// function showHomePage() {
//     fetchPosts()
//         .then(posts => createPostList(posts))
//         .catch(error => console.error('Error fetching posts:', error));

//     fetchFollowedProfiles()
//         .then(profiles => createFollowedProfilesList(profiles))
//         .catch(error => console.error('Error fetching followed profiles:', error));
// }


