/**
 * CELESTIAL CUISINE - Reservation Booking Engine
 * Date checking, time slot selection, party size validation, voucher generator
 */

(function () {
  'use strict';

  const reservationForm = document.getElementById('reservationForm');
  const dateInput = document.getElementById('resDate');
  const timeInput = document.getElementById('resTime');
  const guestsSelect = document.getElementById('resGuests');
  const nameInput = document.getElementById('resName');
  const emailInput = document.getElementById('resEmail');
  const phoneInput = document.getElementById('resPhone');
  const seatingAreaSelect = document.getElementById('resSeatingArea');
  const requestsInput = document.getElementById('resRequests');
  const timeSlotButtons = document.querySelectorAll('.time-slot-btn');
  const confirmationCard = document.getElementById('confirmationCard');
  const newBookingBtn = document.getElementById('newBookingBtn');
  const printVoucherBtn = document.getElementById('printVoucherBtn');

  // 1. Enforce minimum date to today (or current date)
  if (dateInput) {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const minDateStr = `${yyyy}-${mm}-${dd}`;
    dateInput.min = minDateStr;
    if (!dateInput.value) {
      // Default to tomorrow
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      const tomY = tomorrow.getFullYear();
      const tomM = String(tomorrow.getMonth() + 1).padStart(2, '0');
      const tomD = String(tomorrow.getDate()).padStart(2, '0');
      dateInput.value = `${tomY}-${tomM}-${tomD}`;
    }
  }

  // 2. Time slot pills interaction
  timeSlotButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      timeSlotButtons.forEach((b) => b.classList.remove('selected'));
      btn.classList.add('selected');
      const selectedTime = btn.getAttribute('data-time') || '';
      if (timeInput) {
        timeInput.value = selectedTime;
        clearFieldError(timeInput);
      }
    });
  });

  // 3. Clear errors on input
  [nameInput, emailInput, phoneInput, dateInput, timeInput, guestsSelect].forEach((field) => {
    if (!field) return;
    field.addEventListener('input', () => clearFieldError(field));
  });

  function clearFieldError(field) {
    field.classList.remove('error');
    const parent = field.closest('.form-group');
    if (parent) {
      const err = parent.querySelector('.form-error-msg');
      if (err) err.classList.remove('visible');
    }
  }

  function setFieldError(field, message) {
    field.classList.add('error');
    const parent = field.closest('.form-group');
    if (parent) {
      let err = parent.querySelector('.form-error-msg');
      if (!err) {
        err = document.createElement('span');
        err.className = 'form-error-msg';
        parent.appendChild(err);
      }
      err.textContent = message;
      err.classList.add('visible');
    }
  }

  // 4. Form Submission & Client-Side Validation
  if (reservationForm) {
    reservationForm.addEventListener('submit', (e) => {
      e.preventDefault();

      let hasErrors = false;

      // Name validation
      if (!nameInput.value.trim() || nameInput.value.trim().length < 2) {
        setFieldError(nameInput, 'Please provide your full guest name.');
        hasErrors = true;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
        setFieldError(emailInput, 'Please enter a valid email address for confirmation.');
        hasErrors = true;
      }

      // Phone validation
      const phoneClean = phoneInput.value.replace(/\D/g, '');
      if (phoneClean.length < 10) {
        setFieldError(phoneInput, 'Please provide a valid 10-digit telephone number.');
        hasErrors = true;
      }

      // Date validation
      if (!dateInput.value) {
        setFieldError(dateInput, 'Please choose a reservation date.');
        hasErrors = true;
      }

      // Time validation
      if (!timeInput.value) {
        setFieldError(timeInput, 'Please select a preferred seating time.');
        hasErrors = true;
      }

      // Party size validation
      const guests = parseInt(guestsSelect.value || '2', 10);
      if (guests < 1) {
        setFieldError(guestsSelect, 'Party must have at least 1 guest.');
        hasErrors = true;
      } else if (guests > 12) {
        setFieldError(guestsSelect, 'Parties over 12 require our Private Dining salon.');
        hasErrors = true;
      }

      if (hasErrors) {
        window.showToast('Please correct the highlighted fields.');
        return;
      }

      // Generate verified reference code
      const cleanDate = dateInput.value.replace(/-/g, '').slice(2);
      const initials = nameInput.value
        .trim()
        .split(/\s+/)
        .map((p) => p[0].toUpperCase())
        .join('')
        .slice(0, 3);
      const randomSuffix = Math.floor(1000 + Math.random() * 9000);
      const refCode = `CC-${cleanDate}-${initials || 'VIP'}-${randomSuffix}`;

      // Populate confirmation card
      const confName = document.getElementById('confName');
      const confDate = document.getElementById('confDate');
      const confTime = document.getElementById('confTime');
      const confGuests = document.getElementById('confGuests');
      const confArea = document.getElementById('confArea');
      const confCode = document.getElementById('confRefCode');
      const confRequests = document.getElementById('confRequests');

      if (confName) confName.textContent = nameInput.value.trim();
      if (confDate) {
        const dObj = new Date(dateInput.value + 'T00:00:00');
        confDate.textContent = dObj.toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
      }
      if (confTime) confTime.textContent = timeInput.value;
      if (confGuests) confGuests.textContent = `${guests} Guests`;
      if (confArea) confArea.textContent = seatingAreaSelect.value;
      if (confCode) confCode.textContent = refCode;
      if (confRequests) {
        confRequests.textContent = requestsInput.value.trim() || 'No special dietary restrictions specified.';
      }

      // Hide form, show confirmation card
      reservationForm.style.display = 'none';
      if (confirmationCard) {
        confirmationCard.classList.add('visible');
        confirmationCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }

      window.showToast('Table reservation request recorded! Confirmation reference generated.');
    });
  }

  // 5. New booking button
  if (newBookingBtn) {
    newBookingBtn.addEventListener('click', () => {
      if (confirmationCard) confirmationCard.classList.remove('visible');
      if (reservationForm) {
        reservationForm.reset();
        reservationForm.style.display = 'block';
        reservationForm.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // 6. Print voucher button
  if (printVoucherBtn) {
    printVoucherBtn.addEventListener('click', () => {
      window.print();
    });
  }
})();
