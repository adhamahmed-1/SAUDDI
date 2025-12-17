module.exports = function generateBookingId() {
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `CRYPTO-${random}`;
  };
  