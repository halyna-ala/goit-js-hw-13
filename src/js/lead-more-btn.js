export default class btnLoadMore {
    constructor({ srlector, hidden = false }) {
        this.refs = this.getRefs(srlector);

        hidden && this.hide();
    }


getRefs(selector) {
    const refs = {};
    refs.button = document.querySelector(selector);

    return refs;
}

enable() {
    this.refs.button.disabled = false;
}

disabled() {
    this.refs.button.disabled = true;
    
}

show() {
    this.refs.button.classList.remove('is-hidden');
    
}

hide() {
    this.refs.button.classList.add('is-hidden');

}
}