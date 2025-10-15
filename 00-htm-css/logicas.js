const boton = document.querySelectorAll('.btn-aplicar')


boton.forEach(boton => {
    boton.addEventListener('click', function(){
        boton.textContent = 'Aplicado';
        boton.classList.add('selec')
         boton.disabled = true;
        
    })
})

