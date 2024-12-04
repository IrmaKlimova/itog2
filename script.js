// Функция для сортировки товаров
function sortItems() {
    const sortBy = document.querySelector('input[name="sort"]:checked').id; // Получаем id выбранной радио-кнопки
    fetch("shop.json")
        .then(response => response.json())
        .then(data => {
            if (sortBy === "price") {
                data.sort((a, b) => a.price - b.price); // Сортировка по возрастанию цены
            } else if (sortBy === "title") {
                data.sort((a, b) => a.title.localeCompare(b.title)); // Сортировка в алфавитном порядке
            }
            renderItems(data); // Перерисовываем карточки
        })
        .catch(error => console.error("Ошибка сортировки:", error));
}

// Функция для поиска товаров
function searchItems() {
    const query = document.getElementById("search").value.toLowerCase(); // Получаем текст из строки поиска
    fetch("shop.json")
        .then(response => response.json())
        .then(data => {
            const filteredData = data.filter(item =>
                item.title.toLowerCase().includes(query) || // Проверяем, содержится ли запрос в названии
                item.description.toLowerCase().includes(query) // или в описании
            );
            renderItems(filteredData); // Перерисовываем карточки
        })
        .catch(error => console.error("Ошибка поиска:", error));
}


function collectAmounts() {
    // Получаем все поля ввода в карточках
    const inputs = document.querySelectorAll('#cards-container input[type="number"]');
    const params = []; // Храним параметры

    // Собираем значения из каждого input
    inputs.forEach((input, index) => {
        const amount = input.value || 0; // Если ничего не введено, значение будет 0
        params.push(`amount${index + 1}=${amount}`); // Создаём пары "amount1=2"
    });

    // Формируем строку параметров
    const queryString = params.join('&');

    // Устанавливаем строку запроса в action формы
    const form = document.getElementById('UserEnter');
    form.action = `https://www.bing.com/search?${queryString}`;

    console.log(form.action); // Проверяем в консоли результат

    return true; // Продолжаем отправку формы
}




// Функция для отрисовки товаров на странице
function renderItems(items) {
    const container = document.getElementById("cards-container");
    container.innerHTML = ""; // Очищаем контейнер перед вставкой новых карточек
    items.forEach((item, index) => {
        const card = document.createElement("div");
        card.classList.add("col-md-4", "mb-4");
        card.innerHTML = `
            <div class="card">
                <img src="${item.image}" class="card-img-top" alt="${item.title}">
                <div class="card-body">
                    <h5 class="card-title">${item.title}</h5>
                    <p class="card-text">${item.description}</p>
                    <p class="card-text"><strong>${item.price} $</strong></p>
                    <input type="number" min="0" value="0" class="form-control mb-2" name="amount${index + 1}">
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}


// Загрузка товаров при загрузке страницы
document.addEventListener("DOMContentLoaded", () => {
    fetch("shop.json")
        .then(response => response.json())
        .then(data => renderItems(data))
        .catch(error => console.error("Ошибка загрузки товаров:", error));
});
