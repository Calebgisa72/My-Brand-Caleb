document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  const messageSubmit = document.querySelector(".js-messageSubmit");
  let loading = false;

  function updateSubmitButton() {
    messageSubmit.innerHTML = `
        <button ${loading ? "disabled" : ""} type="${
      loading ? "button" : "submit"
    }" class="submitBut">
          ${loading ? "Loading..." : "Submit"}
          ${
            !loading
              ? `<img style="width: 23%" src="Images/Paper Plane.svg" alt="" />`
              : ""
          }
        </button>
      `;

    const submitButton = document.querySelector(".submitBut");

    submitButton.addEventListener("click", handleSubmit);
  }

  updateSubmitButton();

  async function handleSubmit(event) {
    event.preventDefault();

    const senderName = document.querySelector(".js-sender-name");
    const senderEmailInput = document.querySelector(".js-sender-email");
    const senderLocationInput = document.querySelector(".js-sender-location");
    const senderMessageInput = document.querySelector(".js-sender-message");

    if (senderMessageInput.value.toLowerCase() === "open login") {
      window.location.href = "../auth/login.html";
      return;
    }

    const noName = document.querySelector(".noName");
    const badEmail = document.querySelector(".badEmail");
    const badMessage = document.querySelector(".badMessage");

    let nameCheck = isNameEntered(senderName.value);
    let checkEmail = isValidEmail(senderEmailInput.value);
    let checkMessage = hasAtLeastTenWords(senderMessageInput.value);

    noName.style.display = nameCheck ? "none" : "inline-block";
    badEmail.style.display = checkEmail ? "none" : "inline-block";
    badMessage.style.display = checkMessage ? "none" : "inline-block";

    if (nameCheck && checkEmail && checkMessage) {
      try {
        const newMessage = {
          sName: senderName.value,
          sEmail: senderEmailInput.value,
          message: senderMessageInput.value,
          ...(senderLocationInput.value.trim() && {
            sLocation: senderLocationInput.value,
          }),
        };

        loading = true;
        updateSubmitButton();

        const response = await fetch(
          "https://my-brand-backend-iyxk.onrender.com/api/message",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newMessage),
          }
        );

        loading = false;
        updateSubmitButton();

        const data = await response.json();

        if (data.message === "Message sent successfully") {
          showToast("Message sent successfully", "success");
          setTimeout(() => {
            form.reset();
          }, 2000);
        }
      } catch (error) {
        console.error("Error:", error);
        loading = false;
        updateSubmitButton();
      }
    }
  }

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function hasAtLeastTenWords(text) {
    const wordCount = text.split(/\s+/).filter(Boolean).length;
    return wordCount >= 10;
  }

  function isNameEntered(name) {
    const trimmedName = name.trim();
    return trimmedName !== "";
  }
});
