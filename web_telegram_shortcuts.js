function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

function isKeyCode(keyCode, char) {
    const keyChar = String.fromCharCode(keyCode)
    return keyChar == char || keyChar == char.toUpperCase();
}

const intervalId = setInterval(() => {
    bindShortcuts();
}, 5000);

function bindShortcuts() {
    window.removeEventListener('keyup', handleKeyUp);
    window.addEventListener('keyup', handleKeyUp);

    if (isTelegramPageReady()) {
        clearInterval(intervalId);
    }

    window.removeEventListener('click', handleReply)
    window.addEventListener('click', handleReply)
}

async function handleReply(e) {
    if (e.target.closest('.im_history_message_wrap') && e.altKey) {
        await sleep(50);
        $('.btn-primary.im_edit_reply_btn')[0].click()
    }
}

function isTelegramPageReady() {
    const inputSearch = document.querySelector('.tg_head_btn.dropdown-toggle');
    if (inputSearch) return true;
    else return false;
}

function handleKeyUp(e) {
    console.log('Keyboard input new');
    if (e.shiftKey) {
        if (isKeyCode(e.keyCode, 'd')) {
            e.preventDefault();
            console.log('press shift + d')
            $('.media_modal_bottom_panel .media_modal_action_btn')[0].click()
        }
    }
}