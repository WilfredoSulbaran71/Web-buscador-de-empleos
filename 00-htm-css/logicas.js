
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

/* Logica para los select */
const filter = document.querySelector('#filter-location','#filter-technology','#filter-modalidad','#filter-experiencia')
filter.addEventListener('change', function() {

})
const filtersContainer = document.querySelector('.search-filtros');
// Asegúrate de que este selector sea correcto si el ID o la clase cambia
const jobListings = document.querySelectorAll('.job-listing-card'); 

// ----------------------------------------------------
// FUNCIÓN PARA RECOLECTAR TODOS LOS VALORES SELECCIONADOS
// ----------------------------------------------------
function getActiveFilters() {
    const activeFilters = {};
    const selectElements = filtersContainer.querySelectorAll('select');
    
    selectElements.forEach(select => {
        // La clave del filtro: 'technology', 'location', 'modalidad', 'experiencia'
        const filterKey = select.id.replace('filter-', ''); 
        const selectedValue = select.value;
        
        // Solo guardamos el filtro si el valor no está vacío ("")
        if (selectedValue !== "") {
            activeFilters[filterKey] = selectedValue;
        }
    });
    
    return activeFilters;
}

// ----------------------------------------------------
// FUNCIÓN PARA APLICAR FILTROS A LOS ARTÍCULOS
// ----------------------------------------------------
function applyFilters() {
    const filters = getActiveFilters();
    const filterKeys = Object.keys(filters);

    jobListings.forEach(job => {
        let isMatch = true; // Asumimos que coincide inicialmente
        
        // 1. Iterar sobre CADA filtro activo (ej: Tecnología, Ubicación)
        filterKeys.forEach(key => {
            if (!isMatch) return; // Si ya falló un filtro, salta la verificación
            
            const requiredValue = filters[key]; // El valor que el usuario seleccionó (ej: 'js', 'Remoto')
            const jobValueString = job.dataset[key]; // El valor del artículo (ej: 'JavaScript, React y Node.js')

            if (!jobValueString) {
                // Si el artículo no tiene el atributo de datos, no es un match.
                isMatch = false;
                return; 
            }

            // ------------------------------------------------------------------
            // Lógica Especial para Tecnología (Múltiples Valores)
            // ------------------------------------------------------------------
            if (key === 'technology') {
                // Normaliza la cadena de tecnologías del artículo (ej: 'javascript,react y node.js')
                const jobTechnologies = jobValueString.toLowerCase(); 
                const requiredTech = requiredValue.toLowerCase(); // El valor seleccionado ('js')

                // Verificamos si la tecnología requerida está CONTENIDA en la cadena del artículo.
                // **Nota:** En tu HTML, la opción de JavaScript es 'js'. Si buscas 'js',
                // funcionará, pero si buscas 'python', la lógica debe ser más inteligente.
                
                // Opción más segura: Coincidencia de substring
                if (!jobTechnologies.includes(requiredTech)) {
                    isMatch = false;
                }
                
            // ------------------------------------------------------------------
            // Lógica Estándar para Ubicación, Modalidad y Experiencia (Valor Único)
            // ------------------------------------------------------------------
            } else {
                // Para Ubicación, Modalidad, Experiencia, la comparación debe ser exacta
                if (requiredValue !== jobValueString) {
                    isMatch = false;
                }
            }
        });
        
        // 2. Mostrar u Ocultar el Artículo
        if (isMatch) {
            job.style.display = ''; // Muestra el elemento (usa 'block' si no funciona el string vacío)
        } else {
            job.style.display = 'none'; // Oculta el elemento
        }
    });
}

// ----------------------------------------------------
// ADJUNTAR EL EVENT LISTENER
// ----------------------------------------------------
if (filtersContainer) {
    filtersContainer.addEventListener('change', function(event) {
        if (event.target.tagName === 'SELECT') {
            applyFilters(); // Llama a la función principal
        }
    });
}