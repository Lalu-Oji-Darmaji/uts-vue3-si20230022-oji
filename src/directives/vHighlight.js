export const vHighlight = {
    mounted(el, binding) {
        highlight(el, binding.value)
    },
    updated(el, binding) {
        if (binding.value !== binding.oldValue) {
            highlight(el, binding.value)
        }
    },
}

function highlight(el, query) {
    const teksAsli = el.dataset.originalText || el.textContent
    el.dataset.originalText = teksAsli
    if (!query || query.trim() === '') {
        el.innerHTML = teksAsli
        return
    }
    const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    const regex = new RegExp(`(${escaped})`, 'gi')

    el.innerHTML = teksAsli.replace(
        regex,
        '<mark style="background:#FEF08A;border-radius:2px;">$1</mark>'
    )
}