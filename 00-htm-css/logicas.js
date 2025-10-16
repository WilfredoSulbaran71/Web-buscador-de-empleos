
// Lógica para cambiar el texto del botón al hacer clic
/*
const boton = document.querySelectorAll('.btn-aplicar')


boton.forEach(boton => {
    boton.addEventListener('click', function(){
        boton.textContent = 'Aplicado';
        boton.classList.add('selec')
         boton.disabled = true;
        
    })
})

*/

// Lógica moderna para cambiar el texto del botón al hacer clic

const jobsListingSection = document.querySelector('.jobs-listings')
jobsListingSection.addEventListener('click', function(event) {
    const element = event.target
    if (element.classList.contains('btn-aplicar')) {
        element.textContent = 'Aplicado'
        element.classList.add('selec')
        element.disabled = true
    }
})
// Nota: Asegúrate de que el archivo styles.css tenga la clase .seleccionado definida para cambiar el estilo del botón cuando se aplica.