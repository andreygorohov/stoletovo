document.addEventListener("DOMContentLoaded", function (event) {
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




const cards = document.querySelector('.cards'),
    allCardBtn = document.querySelectorAll('.card__btn'),
    orderBtn = document.querySelector('.order__btn'),
    cardsLink = document.querySelector('.cards__link'),
    orderQuant = document.querySelector('.order__quant'),
    timeBtn = document.querySelector('.time__list-btn'),
    timeWindow = document.querySelector('.time'),
    timeClose = document.querySelector('.time__close'),
    orderSett = document.querySelector('.order__sett'),
    allTabs = document.querySelector('.tabs'),
    tabsWrap = document.querySelector('.tabs__wrap'),
    tabsRowBtn = document.querySelectorAll('.tabs__row-btn'),
    quanInp = document.querySelector('.quantity__input input');
// let tabIndex = '';
let cardIndex = '';

// ДЕЙСТВИЯ ПО КЛИКУ НА КНОПКУ КАРТОЧКИ
allCardBtn.forEach((btn, i) => {
    if (screen.width < 576) {
        btn.textContent = "В корзину";
    }

    if (!btn.classList.contains('in-basket')) {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            quanInp.value++;
            allCardBtn.forEach(item => {
                item.classList.remove('in-basket');
                item.textContent = "Добавить в корзину";
            });
            cardsLink.classList.add('active');
            btn.classList.add('in-basket');
            btn.textContent = 'Оплатить';
            orderBtn.classList.add('active');
            if (screen.width < 480) {
                orderBtn.textContent = "Оформить";
            }
            orderQuant.classList.add('active');


            const allCard = document.querySelectorAll('.card');
            // tabIndex = btn.dataset.num;

            allCard.forEach((item, i) => {
                if (item.querySelector('.card__btn').classList.contains('in-basket')) {
                    cardIndex = i;

                }
            });

            if (cardIndex == 0 || cardIndex == 3 || cardIndex == 6) {
                tabsRowBtn[0].href = "https://www.ozon.ru/product/maslo-ryzhikovoe-stoletovo-holodnogo-otzhima-nerafinirovannoe-250-ml-178637420/?_bctx=CAMQg9nDKQ&asb=zmlQFyWPHF6Evl9Z9fl051BzZXASpfrL5O6Y%252FuaixIg%253D&asb2=zmlQFyWPHF6Evl9Z9fl051BzZXASpfrL5O6Y_uaixIg";
                tabsRowBtn[1].href = "https://www.wildberries.ru/catalog/12402267/detail.aspx?targetUrl=BP";
                tabsRowBtn[2].href = "https://pokupki.market.yandex.ru/product/stoletovo-maslo-ryzhikovoe-0-25-l/100922925728?show-uid=16227949435679980911106003&offerid=Nr219OR8tAhpLt1HH1MtcA&cpc=JFu1yC25BvPcI1639YWt7yqEn-Fqz7D2pvQs4HSp-wDfB6BvJmvHB4RNFSCsseCexYVNm7c5pm4vllynaTxYEklU1K6nn6EjI2eVLIGnwJ5hhZVT5sp29hz2Qqkpa5vXLDm776QxEeCiybURCaMm4wp9QoE9-XlTXfcaDFQoKJI%2C";

            } else if (cardIndex == 1 || cardIndex == 4 || cardIndex == 7) {
                tabsRowBtn[0].href = 'https://www.ozon.ru/product/maslo-gorchichnoe-stoletovo-holodnogo-otzhima-nerafinirovannoe-250-ml-178637419/?_bctx=CAMQg9nDKQ&asb=Aq0vrjM%252BOeCVfhCCBHBfIUH94zx1tRXby2NQ1euSIW0%253D&asb2=Aq0vrjM-OeCVfhCCBHBfIUH94zx1tRXby2NQ1euSIW0';
                tabsRowBtn[1].href = 'https://www.wildberries.ru/catalog/12402265/detail.aspx?targetUrl=BP';
                tabsRowBtn[2].href = 'https://pokupki.market.yandex.ru/product/stoletovo-maslo-gorchichnoe-0-25-l/100922918734?show-uid=16227949435679980911106001&offerid=rilVw2yT3MShDOEU_PmbtA&cpc=JFu1yC25BvMMzW0S0BRixkKvTj539AoQJ_gZeUVsEXJmTXNVPmtxPnPc09ykTobhKUBuUjyS16q5TV857XrXyMgFXlXpjYlOXNhvZ_DW0rmg97fmVk4Wl5foZjiFmA2G6qDbYOZMSSRXBDemgsjydCHKNsJzjtqO9kQKD8bp1Sc%2C';
            } else {
                tabsRowBtn[0].href = 'https://www.ozon.ru/product/maslo-lnyanoe-stoletovo-holodnogo-otzhima-nerafinirovannoe-250-ml-178637623/?_bctx=CAMQg9nDKQ&asb=7q8W00kPSHkMeDQxP5HVHVIsZiJ6GfS6hOQ7p0KoXo8%253D&asb2=7q8W00kPSHkMeDQxP5HVHVIsZiJ6GfS6hOQ7p0KoXo8';
                tabsRowBtn[1].href = 'https://www.wildberries.ru/catalog/12402266/detail.aspx?targetUrl=BP';
                tabsRowBtn[2].href = 'https://pokupki.market.yandex.ru/product/maslo-lnianoe-stoletovo-kholodnogo-otzhima-nerafinirovannoe-250ml/100914815005?show-uid=16228072503789461031106003&offerid=_R9LaYIfv-bQ_cuna3GpZg&cpc=mlQHMbJOYLFTHcRAgymrQfRWiLaC3gkEGQ3msGvRwblT49sX80iQV7DqP0qsas1eSAw8W-vK1I38T_5zbvPPF1ZAeUOUuzRB_tvKicAURYRuyIR21QNTiFjcAMLwfxEKqD4fJtxLWATBs1NcWCMSS7uydHj4_k1ue2LdljrcO9Y9-oam8RCVBA%2C%2C';
            }



            switch (cardIndex) {
                case 0:
                    cardsLink.href = "https://www.ozon.ru/product/maslo-ryzhikovoe-stoletovo-holodnogo-otzhima-nerafinirovannoe-250-ml-178637420/?_bctx=CAMQg9nDKQ&asb=zmlQFyWPHF6Evl9Z9fl051BzZXASpfrL5O6Y%252FuaixIg%253D&asb2=zmlQFyWPHF6Evl9Z9fl051BzZXASpfrL5O6Y_uaixIg";
                    break;
                case 1:
                    cardsLink.href = "https://www.ozon.ru/product/maslo-gorchichnoe-stoletovo-holodnogo-otzhima-nerafinirovannoe-250-ml-178637419/?_bctx=CAMQg9nDKQ&asb=Aq0vrjM%252BOeCVfhCCBHBfIUH94zx1tRXby2NQ1euSIW0%253D&asb2=Aq0vrjM-OeCVfhCCBHBfIUH94zx1tRXby2NQ1euSIW0";
                    break;
                case 2:
                    cardsLink.href = "https://www.ozon.ru/product/maslo-lnyanoe-stoletovo-holodnogo-otzhima-nerafinirovannoe-250-ml-178637623/?_bctx=CAMQg9nDKQ&asb=7q8W00kPSHkMeDQxP5HVHVIsZiJ6GfS6hOQ7p0KoXo8%253D&asb2=7q8W00kPSHkMeDQxP5HVHVIsZiJ6GfS6hOQ7p0KoXo8";
                    break;
                case 3:
                    cardsLink.href = "https://www.wildberries.ru/catalog/12402267/detail.aspx?targetUrl=BP";
                    break;
                case 4:
                    cardsLink.href = "https://www.wildberries.ru/catalog/12402265/detail.aspx?targetUrl=BP";
                    break;
                case 5:
                    cardsLink.href = "https://www.wildberries.ru/catalog/12402266/detail.aspx?targetUrl=BP";
                    break;
                case 6:
                    cardsLink.href = "https://pokupki.market.yandex.ru/product/stoletovo-maslo-ryzhikovoe-0-25-l/100922925728?show-uid=16228182379719513256706002&offerid=Nr219OR8tAhpLt1HH1MtcA&cpc=scwKP0lSqC5B8IClMzy3LLcPZevq-gU71jTx9YBruZT6rw1ImVZ8XCj67yzTZV_2SjaddarJOoiFWtUM6PJjhDRWFrLn75z0iSlJyOgEvNuJSM3ICdUvtHRROLIyHAN7cVX5RWT_ag6FhvAUu92ntjWAQbQt4xoQRiIBbLQ9gTo%2C";
                    break;
                case 7:
                    cardsLink.href = "https://pokupki.market.yandex.ru/product/stoletovo-maslo-gorchichnoe-0-25-l/100922918734?show-uid=16228182379719513256706001&offerid=rilVw2yT3MShDOEU_PmbtA&cpc=scwKP0lSqC5fJPBqA1Aerqsqb2-8AKj5ILHq1nN4PgxfFgWsLpQk0VxNJon6CuDLrq0p3Krk5NVl-fGEWpsJgW3F1HSTP1knhEbs38IfEp9PVP44GiQBTZ0KWJLua15EHZFp3ed22NehoLm3mZJBm6Fg9AF3aAZhAidMIEifVRHxImQvqvUNKA%2C%2C";
                    break;
                case 8:
                    cardsLink.href = "https://pokupki.market.yandex.ru/product/maslo-lnianoe-stoletovo-kholodnogo-otzhima-nerafinirovannoe-250ml/100914815005?show-uid=16228182379719513256706003&offerid=_R9LaYIfv-bQ_cuna3GpZg&cpc=scwKP0lSqC4IUqbFKGIfNO9jY5tJxdPXk9PIEvUf6BvkuLBPO07Gb8hICxPcSAIJ9Wc-Aoe-OQrKWxeqsbToiIpmOpp3ba93MehGqYXosn7TMYaM1mYcRgcoI6Y2N47DBJy2sbgMfpyDHxFFklkvaBU0uMkExsZcwtLvewaDHtI%2C";
                    break;
                default:
                    cardsLink.href = "#";
            }
        });
    }
});


