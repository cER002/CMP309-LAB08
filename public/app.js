const coursesBtn = document.querySelector('.coursesBtn')
const statusBtn = document.querySelector('.statusBtn')
const headersBtn = document.querySelector('.headersBtn')
const subscribeBtn = document.querySelector('.subscribeBtn')
const adminBtn = document.querySelector('.adminBtn')
const statsBtn = document.querySelector('.statsBtn')
const failBtn = document.querySelector('.failBtn')
const outputHeader = document.querySelector('#output-header')
const outputBody = document.querySelector('#output-body')

const callApi = async (path, method = "GET") => {
    try {
        const res = await fetch(path, { method })
        outputHeader.textContent = `Status code: ${res.status}`
        outputBody.textContent = res.body
    } catch (e) {
        outputHeader.textContent = 'A fetch error has occured!'
        outputBody.textContent = 'fetch threw an error'
        return
    }
}

