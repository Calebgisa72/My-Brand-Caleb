document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const submitButton = document.querySelector(".submitBut");

    submitButton.addEventListener("click", async function (event) {
        // Prevent the default form submission
        event.preventDefault();

        const senderName = document.querySelector('.js-sender-name');
        const senderEmailInput = document.querySelector('.js-sender-email');
        const senderLocationInput = document.querySelector('.js-sender-location');
        const senderMessageInput = document.querySelector('.js-sender-message');

        const noName = document.querySelector('.noName');
        const badEmail = document.querySelector('.badEmail');
        const badMessage = document.querySelector('.badMessage');
        const messageSent = document.querySelector('.messageSent');

        let nameCheck = isNameEntered(senderName.value);
        let checkEmail = isValidEmail(senderEmailInput.value);
        let checkMessage = hasAtLeastTenWords(senderMessageInput.value);

        noName.style.display = nameCheck ? 'none' : 'inline-block';
        badEmail.style.display = checkEmail ? 'none' : 'inline-block';
        badMessage.style.display = checkMessage ? 'none' : 'inline-block';

        if (nameCheck && checkEmail && checkMessage) {
            try {
                let newMessage;
                if (senderLocationInput && senderLocationInput.value.trim() !== '') {
                    newMessage = {
                        sName: senderName.value,
                        sEmail: senderEmailInput.value,
                        sLocation: senderLocationInput.value,
                        message: senderMessageInput.value
                    };
                } else {
                    newMessage = {
                        sName: senderName.value,
                        sEmail: senderEmailInput.value,
                        message: senderMessageInput.value
                    };
                }

                const response = await fetch("https://my-brand-backend-iyxk.onrender.com/api/message", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(newMessage)
                });

                const data = await response.json();
                console.log(data.message);

                if (data.message === "Message sent successfully") {
                    messageSent.style.display = 'flex';
                    setTimeout(() => {
                        messageSent.style.display = 'none';
                        form.reset();
                    }, 2000);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
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
    const trimmedName = name.trim();
    return trimmedName !== '';
}