// ЗАКРЫТЬ МЕНЮ
if (timeClose) {
    timeClose.addEventListener('click', () => {
        timeWindow.classList.remove('active');
    });
}
// ОТКРЫТЬ МЕНЮ
if (orderSett) {
    orderSett.addEventListener('click', () => {
        timeWindow.classList.add('active');
    });
}


// ФИКС ШАПКА
// const cardsheight = cards.scrollHeight;
// console.log(cardsheight);
if (cards) {
    window.addEventListener('scroll', function (e) {
        let scrollTop = window.scrollY;
        if (scrollTop > cards.offsetTop && scrollTop < cards.offsetTop + 450) {
            tabsWrap.classList.add('fixed');
            allTabs.classList.add('fixed');
        } else {
            tabsWrap.classList.remove('fixed');
            allTabs.classList.remove('fixed');
        }
    });
}


tabsRowBtn.forEach((btn, i) => {
    btn.addEventListener('click', (e) => {
        orderBtn.href = btn.dataset.link;
        if (i == 0) {
            timeBtn.href = 'https://www.ozon.ru/brand/stoletovo-87092355/';
        } else if (i == 1) {
            timeBtn.href = 'https://www.wildberries.ru/brands/stoletovo';
        } else {
            timeBtn.href = 'https://pokupki.market.yandex.ru/catalog/rastitelnoe-maslo/18031467?hid=91335&glfilter=7893318%3A17796761';
        }

    });
});


