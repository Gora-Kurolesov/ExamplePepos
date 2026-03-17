// Функция для обновления даты и времени
function updateDateTime() {
    const datetimeElement = document.getElementById('current-datetime');
    if (datetimeElement) {
        const now = new Date();
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            weekday: 'long'
        };
        datetimeElement.textContent = now.toLocaleString('ru-RU', options);
    }
}

// Обновляем время каждую секунду
setInterval(updateDateTime, 1000);

// Функция для получения погоды по координатам
function getWeatherByCoords(lat, lon) {
    window.location.href = `/weather?lat=${lat}&lon=${lon}`;
}

// Функция для получения прогноза по координатам
function getForecastByCoords(lat, lon) {
    window.location.href = `/forecast?lat=${lat}&lon=${lon}`;
}

// Геолокация
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        alert("Геолокация не поддерживается вашим браузером");
    }
}

function showPosition(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    
    // Спрашиваем пользователя, что он хочет получить
    const choice = confirm("Нажмите OK для текущей погоды, Отмена для прогноза на 7 дней");
    
    if (choice) {
        window.location.href = `/weather?lat=${lat}&lon=${lon}`;
    } else {
        window.location.href = `/forecast?lat=${lat}&lon=${lon}`;
    }
}

function showError(error) {
    let message = '';
    switch(error.code) {
        case error.PERMISSION_DENIED:
            message = "Пользователь отказал в доступе к геолокации";
            break;
        case error.POSITION_UNAVAILABLE:
            message = "Информация о местоположении недоступна";
            break;
        case error.TIMEOUT:
            message = "Запрос на получение местоположения превысил время ожидания";
            break;
    }
    alert(message);
}

// Функция для получения описания погоды по коду (на случай, если API не вернет описание)
function getWeatherDescription(code) {
    const weatherCodes = {
        0: "Ясно",
        1: "Преимущественно ясно",
        2: "Переменная облачность",
        3: "Пасмурно",
        45: "Туман",
        48: "Туман с изморозью",
        51: "Лежащая морось",
        53: "Умеренная морось",
        55: "Сильная морось",
        56: "Ледяная морось",
        57: "Сильная ледяная морось",
        61: "Небольшой дождь",
        63: "Умеренный дождь",
        65: "Сильный дождь",
        66: "Ледяной дождь",
        67: "Сильный ледяной дождь",
        71: "Небольшой снег",
        73: "Умеренный снег",
        75: "Сильный снег",
        77: "Снежные зерна",
        80: "Небольшие ливни",
        81: "Умеренные ливни",
        82: "Сильные ливни",
        85: "Небольшие снегопады",
        86: "Сильные снегопады",
        95: "Гроза",
        96: "Гроза с небольшим градом",
        99: "Гроза с сильным градом"
    };
    return weatherCodes[code] || "Неизвестно";
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Обновляем дату и время
    updateDateTime();
    
    // Добавляем класс fade-in к основному контейнеру
    const container = document.querySelector('.container');
    if (container) {
        container.classList.add('fade-in');
    }
    
    // Обработчик для формы с координатами (если есть)
    const coordForm = document.getElementById('coord-form');
    if (coordForm) {
        coordForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const lat = document.getElementById('lat').value;
            const lon = document.getElementById('lon').value;
            const type = document.getElementById('request-type').value;
            
            if (type === 'weather') {
                window.location.href = `/weather?lat=${lat}&lon=${lon}`;
            } else {
                window.location.href = `/forecast?lat=${lat}&lon=${lon}`;
            }
        });
    }
    
    console.log('Погодное приложение загружено!');
});
