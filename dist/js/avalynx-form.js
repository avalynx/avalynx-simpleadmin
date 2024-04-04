/**
 * Helper function for POSTing data as JSON with fetch.
 *
 * @param {Object} options
 * @param {string} options.url - URL to POST data to
 * @param {FormData} options.formData - `FormData` instance
 * @return {Object} - Response body from URL that was POSTed to
 */
async function postFormData({url, formData, urlAddon}) {
    const plainFormData = Object.fromEntries(formData.entries());
    const formDataString = new URLSearchParams(plainFormData).toString();

    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Accept: "application/json",
        },
        body: formDataString + '&action=ajax'+urlAddon,
    };

    const response = await fetch(url, fetchOptions);

    if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
    }

    return response.json();
}

/**
 * Event handler for a form submit event.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/submit_event
 *
 * @param {SubmitEvent} event
 */
async function handleFormSubmit(event) {
    event.preventDefault();

    const authcodeElement = document.getElementById("auth-code");
    const form = event.currentTarget;
    const url = form.action;
    const urlAddon ='&authkey='+authcodeElement.value;
    try {
        const formData = new FormData(form);
        const responseData = await postFormData({url, formData, urlAddon});
        const response = await handleResponse(responseData);
    } catch (error) {

    }
}

/**
 * Handle response from server
 *
 * @param response
 * @returns {Promise<void>}
 */
async function handleResponse(response) {
    if (response.debug_msg !== undefined) {
        alert(response.debug_msg);
    }
    if ((response.success !== undefined) && (response.success === true)) {
        window.myModal.hide();

        if (response.redirect !== undefined) {
            //window.location.href = response.redirect;
        }
    } else {
        if (response.invalid !== undefined) {
            for (const [key, value] of Object.entries(response.invalid)) {
                var inputElement = document.getElementById(key);
                var parentElement = inputElement.parentElement;
                var spanElement = parentElement.querySelector('span');

                if (inputElement !== null) {
                    inputElement.classList.add('is-invalid');
                }
                if (spanElement !== null) {
                    spanElement.innerHTML = value;
                }
            }
        }

        if (response.valid !== undefined) {
            for (const [key, value] of Object.entries(response.valid)) {
                var inputElement = document.getElementById(key);
                var parentElement = null;
                var spanElement = null;

                if (inputElement !== null) {
                    parentElement = inputElement.parentElement;
                    inputElement.classList.remove('is-invalid');
                }
                if (parentElement !== null) {
                    spanElement = parentElement.querySelector('span');
                }
                if (spanElement !== null) {
                    spanElement.innerHTML = "&nbsp;";
                }
            }
        }

        if ((response.authenticator !== undefined) && (response.authenticator === true)) {
            window.myModal.show();
        } else {
            window.myModal.hide();
        }
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const myModal = new bootstrap.Modal(document.getElementById('authCodeModal'));
    window.myModal = myModal;
});

/**
 * Add event listener to form
 */
window.addEventListener('load', function (event) {
    const visForm = document.getElementById("form_vis");
    if (visForm !== null) {
        visForm.addEventListener("submit", handleFormSubmit);
    }
});