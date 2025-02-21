document.getElementById('settings_button').addEventListener('click', function() {
    const radialMenu = document.getElementById('settings_menu');
    if (radialMenu.classList.contains('hidden')) {
        radialMenu.classList.remove('hidden');
        setTimeout(() => {
            radialMenu.classList.add('visible');
        }, 10); // Small delay to trigger the transition
    } else {
        radialMenu.classList.remove('visible');
        setTimeout(() => {
            radialMenu.classList.add('hidden');
        }, 300); // Match the transition duration
    }
});

document.getElementById('settings_close_button').addEventListener('click', function() {
    const radialMenu = document.getElementById('settings_menu');
    radialMenu.classList.remove('visible');
    setTimeout(() => {
        radialMenu.classList.add('hidden');
    }, 300); // Match the transition duration
});

const get_radio_value = function(name) {
    const radios = document.getElementsByName(name);
    for (let i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            return radios[i].value;
        }
    }
};

const on_settings_update = function() {
    console.log('Settings updating...');
    const english = get_radio_value('english');
    const informatics = get_radio_value('informatics');
    const pe = get_radio_value('pe');
    const technologies = get_radio_value('technologies');
    const authuser = document.getElementsByName('authuser')[0].value;

    // Calculate the expiration date (1 year from now)
    const date = new Date();
    date.setFullYear(date.getFullYear() + 1);
    const expires = `expires=${date.toUTCString()}`;

    // Save to cookies with expiration date
    document.cookie = `english=${english}; ${expires}; path=/`;
    document.cookie = `informatics=${informatics}; ${expires}; path=/`;
    document.cookie = `pe=${pe}; ${expires}; path=/`;
    document.cookie = `technologies=${technologies}; ${expires}; path=/`;
    document.cookie = `authuser=${authuser}; ${expires}; path=/`;
    console.log('Settings updated!');
};

// Function to get the value of a cookie by name
const get_cookie_value = function(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
};

// Function to set the input fields based on cookie values
const set_fields_from_cookies = function() {
    console.log('Setting fields from cookies...');
    
    const english = get_cookie_value('english');
    const informatics = get_cookie_value('informatics');
    const pe = get_cookie_value('pe');
    const technologies = get_cookie_value('technologies');
    const authuser = get_cookie_value('authuser');

    if (english) document.querySelector(`input[name="english"][value="${english}"]`).checked = true;
    if (informatics) document.querySelector(`input[name="informatics"][value="${informatics}"]`).checked = true;
    if (pe) document.querySelector(`input[name="pe"][value="${pe}"]`).checked = true;
    if (technologies) document.querySelector(`input[name="technologies"][value="${technologies}"]`).checked = true;
    if (authuser) document.getElementsByName('authuser')[0].value = authuser;

    console.log('Fields set from cookies!');
};

// Call the function when the page loads
window.addEventListener('load', set_fields_from_cookies);