const checkStatusBtn = document.getElementById("checkStatusBtn");
const statusResult = document.getElementById("statusResult");
const bookingInput = document.getElementById("bookingId");

checkStatusBtn.addEventListener("click", async () => {
  const bookingId = bookingInput.value.trim();

  if (!bookingId) {
    statusResult.innerHTML = `<p style="color:red">Please enter a Booking ID</p>`;
    return;
  }

  // Loading state
  statusResult.innerHTML = `
    <div class="status-loading">
      🔍 Checking booking status...
    </div>
  `;

  try {
    const res = await fetch(
      `http://localhost:5000/api/bookings/status/${bookingId}`
    );

    const data = await res.json();

    if (!res.ok || !data.success) {
      statusResult.innerHTML = `
        <div class="status-card error">
          ❌ Booking ID not found
        </div>
      `;
      return;
    }

    // SUCCESS UI (MATCHES YOUR IMAGE)
    statusResult.innerHTML = `
      <div class="status-card success">
        <h2>Status: <span class="confirmed">Confirmed ✔</span></h2>
        <p>Your booking is confirmed.</p>
        <p class="next-step">
          <strong>Next Step:</strong> Our team will contact you shortly.
        </p>
      </div>
    `;

  } catch (error) {
    console.error(error);
    statusResult.innerHTML = `
      <div class="status-card error">
        ⚠ Server error. Please try again later.
      </div>
    `;
  }
});
