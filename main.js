// تولید کد امنیتی تصادفی
function generateCaptcha() {
    const captchaText = Math.floor(1000 + Math.random() * 9000); // تولید یک عدد ۴ رقمی
    document.getElementById("captchaText").textContent = captchaText;
     }
// ریفرش کد امنیتی
document.getElementById("refreshCaptcha").addEventListener("click", function() {
    generateCaptcha();  // تولید کد جدید
    document.getElementById("captchaInput").value = "";  // پاک کردن ورودی کد امنیتی
    document.getElementById("captchaError").textContent = "";  // پاک کردن پیام خطا
});

// اعتبارسنجی فرم هنگام ارسال
document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();  // جلوگیری از ارسال پیش‌فرض فرم
    
    // پاک کردن پیام‌های خطا
    clearErrors();
    
    // گرفتن مقادیر از فرم
    const studentId = document.getElementById("studentId").value;
    const password = document.getElementById("password").value;
    const captchaInput = document.getElementById("captchaInput").value;
    
    let isValid = true;
    
    // اعتبارسنجی شماره دانشجویی
    if (!studentId.match(/^\d{10}$/)) {
        document.getElementById("studentIdError").textContent = "شماره دانشجویی باید ۱۰ رقمی باشد";
        isValid = false;
    }
    
    // اعتبارسنجی کلمه عبور
    if (password.length < 6) {
        document.getElementById("passwordError").textContent = "کلمه عبور باید حداقل ۶ کاراکتر باشد";
        isValid = false;
    }
    
    // اعتبارسنجی کد امنیتی
    const captchaText = document.getElementById("captchaText").textContent;
    if (captchaInput !== captchaText) {
        document.getElementById("captchaError").textContent = "کد امنیتی اشتباه است";
        isValid = false;
    }
    
    // اگر همه چیز درست بود، فرآیند ورود را شروع کن
    if (isValid) {
        document.getElementById("loadingSpinner").style.display = "inline-block";  // نمایش اسپینر بارگذاری
        document.getElementById("loginBtn").disabled = true;  // غیرفعال کردن دکمه ورود
        
        // شبیه‌سازی ارسال اطلاعات به سرور (برای تست)
        setTimeout(function() {
            alert("ورود موفقیت‌آمیز!");
            document.getElementById("loadingSpinner").style.display = "none";  // مخفی کردن اسپینر بارگذاری
            document.getElementById("loginBtn").disabled = false;  // فعال کردن دوباره دکمه
            // در اینجا باید فرآیند واقعی ارسال اطلاعات به سرور صورت گیرد
        }, 2000);  // شبیه‌سازی زمان بارگذاری
    }
});

// پاک کردن پیام‌های خطا
function clearErrors() {
    document.getElementById("studentIdError").textContent = "";
    document.getElementById("passwordError").textContent = "";
    document.getElementById("captchaError").textContent = "";
}

// تولید کد امنیتی هنگام بارگذاری صفحه
window.onload = function() {
    generateCaptcha();  // تولید کد امنیتی
    
};