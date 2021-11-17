function ibg() {

    let ibg = document.querySelectorAll(".ibg");
    for (var i = 0; i < ibg.length; i++) {
        if (ibg[i].querySelector('img')) {
            ibg[i].style.backgroundImage = 'url(' + ibg[i].querySelector('img').getAttribute('src') + ')';
        }
    }
}

ibg();

//burger
function burger(burgerclass, menuClass) {
    const icon = document.querySelector(burgerclass),
        menu = document.querySelector(menuClass);

    icon.addEventListener('click', function () {
        this.classList.toggle('active');
        menu.classList.toggle('active');
        document.body.classList.toggle('lock');
    });
}

burger('.menu-icon', '.header-menu');

//якоря
const anchors = document.querySelectorAll('a[href^="#"]')

for (let anchor of anchors) {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const menu = document.querySelector('.header-menu'),
            menuIcon = document.querySelector('.menu-icon');

        menu.classList.remove('active');
        menuIcon.classList.remove('active');
        document.body.classList.remove('lock');

        const goto = anchor.hasAttribute('href') ? anchor.getAttribute('href') : 'body';
        document.querySelector(goto).scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    });
}


//MODALS

const modals = () => {
    function bindModal(btnSelector, modalSelector, closeSelector, activeClass) {
        const btn = document.querySelectorAll(btnSelector),
            modal = document.querySelector(modalSelector),
            close = document.querySelector(closeSelector),
            popups = document.querySelectorAll('.popup');

        btn.forEach(element => {
            element.addEventListener('click', (e) => {
                popups.forEach(item => {
                    item.classList.remove(activeClass);
                });
                if (e.target) {
                    e.preventDefault();
                }
                modal.classList.add(activeClass);
                document.body.style.overflow = "hidden";
            });
        });


        close.addEventListener('click', function () {
            modal.classList.remove(activeClass);
            document.body.style.overflow = "";
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove(activeClass);
                document.body.style.overflow = "";
            }
        });
    }

    function showModalByTime(modalSelector, time) {
        const modal = document.querySelector(modalSelector);

        setTimeout(() => {
            modal.style.display = 'block';
            document.body.style.overflow = "hidden";

        }, time);
    }

    // showModalByTime('.popup', 60000);

    bindModal('.connect__answer-btn', '.popup.first', '.popup.first .popup__close-svg', 'active-popup');
    bindModal('.connect__buy-btn', '.popup.second', '.popup.second .popup__close', 'active-popup');

};
modals();

//Accordeon


const spollers = function (elem, bool = true) {
    const titles = document.querySelectorAll(elem);
    let accordeon = bool;

    titles.forEach(item => {
        item.addEventListener('click', function (e) {
            e.preventDefault();
            if (this.classList.contains('active')) {
                this.classList.remove('active');
                this.nextElementSibling.classList.remove('active');
                this.nextElementSibling.style.height = '0px';
            } else {
                if (bool) {
                    titles.forEach(item => {
                        item.classList.remove('active');
                        item.nextElementSibling.classList.remove('active');
                        item.nextElementSibling.style.height = '0px';
                    });
                }
                this.classList.add('active');
                this.nextElementSibling.classList.add('active');
                this.nextElementSibling.style.height = this.nextElementSibling.scrollHeight + 'px';
            }
        });
    });
};

spollers('.with-list .header-menu__link');
spollers('.recipe-spoller__btn', false);

// select
function customSelect(trigger) {
    const select = document.querySelectorAll(trigger);
    if (select.length > 0) {
        select.forEach(sel => {
            sel.addEventListener('click', function () {
                this.classList.toggle('active-sel');
            });
        });
        document.body.addEventListener('click', (e) => {
            if (e.target.tagName !== 'SELECT') {
                select.forEach(item => item.classList.remove('active-sel'));
            }
        });
    }
}
customSelect('.select');



//ACTIVE FORM BTN
const checkBox = document.querySelectorAll('form .check-box');
if (checkBox.length > 0) {
    checkBox.forEach(item => {
        item.addEventListener('change', function () {
            this.closest('form').querySelector('button').disabled = !this.closest('form').querySelector('button').disabled;
        });
    });
}



