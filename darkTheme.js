//dark mode
function toggleDarkMode() {
  const body = document.body;
  body.classList.toggle('dark-theme');

  // Store the dark mode state in local storage
  const isDarkModeEnabled = body.classList.contains('dark-theme');
  localStorage.setItem('darkModeEnabled', isDarkModeEnabled);

  const themeSwitch = document.getElementById('themeSwitch');
  themeSwitch.checked = isDarkModeEnabled;
}

// Check if dark mode is enabled in local storage and apply it
document.addEventListener('DOMContentLoaded', function () {
  const isDarkModeEnabled = localStorage.getItem('darkModeEnabled') === 'true';
  const themeSwitch = document.getElementById('themeSwitch');
  themeSwitch.checked = isDarkModeEnabled;

  if (isDarkModeEnabled) {
    document.body.classList.add('dark-theme');
  }
});

const themeSwitch = document.getElementById('themeSwitch');
themeSwitch.addEventListener('change', toggleDarkMode);