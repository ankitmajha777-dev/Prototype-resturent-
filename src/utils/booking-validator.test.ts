import test from 'node:test';
import assert from 'node:assert/strict';
import { validateReservation, generateReservationCode, filterMenuItems, MenuItem } from './booking-validator';

test('validates valid reservation inputs correctly', () => {
  const result = validateReservation({
    name: 'Eleanor Vance',
    email: 'eleanor@example.com',
    phone: '(555) 234-5678',
    date: '2026-11-15',
    time: '19:30',
    guests: 4,
    seatingArea: 'Main Dining Room'
  }, '2026-11-10');

  assert.equal(result.isValid, true);
  assert.equal(Object.keys(result.errors).length, 0);
  assert.match(result.referenceCode || '', /^CC-261115-EV-\d{4}$/);
});

test('rejects past dates and invalid emails', () => {
  const result = validateReservation({
    name: 'A',
    email: 'bad-email',
    phone: '123',
    date: '2026-11-01',
    time: '04:00', // Invalid time
    guests: 0
  }, '2026-11-10');

  assert.equal(result.isValid, false);
  assert.ok(result.errors.name);
  assert.ok(result.errors.email);
  assert.ok(result.errors.phone);
  assert.ok(result.errors.date);
  assert.ok(result.errors.time);
  assert.ok(result.errors.guests);
});

test('rejects party sizes over 12 and prompts private dining', () => {
  const result = validateReservation({
    name: 'Julian Sterling',
    email: 'julian@example.com',
    phone: '555-987-6543',
    date: '2026-11-20',
    time: '18:00',
    guests: 18
  }, '2026-11-10');

  assert.equal(result.isValid, false);
  assert.equal(result.errors.guests, 'Parties greater than 12 guests require Private Dining reservation.');
});

test('filters menu items by category and query correctly', () => {
  const sampleMenu: MenuItem[] = [
    {
      id: 'm1',
      name: 'A5 Miyazaki Wagyu',
      category: 'Steaks & Grills',
      price: 55,
      description: 'Charred over binchotan with black garlic glaze.',
      tags: ['Signature', 'Gluten-Free'],
      isVegetarian: false,
      allergens: ['Soy']
    },
    {
      id: 'm2',
      name: 'Pan-Seared Hokkaido Scallops',
      category: 'Seafood',
      price: 42,
      description: 'Cauliflower velvet and golden ossetra caviar.',
      tags: ['Signature'],
      isVegetarian: false,
      allergens: ['Molluscs', 'Dairy']
    },
    {
      id: 'm3',
      name: 'Black Perigord Truffle Tagliolini',
      category: 'Main Courses',
      price: 48,
      description: 'Handmade pasta with 24-month aged Parmigiano.',
      tags: ['Vegetarian'],
      isVegetarian: true,
      allergens: ['Gluten', 'Dairy', 'Eggs']
    }
  ];

  // Category filter
  const seafoodOnly = filterMenuItems(sampleMenu, 'Seafood');
  assert.equal(seafoodOnly.length, 1);
  assert.equal(seafoodOnly[0].name, 'Pan-Seared Hokkaido Scallops');

  // Vegetarian filter
  const vegOnly = filterMenuItems(sampleMenu, 'all', '', 'vegetarian');
  assert.equal(vegOnly.length, 1);
  assert.equal(vegOnly[0].id, 'm3');

  // Search filter
  const searchResult = filterMenuItems(sampleMenu, 'all', 'binchotan');
  assert.equal(searchResult.length, 1);
  assert.equal(searchResult[0].id, 'm1');
});
