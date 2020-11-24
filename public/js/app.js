const form = document.querySelector('form');

const input = document.querySelector('input');
const messageOne = document.querySelector('#message-one');
const messageTwo = document.querySelector('#message-two');

// messageOne.textContent = 'AA';
// messageTwo.textContent = 'BB';

form.addEventListener('submit', (event) => {
    const location = input.value;
    event.preventDefault();

    messageOne.textContent = 'Loading....';
    fetch('http://localhost:3000/weather?address=' + location).then(
        (res) => {
            res.json().then((data) => {
                if (data.error) {
                    messageOne.textContent = data.error;
                } else {
                    messageOne.textContent = data.location;
                    messageTwo.textContent = data.forecast;
                }
            });
        }
    );
});

// fetch('http://localhost:3000/weather?address=nandipulam').then(
//     (res) => {
//         res.json().then((data) => {
//             console.log(data);
//         });
//     }
// );
