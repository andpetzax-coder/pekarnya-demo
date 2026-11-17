/* Заявка: открытие/закрытие модалки, проверка полей, экран успеха. */
(function () {
  var root = document.getElementById('zayavka');
  if (!root) return;

  var form = document.getElementById('zayavka-form');
  var done = document.getElementById('zayavka-done');
  var error = document.getElementById('zayavka-error');
  var doneText = document.getElementById('zayavka-done-text');
  var lastFocus = null;

  function open() {
    lastFocus = document.activeElement;
    root.hidden = false;
    requestAnimationFrame(function () { root.classList.add('is-open'); });
    document.body.style.overflow = 'hidden';
    setTimeout(function () { form.elements.name.focus(); }, 250);
  }

  function close() {
    root.classList.remove('is-open');
    document.body.style.overflow = '';
    setTimeout(function () {
      root.hidden = true;
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    }, 250);
  }

  function reset() {
    done.hidden = true;
    form.hidden = false;
    error.hidden = true;
  }

  document.addEventListener('click', function (e) {
    var btn = e.target.closest('a.v-btn[href="#zayavka"]');
    if (btn) { e.preventDefault(); open(); return; }

    if (e.target.closest('[data-zayavka-close]')) { close(); return; }

    if (e.target.closest('[data-zayavka-again]')) { form.reset(); reset(); }
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !root.hidden) close();
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var name = form.elements.name;
    var phone = form.elements.phone;
    var phoneOk = /^\+?[0-9\s()\-]{10,}$/.test(phone.value.trim());

    name.classList.toggle('is-invalid', !name.value.trim());
    phone.classList.toggle('is-invalid', !phoneOk);

    if (!name.value.trim() || !phoneOk) { error.hidden = false; return; }
    error.hidden = true;

    var firstName = name.value.trim().split(/\s+/)[0];
    doneText.textContent = firstName + ', мы свяжемся с вами по номеру ' + phone.value.trim() +
      ' в рабочие часы 09:00 – 21:00. Если хотите быстрее - продублируйте заявку в Telegram.';
    form.hidden = true;
    done.hidden = false;
  });
})();
