const preloader = document.querySelector('.preloader');//элемент загрузки
preloader.style.cssText = 'position: absolute; margin-left: 93%';

const wrap = document.createElement('div');//wrap
wrap.style.cssText = 'display: flex;';
document.body.prepend(wrap);

const select = document.createElement('select');//элемент списка валют
select.classList.add('currency');
wrap.prepend(select);



const input = document.createElement('input');//input
input.id = 'sum';
input.setAttribute('placeholder', 'введите сумму');
input.style.cssText = 'margin-left: 15px;';
wrap.append(input);


const btn = document.createElement('button');//кнопка конвертации в рубли
btn.classList.add('currency-btn');
btn.textContent = 'Конвертировать в рубли';
btn.style.cssText = 'margin-top: 20px;';
preloader.after(btn);

const btn2 = document.createElement('button');//кнопка конвертации из валюту
btn2.classList.add('rub-btn');
btn2.textContent = 'Конвертировать в валюту';
btn2.style.cssText = 'margin-top: 20px; float: right;';
btn.after(btn2);

const outPutValueRub = document.createElement('input');
outPutValueRub.setAttribute('type', 'text');
outPutValueRub.style.cssText = 'margin-left: auto;';
wrap.append(outPutValueRub);

const currencyArr = ['выберите валюту', 'CNY', 'USD', 'EUR'];

const addElementsSelect = () => {
    //добавляем элементы в список
    currencyArr.forEach((item, index) => {
        select.options[index] = new Option(item, item, true, true);
    });
    select.value = 'выберите валюту';
}
addElementsSelect();



const currencyUrl = 'https://www.cbr-xml-daily.ru/daily_json.js';

const prom = (url) => {
    return fetch(url, {
        method: 'GET',
        mode: 'cors',
    })
};


btn.addEventListener('click', () => {
    prom(currencyUrl)
        .then(response => {
            if (response.status !== 200) {
                throw new Error();
            }
            return response.json();
        })
        .then(data => {
            const dataValute = data;
            for (let key in dataValute.Valute) {
                
                if (select.value === key) {
                    const currentValueValute = dataValute.Valute[key].Value;
                    outPutValueRub.value = Math.floor(input.value * currentValueValute);
                }
            }
        })
        .catch(error => console.log(error));
});

btn2.addEventListener('click', () => {
    prom(currencyUrl)
        .then(response => {
            if (response.status !== 200) {
                throw new Error();
            }
            return response.json();
        })
        .then(data => {
            for (let key in data.Valute) {
                if (select.value === key) {
                    const currentValueValute = data.Valute[key].Value;
                    preloader.textContent = Math.floor(outPutValueRub.value / currentValueValute) +
                     ' ' + select.value;
                }
            }
        })
})