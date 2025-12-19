document.addEventListener("DOMContentLoaded", () => {

  /* =====================
     CONFIG
  ===================== */
  const API_BASE = "https://crypto-pro-1.onrender.com";

  /* =====================
     STATE
  ===================== */
  let selectedPackage = "";
  let amount = 0;
  let userData = {};

  /* =====================
     ELEMENTS
  ===================== */
  const cards = document.querySelectorAll(".card");

  const step1 = document.getElementById("step1");
  const step2 = document.getElementById("step2");
  const step3 = document.getElementById("step3");

  const continueBtn = document.getElementById("toStep2");
  const form = document.getElementById("bookingForm");

  const backBtn = document.getElementById("backToStep2");
  const finalConfirmBtn = document.getElementById("finalConfirm");

  const bookingIdBox = document.querySelector(".booking-id");

  /* =====================
     PACKAGE SELECTION (STEP 1)
  ===================== */
  cards.forEach(card => {
    card.addEventListener("click", () => {
      cards.forEach(c => c.classList.remove("selected"));
      card.classList.add("selected");

      selectedPackage = card.dataset.package;
      amount = Number(card.dataset.amount);
    });
  });

  /* =====================
     GO TO STEP 2
  ===================== */
  continueBtn.addEventListener("click", () => {
    if (!selectedPackage || !amount) {
      alert("Please select a package first");
      return;
    }

    step1.classList.remove("active");
    step2.classList.add("active");
  });

  /* =====================
     FORM SUBMIT → STEP 3
  ===================== */
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();

    if (!name || !email || !phone) {
      alert("Please fill all details");
      return;
    }

    userData = { name, email, phone };

    document.getElementById("confirmPackage").innerText = selectedPackage;
    document.getElementById("confirmPrice").innerText = `₹${amount}`;
    document.getElementById("confirmName").innerText = name;
    document.getElementById("confirmEmail").innerText = email;
    document.getElementById("confirmPhone").innerText = phone;

    if (bookingIdBox) bookingIdBox.style.display = "none";

    step2.classList.remove("active");
    step3.classList.add("active");
  });

  /* =====================
     BACK TO STEP 2
  ===================== */
  backBtn.addEventListener("click", () => {
    step3.classList.remove("active");
    step2.classList.add("active");
  });

  /* =====================
     FINAL CONFIRM → API CALL
  ===================== */
  finalConfirmBtn.addEventListener("click", async () => {

    // prevent double click
    finalConfirmBtn.disabled = true;
    finalConfirmBtn.innerText = "Booking...";

    try {
      const res = await fetch(`${API_BASE}/api/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: userData.name,
          email: userData.email,
          phone: userData.phone,
          packageName: selectedPackage,
          amount
        })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Booking failed");
      }

      // ✅ SUCCESS
      if (bookingIdBox) bookingIdBox.style.display = "flex";
      document.getElementById("confirmBookingId").innerText =
        data.bookingId || "Generated";

      finalConfirmBtn.innerText = "Booked ✓";

    } catch (error) {
      console.error("Booking Error:", error);
      alert(error.message || "Server error. Please try again.");

      finalConfirmBtn.disabled = false;
      finalConfirmBtn.innerText = "Confirm Booking ✓";
    }
  });

});
