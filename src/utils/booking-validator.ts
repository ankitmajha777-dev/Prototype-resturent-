/**
 * Celestial Cuisine - Pure Logic & Validation Utilities
 * Unit-testable business rules for reservations and menu search.
 */

export interface ReservationInput {
  name: string;
  email: string;
  phone: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm (24-hr format)
  guests: number;
  seatingArea?: string;
  specialRequests?: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
  referenceCode?: string;
}

export function validateReservation(input: ReservationInput, currentDateStr: string = '2026-11-10'): ValidationResult {
  const errors: Record<string, string> = {};

  if (!input.name || input.name.trim().length < 2) {
    errors.name = 'Please provide your full guest name (at least 2 characters).';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!input.email || !emailRegex.test(input.email.trim())) {
    errors.email = 'Please provide a valid email address for confirmation.';
  }

  const phoneDigits = (input.phone || '').replace(/\D/g, '');
  if (phoneDigits.length < 10) {
    errors.phone = 'Please provide a valid telephone number with area code.';
  }

  if (!input.date) {
    errors.date = 'Please select a reservation date.';
  } else {
    // Compare YYYY-MM-DD
    if (input.date < currentDateStr) {
      errors.date = 'Reservation date cannot be in the past.';
    }
  }

  if (!input.time) {
    errors.time = 'Please select a preferred seating time.';
  } else {
    // Format check: HH:mm
    const [hours, minutes] = input.time.split(':').map(Number);
    const timeMinutes = hours * 60 + (minutes || 0);
    const lunchStart = 11 * 60; // 11:00
    const lunchEnd = 15 * 60;   // 15:00
    const dinnerStart = 17 * 60; // 17:00
    const dinnerEnd = 22 * 60;  // 22:00

    const isLunch = timeMinutes >= lunchStart && timeMinutes <= lunchEnd;
    const isDinner = timeMinutes >= dinnerStart && timeMinutes <= dinnerEnd;

    if (!isLunch && !isDinner) {
      errors.time = 'Seating hours are Lunch (11:00 AM - 3:00 PM) and Dinner (5:00 PM - 10:00 PM).';
    }
  }

  if (!input.guests || input.guests < 1) {
    errors.guests = 'Party size must be at least 1 guest.';
  } else if (input.guests > 12) {
    errors.guests = 'Parties greater than 12 guests require Private Dining reservation.';
  }

  const isValid = Object.keys(errors).length === 0;
  const referenceCode = isValid ? generateReservationCode(input.date, input.name) : undefined;

  return {
    isValid,
    errors,
    referenceCode,
  };
}

export function generateReservationCode(dateStr: string, name: string): string {
  const cleanDate = (dateStr || '').replace(/-/g, '').slice(2);
  const initials = (name || 'CC')
    .trim()
    .split(/\s+/)
    .map(p => p[0]?.toUpperCase() || '')
    .join('')
    .slice(0, 3) || 'CC';
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  return `CC-${cleanDate}-${initials}-${randomSuffix}`;
}

export interface MenuItem {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  tags: string[]; // e.g., 'Vegetarian', 'Gluten-Free', 'Signature'
  isVegetarian: boolean;
  allergens: string[];
}

export function filterMenuItems(
  items: MenuItem[],
  selectedCategory: string,
  searchQuery: string = '',
  dietaryFilter: string = 'all'
): MenuItem[] {
  return items.filter(item => {
    // Category match
    if (selectedCategory !== 'all' && item.category.toLowerCase() !== selectedCategory.toLowerCase()) {
      return false;
    }

    // Dietary filter
    if (dietaryFilter === 'vegetarian' && !item.isVegetarian) {
      return false;
    }
    if (dietaryFilter === 'gluten-free' && !item.tags.includes('Gluten-Free')) {
      return false;
    }

    // Search query match in name, description, tags
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchName = item.name.toLowerCase().includes(q);
      const matchDesc = item.description.toLowerCase().includes(q);
      const matchTag = item.tags.some(t => t.toLowerCase().includes(q));
      if (!matchName && !matchDesc && !matchTag) {
        return false;
      }
    }

    return true;
  });
}
