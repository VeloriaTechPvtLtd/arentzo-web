import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const source = readFileSync(
  new URL('../src/features/rentals/ui/components/ContactSupportModal.tsx', import.meta.url),
  'utf8',
);

test('rental support exposes real, non-destructive contact destinations', () => {
  assert.match(source, /href="tel:\+916361562262"/);
  assert.match(source, /href="mailto:support@arentzo\.com"/);
  assert.match(source, /href="\/contact-us"/);
  assert.doesNotMatch(source, /href: '#'/);
});

test('support request opens a draft instead of claiming an unsent message succeeded', () => {
  assert.match(source, /mailto:support@arentzo\.com\?subject=/);
  assert.match(source, /Rental ID:/);
  assert.match(source, /Open email draft/);
  assert.doesNotMatch(source, /Message Sent/);
  assert.doesNotMatch(source, /setIsSubmitted/);
});
