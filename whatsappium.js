function dispatchClick(item) {
    item.dispatchEvent(new window.MouseEvent('mousedown', {
        view: window,
        bubbles: true,
        cancelable: false
    }));
}

function makeActive(item) {
    const chat = item.querySelector('._2UaNq');
    if (chat) {
        dispatchClick(chat);
    }
}

function isItemActive(item) {
    const chat = item.querySelector('._2UaNq');
    return chat && chat.classList.contains('_3mMX1');
}

function getChatList() {
    const chatListElem = document.querySelectorAll('.X7YrQ');
    if (chatListElem.length > 0) {
        return Array.from(chatListElem).sort(function (a, b) {
            return parseInt(a.style.transform.match(/\(.*\)/i)[0].match(/\d+/)[0]) - parseInt(b.style.transform.match(/\(.*\)/i)[0].match(/\d+/)[0])
        });
    }
}

function getEmojiTabs() {
    // const emojiPanel = document.querySelector('div.emoji-panel');
    return document.querySelectorAll('._2Bfgm');
}

function navigateEmojiTabs(delta) {
    const emojiTabs = getEmojiTabs();

    let index = -1;
    for (let i = 0; i < emojiTabs.length; i++) {
        const item = emojiTabs[i];
        if (item.classList.contains('_2wn58')) {
            index = i + delta;
            break;
        }
    }

    if (index < 0) {
        index = emojiTabs.length - 1;
    }
    if (index >= emojiTabs.length) {
        index = 0;
    }

    let target = emojiTabs[index];
    target.click();
}

function navigateConversation(delta) {
    const chatList = getChatList();

    let index = -1;
    for (let i = 0; i < chatList.length; i++) {
        const item = chatList[i];
        if (isItemActive(item)) {
            index = i + delta;
            break;
        }
    }

    // If no chat is selected, default to moving to the top chat
    if (index === -1 || index >= chatList.length) {
        index = 0;
    }

    let target = chatList[index];
    makeActive(target);
}

function searchChats() {
    const inputSearch = document.querySelector('input._2zCfw');
    if (inputSearch) {
        inputSearch.focus();
    }
}

function showEmojis() {
    const buttonEmoji = document.querySelector('span[data-icon=smiley]');
    if (buttonEmoji) {
        buttonEmoji.click();
    }
}

function isKeyCode(keyCode, char) {
    const keyChar = String.fromCharCode(keyCode);
    return keyChar === char || keyChar === char.toUpperCase();
}

const intervalId = setInterval(() => {
    bindShortcuts();
}, 5000);

function bindShortcuts() {
    window.removeEventListener('keyup', handleKeyUp);
    window.addEventListener('keyup', handleKeyUp);

    if (isWhatsappPageReady()) {
        clearInterval(intervalId);
    }
}

function isWhatsappPageReady() {
    const inputSearch = document.querySelector('input._2zCfw');
    return !!inputSearch;
}

function handleKeyUp(e) {
    console.log('Keyboard input new');
    if (e.altKey) {
        if (e.keyCode === 37) {
            navigateEmojiTabs(-1);
        } else if (e.keyCode === 39) {
            navigateEmojiTabs(1);
        } else if (e.keyCode === 40) {
            console.log('navigateConversation(1)');
            navigateConversation(1);
        } else if (e.keyCode === 38) {
            console.log('navigateConversation(-1)');
            navigateConversation(-1);
        } else if (isKeyCode(e.keyCode, 'k')) {
            e.preventDefault();
            searchChats();
        } else if (isKeyCode(e.keyCode, 'j')) {
            e.preventDefault();
            showEmojis();
        }
    }
}