//tabs
const tabs = (headerSelector, tabSelector, contentSelector, activeClass) => {
    const header = document.querySelector(headerSelector),
        tab = document.querySelectorAll(tabSelector),
        content = document.querySelectorAll(contentSelector);
    if (header) {
        function hideTabContent() {
            content.forEach(item => {
                item.classList.remove(activeClass);
            });

            tab.forEach(item => {
                item.classList.remove(activeClass);
            });
        }
        function showTabContent(i = 0) {
            content[i].classList.add(activeClass);
            tab[i].classList.add(activeClass);
        }
        hideTabContent();
        showTabContent();

        header.addEventListener('click', (e) => {
            const target = e.target;

            if (target &&
                (target.classList.contains(tabSelector.replace(/\./, "")) ||
                    target.parentNode.classList.contains(tabSelector.replace(/\./, "")))) {
                tab.forEach((item, i) => {
                    if (target == item || target.parentNode == item) {
                        hideTabContent();
                        showTabContent(i);

                    }
                });
            }
        });
    }
};


tabs('.tabs__row', '.tabs__row-btn', '.tabs__content-block', 'active');



//QUANTITY
let quantityButtons = document.querySelectorAll('.quantity__button');


if (quantityButtons.length > 0) {
    for (let index = 0; index < quantityButtons.length; index++) {
        const quantityButton = quantityButtons[index];
        quantityButton.addEventListener("click", function (e) {
            e.preventDefault();
            let value = parseInt(quantityButton.closest('.quantity').querySelector('input').value);
            if (quantityButton.classList.contains('quantity__button_plus')) {
                value++;
            } else {
                value = value - 1;
                if (value < 1) {
                    value = 1;
                }
            }
            quantityButton.closest('.quantity').querySelector('input').value = value;
        });
    }
}
// проверка на буквы
let quantInp = document.querySelector('.quantity__input input');
if (quantInp) {
    quantInp.addEventListener("input", function () {
        if (this.value.match(/[^0-9]/g)) {
            this.value = this.value.replace(/[^0-9]/g, "");
        }
    });
}


