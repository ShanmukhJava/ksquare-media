document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('clientModal');
  const modalTitle = document.getElementById('clientModalTitle');
  const gallery = document.getElementById('clientGallery');
  const btnClose = modal?.querySelector('.client-modal-close');
  const linkInstagram = document.getElementById('clientInstagram');
  const linkFacebook = document.getElementById('clientFacebook');
  const linkWebsite = document.getElementById('clientWebsite');

  function openModal(card) {
    if (!modal) return;
    const title = card.getAttribute('data-client') || 'Client';
    const imagesStr = card.getAttribute('data-images') || '';
    const instagram = card.getAttribute('data-instagram') || '#';
    const facebook = card.getAttribute('data-facebook') || '#';
    const website = card.getAttribute('data-website') || '#';

    modalTitle.textContent = title;

    const images = imagesStr
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);
    gallery.innerHTML = images
      .map(src => `<img src="${src}" alt="${title} work" loading="lazy">`)
      .join('');

    linkInstagram.setAttribute('href', instagram);
    linkFacebook.setAttribute('href', facebook);
    linkWebsite.setAttribute('href', website);

    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    gallery.innerHTML = '';
  }

  document.querySelectorAll('.client-card').forEach(card => {
    // Click on the card title or button
    card.addEventListener('click', (e) => {
      const target = e.target;
      if (target.closest('button') || target.closest('h3') || target === card) {
        openModal(card);
      }
    });
    // Keyboard accessibility
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openModal(card);
      }
    });
  });

  btnClose?.addEventListener('click', closeModal);
  // Click on overlay outside modal content closes
  modal?.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
});

