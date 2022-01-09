const weatherForm = document.querySelector("form");
const formInput = document.querySelector("input");
const message = document.querySelector("#message");
const error_message = document.querySelector("#error_message");
weatherForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const location = formInput.value;
  fetch("http://localhost:3000/weather?address=" + location)
    .then((res) => {
      res.json().then((res) => {
        if (res.err) {
          error_message.textContent = res.err;
          message.textContent = "";
        } else {
          message.textContent = `The temperature in ${res.location} is ${res.forecast.temp} but it feels like ${res.forecast.feelslike}`;
          error_message.textContent = "";
        }
      });
    })
    .catch((err) => console.log(err));
});
