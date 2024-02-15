// Mesajları ve botun mesajlarını yerel depolama kullanarak saklamak için bir anahtar belirliyoruz
const STORAGE_KEY = "chat_messages";

// Mesajları ve botun mesajlarını yerel depodan yükleme
var messages = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

function sendMessage() {
    var messageInput = document.getElementById("message-input");
    var message = messageInput.value;

    if (message.trim() === "") {
        return;
    }

    // Yeni bir mesaj nesnesi oluşturuyoruz
    var newMessage = {
        id: generateId(), // Her mesaj için bir ID oluşturuyoruz
        text: message,
        sender: "user",
        liked: false // Başlangıçta beğenilmemiş olarak ayarlanır
    };

    // Yeni mesajı mesajlar dizisine ekliyoruz
    messages.push(newMessage);

    // Eklenen mesajı göstermek için fonksiyonu çağırıyoruz
    displayMessage(newMessage);

    // Mesaj gönderildikten sonra input alanını temizliyoruz
    messageInput.value = "";

    // Mesajları yerel depoya kaydediyoruz
    saveMessagesToLocalStorage();

    // Botun cevap vermesi için 1 saniye sonra bir zamanlayıcı kuruyoruz
    setTimeout(sendBotReply, 1000);
}

function sendBotReply() {
    var botMessage = {
       
        id: generateId(),
        text: "Merhaba! Ben bir botum",
        sender: "bot",
        liked: false // Bot mesajı da başlangıçta beğenilmemiş olarak ayarlanır
    };

    // Bot mesajını göstermek için displayMessage fonksiyonunu kullanıyoruz
    displayMessage(botMessage);

    // Bot mesajını mesajlar dizisine ekliyoruz
    messages.push(botMessage);

    // Mesajları yerel depoya kaydediyoruz
    saveMessagesToLocalStorage();
}

function displayMessage(message) {
    var chatBox = document.getElementById("chat-box");
    var messageElement = document.createElement("div");
    messageElement.dataset.id = message.id; // Mesajın ID'sini veri özelliği olarak ayarlıyoruz
    messageElement.innerText = message.text;
    messageElement.classList.add("message");
    messageElement.classList.add(message.sender);

    // Kalp emojiyi oluşturuyoruz
    var heartEmoji = document.createElement("span");
    heartEmoji.innerHTML = "&#x2764;&#xFE0F;";
    heartEmoji.classList.add("heart-emoji");
    if (message.liked) {
        heartEmoji.style.display = "inline"; // Mesaj beğenilmişse emojiyi göster
    } else {
        heartEmoji.style.display = "none"; // Mesaj beğenilmemişse emojiyi gizle
    }

    // Mesaja tıklandığında kalp emojiyi gösterme ve gizleme işlemini gerçekleştirir
    messageElement.addEventListener("click", function() {
        toggleLike(message, heartEmoji);
    });

    // Sil ikonunu oluşturuyoruz
    var deleteIcon = document.createElement("i");
    deleteIcon.classList.add("fa", "fa-trash", "delete-icon");
    deleteIcon.addEventListener("click", function(event) {
        event.stopPropagation(); // Mesajın tıklama olayını durdur
        deleteMessage(messageElement, message.id); // Mesajın ID'sini gönderiyoruz
    });

    // Mesajın üzerine gelindiğinde sil ikonunu gösterme ve gizleme işlemini gerçekleştirir
    messageElement.addEventListener("mouseenter", function() {
        deleteIcon.style.display = "inline";
    });

    messageElement.addEventListener("mouseleave", function() {
        deleteIcon.style.display = "none";
    });

    // Mesajı ekliyoruz
    messageElement.appendChild(heartEmoji);
    messageElement.appendChild(deleteIcon);
    chatBox.appendChild(messageElement);

    // Otomatik olarak en altta kaydırma
    chatBox.scrollTop = chatBox.scrollHeight;
}

function toggleLike(message, heartEmoji) {
    if (!message.liked) {
        // Beğeni eklemek için
        message.liked = true;
        heartEmoji.style.display = "inline"; // Emojiyi göster
    } else {
        // Beğeniyi kaldırmak için
        message.liked = false;
        heartEmoji.style.display = "none"; // Emojiyi gizle
    }

    // Mesajları yerel depoya kaydediyoruz
    saveMessagesToLocalStorage();
}

function deleteMessage(messageElement, messageId) {
    // Mesajı yerel depodan ve ekrandan kaldır
    messages = messages.filter(function(message) {
        return message.id !== messageId;
    });
    messageElement.remove();
    // Mesajları güncellenmiş haliyle tekrar yerel depoya kaydet
    saveMessagesToLocalStorage();
}

// Bir mesajın benzersiz bir kimliğini oluşturan basit bir işlev
function generateId() {
    return Math.random().toString(36).substr(2, 9);
}

function saveMessagesToLocalStorage() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
}

// Sayfa yüklendiğinde mesajları gösterme
window.onload = function() {
    messages.forEach(function(message) {
        displayMessage(message);
    });
};
