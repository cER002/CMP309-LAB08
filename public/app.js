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
        outputBody.textContent = JSON.stringify(JSON.parse(await res.text()), null, 2)
    } catch (e) {
        outputHeader.textContent = 'An Error has occured!'
        outputBody.textContent = e.message
    }
}

coursesBtn.addEventListener('click', () => callApi('/api/courses'))
statusBtn.addEventListener('click', () => callApi('/api/status'))
headersBtn.addEventListener('click', () => callApi('/api/headers'))
subscribeBtn.addEventListener('click', () => callApi('/api/subscribe', 'POST'))
adminBtn.addEventListener('click', () => callApi('/api/admin'))
statsBtn.addEventListener('click', () => callApi('/api/stats'))
failBtn.addEventListener('click', () => callApi('/api/nonexistent'))