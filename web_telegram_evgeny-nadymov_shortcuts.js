function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time))
}

function isKeyCode(keyCode, char) {
    const keyChar = String.fromCharCode(keyCode)
    return keyChar == char || keyChar == char.toUpperCase()
}

const intervalId = setInterval(() => {
    bindShortcuts()
}, 5000)

function bindShortcuts() {
    if (isTelegramPageReady()) {
        clearInterval(intervalId)
    }

    window.removeEventListener('keyup', handleKeyUp)
    window.addEventListener('keyup', handleKeyUp)

    window.removeEventListener('click', handleReply)
    window.addEventListener('click', handleReply)
}

async function handleReply(e) {
    if (e.target.closest('.message') && e.altKey) {
        await sleep(50)
        $('.header-command button:nth-child(3').click()
    }
}

function isTelegramPageReady() {
    const inputSearch = document.querySelector('.header-status-content')
    if (inputSearch) return true
    else return false
}

function handleKeyUp(e) {
    console.log('Keyboard input new')
    if (e.shiftKey) {
        if (isKeyCode(e.keyCode, 'd')) {
            e.preventDefault()
            console.log('press shift + d')
            $('.media-viewer-footer div:nth-child(3)').click()
        }
    }
}