// const a = [1, 5, 87, 4, 123];

// const b = a.filter((item, index) => {
//     // if (item > 5) {
//     return index;
//     // }

// });

// console.log(b)

// const insta = document.querySelector('#instagram');
// (function () {
//     new InstagramFeed({
//         'username': 'andreygorohov1993',
//         'container': document.getElementById("insta"),
//         'display_profile': false,
//         'display_biography': false,
//         'display_gallery': true,
//         'display_captions': true,
//         'callback': function (data) {
//             // let instaArray = data.edge_owner_to_timeline_media.edges;

//             // for (let item of instaArray) {
//             //     console.log(item.node)
//             //     let element = item.node;
//             //     insta.insertAdjacentHTML('afterbegin', `
//             // 				<li>
//             // 					<a href="https://www.instagram.com/p/${element.shortcode}/" target="_blank">
//             // 						<img src="${element.thumbnail_src}"
//             // 							alt="${element.accessibility_caption}">
//             // 					</a>
//             // 				</li>
//             // 			`);
//             // }
//         },
//         'styling': false,
//         'items': 8,
//         'items_per_row': 4,
//         'margin': 1
//     });
// })();

// const sections = document.querySelectorAll('section');

// const observer = new IntersectionObserver((entries) => {
//     entries.forEach(entry => {
//         if (entry.isIntersecting) {
//             // console.log(entry.target.classList.value)
//         }
//     });
// }, {
//     threshold: 0.7,
// });


// sections.forEach(section => {
//     observer.observe(section);
// });


const videos = document.querySelectorAll('.video');

let generateUrl = (id) => {
    let query = '?rel=0&showinfo=0&autoplay=1';

    return 'https://www.youtube.com/embed/' + id + query;
};

// creating iframe
let createIframe = function (id) {
    let iframe = document.createElement('iframe');

    iframe.setAttribute('allowfullscreen', '');
    iframe.setAttribute('allow', 'autoplay; encrypted-media');
    iframe.setAttribute('src', generateUrl(id));

    return iframe;
};

// console.log(generateUrl(id))

videos.forEach((el) => {
    let videoHref = el.dataset.video,
        deletedLength = 'https://youtu.be/'.length,
        videoId = videoHref.substring(deletedLength, videoHref.length),
        img = el.querySelector('img'),
        youtubeImgSrc = 'https://i.ytimg.com/vi/' + videoId + '/maxresdefault.jpg';

    if (img.getAttribute('src') == '') {
        img.src = youtubeImgSrc;
    }
    el.addEventListener('click', (e) => {
        e.preventDefault();
        // console.log(generateUrl(videoId))
        // console.log(videoId)
        let iframe = createIframe(videoId);
        console.log(videoId)
        el.querySelector('img').remove();
        el.appendChild(iframe);
        el.querySelector('button').remove();
    });
    // console.log(generateUrl(videoId))
});




});