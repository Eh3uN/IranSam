export function initializeContact() {
  const dialogs = [...document.querySelectorAll('dialog.contact-panel')];
  const triggers = [...document.querySelectorAll('[data-open-panel]')];

  function syncState() {
    document.body.classList.toggle('contact-open', dialogs.some(dialog => dialog.open));
    for (const trigger of triggers) {
      const open = document.getElementById(trigger.dataset.openPanel)?.open === true;
      trigger.setAttribute('aria-expanded', String(open));
    }
  }

  for (const dialog of dialogs) {
    let previousFocus;
    let pointerStartedOutside = false;

    for (const trigger of triggers.filter(button => button.dataset.openPanel === dialog.id)) {
      trigger.addEventListener('click', () => {
        if (dialog.open) return;
        for (const other of dialogs) if (other.open) other.close();
        previousFocus = trigger;
        pointerStartedOutside = false;
        dialog.showModal();
        syncState();
      });
    }

    dialog.querySelector('.contact-close').addEventListener('click', () => dialog.close());
    dialog.addEventListener('close', () => {
      syncState();
      if (!dialogs.some(panel => panel.open)) previousFocus?.focus({ preventScroll: true });
    });

    // Only dismiss when the whole pointer gesture occurs on the backdrop.
    const isOutside = event => {
      const rect = dialog.getBoundingClientRect();
      return event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom;
    };
    dialog.addEventListener('pointerdown', event => { pointerStartedOutside = isOutside(event); });
    dialog.addEventListener('click', event => {
      if (event.target === dialog && pointerStartedOutside && isOutside(event)) dialog.close();
      pointerStartedOutside = false;
    });
  }
}
