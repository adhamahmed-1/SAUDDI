document.addEventListener("DOMContentLoaded", () => {

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

  /* =====================
     PACKAGE SELECTION (STEP 1)
  ===================== */
  cards.forEach(card => {
    card.addEventListener("click", () => {
      cards.forEach(c => c.classList.remove("selected"));
      card.classList.add("selected");

      selectedPackage = card.dataset.package;
      amount = Number(card.dataset.amount);

      console.log("Selected:", selectedPackage, amount);
    });
  });

  /* =====================
     GO TO STEP 2
  ===================== */
  continueBtn.addEventListener("click", () => {
    if (!selectedPackage) {
      alert("Please select a package first");
      return;
    }

    step1.classList.remove("active");
    step2.classList.add("active");

    console.log("Moved to Step 2");
  });

  /* =====================
     FORM SUBMIT → STEP 3 (NO API YET)
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

    // Save user data
    userData = { name, email, phone };

    // Fill confirmation values
    document.getElementById("confirmPackage").innerText = selectedPackage;
    document.getElementById("confirmPrice").innerText = `$${amount}`;
    document.getElementById("confirmName").innerText = name;
    document.getElementById("confirmEmail").innerText = email;
    document.getElementById("confirmPhone").innerText = phone;

    // Hide booking ID initially
    document.querySelector(".booking-id").style.display = "none";

    // Move to Step 3
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
    finalConfirmBtn.disabled = true;
    finalConfirmBtn.innerText = "Booking...";

    try {
      const res = await fetch("http://localhost:5000/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...userData,
          packageName: selectedPackage,
          amount
        })
      });

      const data = await res.json();

      if (res.ok && data.success) {
        // Show booking ID
        document.querySelector(".booking-id").style.display = "flex";
        document.getElementById("confirmBookingId").innerText = data.bookingId;

        finalConfirmBtn.innerText = "Booked ✓";
      } else {
        alert(data.message || "Booking failed");
        finalConfirmBtn.disabled = false;
        finalConfirmBtn.innerText = "Confirm Booking ✓";
      }

    } catch (error) {
      console.error(error);
      alert("Server error. Please try again.");
      finalConfirmBtn.disabled = false;
      finalConfirmBtn.innerText = "Confirm Booking ✓";
    }
  });

});
