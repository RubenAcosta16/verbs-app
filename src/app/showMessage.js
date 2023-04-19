import Toastify from 'toastify-js'


export function showMessage(message,type ="success"){
    // por si no conozco ese parametro, por defecto sera success
      Toastify({
          text: message,
          duration: 2000,
          destination: "https://github.com/apvarun/toastify-js",
          newWindow: true,
          close: true,
          gravity: "bottom", // `top` or `bottom`
          position: "right", // `left`, `center` or `right`
          stopOnFocus: true, // Prevents dismissing of toast on hover
          style: {
            background: type==="success"?"#0f0":"#f00",
          },
          onClick: function(){} // Callback after click
        }).showToast();
  }
  