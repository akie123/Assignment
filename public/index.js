let counter=60;

let x = setInterval(function() {



    document.getElementById("dem").innerHTML = counter.toString();

     counter--;


    if (counter< 0) {
      window.location.href='/project';
    }
}, 1000);