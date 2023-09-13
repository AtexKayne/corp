export const getFakeInput = () => {
    const fakeInput = document.createElement('input')
    fakeInput.setAttribute('type', 'tel')
    fakeInput.style.position = 'fixed'
    fakeInput.style.opacity = 0
    fakeInput.style.height = 0
    fakeInput.style.fontSize = '30px'
    fakeInput.setAttribute('autocomplete', 'off')
    document.body.prepend(fakeInput)
    fakeInput.focus()
    return fakeInput
}

export const getMetaScale = () => {
    const meta = document.createElement('meta')
    meta.setAttribute('name', 'viewport')
    meta.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0')
    document.querySelector('head').append(meta)
    return meta
}