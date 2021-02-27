class AppForm {
    constructor() {
        this.form = [];
        this.step = 0;
        this.currentGroup = null;

        this.setListeners();
        this.getForm();
        this.refresh();
    }

    submit = () => console.log('SUBMIT');

    refresh = () => {
        this.step++;
        if (this.step <= this.form.length)
            this.displayStep();
        else
            this.submit();
    }

    displayStep = () => {
        if (this.currentGroup)
            this.currentGroup.style.display = "none";
        this.currentGroup = this.form.find(_group => _group.step === this.step).element;
        this.currentGroup.style.display = "block";
    }

    getForm = () => {
        const groups = Array.from(document.getElementsByClassName('form-gropu'));
        groups.forEach(_group => {
            const children = Array.from(_group.children);
            this.form.push({
                'step': Number.parseInt(_group.dataset.step),
                'element': _group,
                'input': children.find(_el => _el.nodeName === 'INPUT')
            })
        })
    }

    setListeners = () => {
        document.getElementById('next-button').addEventListener('click', this.refresh);
    }

    removeListeners = () => {
        document.getElementById('next-button').removeEventListener('click', this.refresh);
    }
}

new AppForm();