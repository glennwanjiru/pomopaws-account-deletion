(() => {
  'use strict';
  const support = 'stainedcoffeecup017@gmail.com';
  const subject = 'PomoPaws account deletion request';
  const form = document.querySelector('#request-form');
  const email = document.querySelector('#account-email');
  const note = document.querySelector('#request-note');
  const result = document.querySelector('#draft-result');
  const prepared = document.querySelector('#prepared-request');
  const status = document.querySelector('#status');
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const body = [
      'Hello PomoPaws support,',
      '',
      'Please delete my PomoPaws account and the associated personal data under your control.',
      '',
      'Registered account email: ' + email.value.trim(),
      ...(note.value.trim() ? ['', 'Additional information:', note.value.trim()] : []),
      '',
      'Please let me know how to verify ownership and confirm when deletion is complete.',
      '',
      'I understand this request does not cancel a Google Play subscription.'
    ].join('\n');
    prepared.value = 'To: ' + support + '\nSubject: ' + subject + '\n\n' + body;
    result.hidden = false;
    status.textContent = 'Your request has not been sent yet. Please review and send the email.';
    // User-initiated email draft only; no site backend, analytics, cookies or browser storage.
    window.location.href = 'mailto:' + support + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
  });
  document.querySelector('#copy-request').addEventListener('click', async () => {
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(prepared.value);
      status.textContent = 'Request copied. Paste it into your email service and send it to ' + support + '.';
    } catch {
      prepared.focus();
      prepared.select();
      status.textContent = 'Select and copy the prepared text, then send it to ' + support + '.';
    }
  });
})();
