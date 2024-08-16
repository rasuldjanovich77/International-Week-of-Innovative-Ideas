document.addEventListener("DOMContentLoaded", () => {
    "use strict";
    (function () {
        function countdown(countdownElem, date) {
            var targetDate = new Date(date).getTime();

            var interval = setInterval(function () {
                var now = new Date().getTime();
                var distance = targetDate - now;

                var days = Math.floor(distance / (1000 * 60 * 60 * 24));
                var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                var seconds = Math.floor((distance % (1000 * 60)) / 1000);

                const countdownElements = document.querySelectorAll(countdownElem);
                countdownElements.forEach(countdownElement => {
                    if (countdownElement.querySelector(".days")) {
                        countdownElement.querySelector(".days").innerHTML = days;
                    }
                    countdownElement.querySelector(".hours").innerHTML = hours;
                    countdownElement.querySelector(".minutes").innerHTML = minutes;
                    countdownElement.querySelector(".seconds").innerHTML = seconds;

                    if (distance < 0) {
                        clearInterval(interval);
                        countdownElement.innerHTML = "EXPIRED";
                    }
                });
            }, 1000);
        }

        // countdown("#et-banner-event-timer", "2024-03-30T00:00:00");
        // countdown("#et-upcoming-events-timer", "2024-03-30T00:00:00");
        countdown(".et-countdown", "2024-05-30T00:00:00");
    })();
});