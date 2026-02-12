// ✅ Fix: Global scope check taaki 'already declared' error na aaye
if (typeof window.API_BASE === 'undefined') {
    window.API_BASE = "https://medconnect.cloud/api";
}

// ================= SIGNUP =================
const signupForm = document.getElementById("signupForm");

if (signupForm) {
    signupForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const name = signupForm.querySelector('input[type="text"]').value;
        const email = signupForm.querySelector('input[type="email"]').value;
        const specialization = signupForm.querySelectorAll('input[type="text"]')[1].value;
        const password = signupForm.querySelector('input[type="password"]').value;

        try {
            // ✅ Fix: window.API_BASE use kiya hai
            const res = await fetch(`${window.API_BASE}/signup`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, specialization, password }),
            });

            const data = await res.json();
            alert(data.message);

            if (res.ok) {
                signupForm.reset();
            }
        } catch (err) {
            console.error("Signup Error:", err);
            alert("Signup failed ❌ Check console for details.");
        }
    });
}


// ================= LOGIN =================
const loginForm = document.getElementById("loginForm");
const loginError = document.getElementById("loginError");

if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        if (loginError) loginError.classList.add("d-none");

        const email = loginForm.querySelector('input[type="email"]').value;
        const password = loginForm.querySelector('input[type="password"]').value;

        try {
            // ✅ Fix: window.API_BASE use kiya hai
            const res = await fetch(`${window.API_BASE}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                if (res.status === 403) {
                    window.location.href = "pending.html";
                    return;
                }

                if (loginError) {
                    loginError.textContent = data.message || "Login failed";
                    loginError.classList.remove("d-none");
                }
                return;
            }

            // ✅ Success
            localStorage.setItem("token", data.token);
            window.location.href = "dashboard.html";

        } catch (err) {
            console.error("Login Error:", err);
            if (loginError) {
                loginError.textContent = "Server error. Check if backend is running!";
                loginError.classList.remove("d-none");
            }
        }
    });
}
// ===== SHOW / HIDE PASSWORD =====
const toggle = document.getElementById("togglePassword");
const password = document.getElementById("password");

if (toggle && password) {
  toggle.addEventListener("click", () => {
    const type =
      password.getAttribute("type") === "password" ? "text" : "password";
    password.setAttribute("type", type);
  });
}


