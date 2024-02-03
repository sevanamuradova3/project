// ihobby.js dosyası
function validateLogin() {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
  
    // Email kontrolü: Email, "@" içermeli
    if (!email.includes('@')) {
      alert("Please enter a valid email address or telephone number.");
      return;
    }
  
    // Şifre kontrolü: Şifre en az bir rakam içermeli ve en az 6 karakter uzunluğunda olmalı
    if (!/\d/.test(password) || password.length < 6) {
      alert("Password should be at least 6 characters long and contain at least one digit.");
      return;
    }
  
    // Giriş başarılı ise
    alert("Login successful!");
    // Giriş başarılı ise başka bir sayfaya yönlendirme veya başka bir işlem yapabilirsiniz.
  }
  
  // Butona hover olduğunda sartları gösteren fonksiyon
  function showConditionsOnHover() {
    // Buraya butona hover olduğunda gösterilecek şartları ekleyebilirsiniz.
    // Örneğin, alert("Conditions: ...");
  }
  
  // Buton elementini seçme
  var loginButton = document.getElementById("loginButton");
  
  // Butonun üzerine gelindiğinde showConditionsOnHover fonksiyonunu çalıştırma
  loginButton.addEventListener("mouseover", showConditionsOnHover);
  