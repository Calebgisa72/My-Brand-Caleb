document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const submitButton = document.querySelector(".submitBut");

    submitButton.addEventListener("click", function (event) {
        // Prevent the reload functionality
        event.preventDefault();
    });
});




function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function hasAtLeastTenWords(text) {
    const wordCount = text.split(/\s+/).length;
    return wordCount >= 10;
}

function isNameEntered(name) {
    const names = name.value.trim();
    return names !== '';
}

const submitButton = document.querySelector('.submitBut');

submitButton.addEventListener('click', () => {
    const senderName = document.querySelector('.js-sender-name');
    const senderEmailInput = document.querySelector('.js-sender-email');
    const senderLocationInput = document.querySelector('.js-sender-location');
    const senderMessageInput = document.querySelector('.js-sender-message');

    const noName = document.querySelector('.noName');
    const badEmail = document.querySelector('.badEmail');
    const badMessage = document.querySelector('.badMessage');
    const messageSent = document.querySelector('.messageSent');

    let nameCheck = isNameEntered(senderName);
    let checkEmail = isValidEmail(senderEmailInput.value);
    let checkMessage = hasAtLeastTenWords(senderMessageInput.value);

    if (!nameCheck) {
        noName.style.display = 'inline-block';
    } else {
        noName.style.display = 'none';
    }

    if (!checkEmail) {
        badEmail.style.display = 'inline-block';
    } else {
        badEmail.style.display = 'none';
    }

    if (!checkMessage) {
        badMessage.style.display = 'inline-block';
    } else {
        badMessage.style.display = 'none';
    }

    if (nameCheck && checkEmail && checkMessage) {
        messageSent.style.display = 'flex';
        
        setTimeout(() => {
            messageSent.style.display = 'none';
            senderName.value = "";
            senderEmailInput.value = "";
            senderLocationInput.value = "";
            senderMessageInput.value = "";
        }, 2000);
    } else {
        messageSent.style.display = 'none';
    }
});

