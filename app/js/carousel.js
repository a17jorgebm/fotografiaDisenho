document.addEventListener('DOMContentLoaded', ()=>{
    let carousel = document.getElementById('carousel')
    let horizontal = document.querySelector("#carousel .horizontal")

    // Configura el Intersection Observer
    const observerOptions = {
        root: null,  // Usa el viewport como área de referencia
        threshold: 0.8 // 80% del elemento visible
    };

    // Callback que se ejecuta cuando el carousel entra o sale del viewport
    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            // Verifica si el 80% del carousel está visible
            if (entry.isIntersecting && entry.intersectionRatio >= 0.8) {
                // Si está visible el 80%, añadir la clase 'scrollable'
                entry.target.classList.add('scrollable');
            } else {
                // Si no está visible el 80%, eliminar la clase 'scrollable'
                entry.target.classList.remove('scrollable');
            }
        });
    };

    // Crear el IntersectionObserver con el callback y las opciones
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    observer.observe(carousel);


    //habilitar scroll horizontal
    let isScrolling = false
    carousel.addEventListener('wheel', (e) => {
        let deltaY = e.deltaY
        //dont do horizontal scroll if:
        // a. the left side is showing and the scroll is going upside
        // b. the right side is showing and the scroll is going down
        if (
            !carousel.classList.contains('scrollable') || //si no se está viendo el 80% del container no se hace
            (isLeftSideVisible(horizontal) && deltaY<0) ||
            (isRightSideVisible(horizontal) && deltaY>0)
        ){
            //do the default event behavior
        }else {
            e.preventDefault();
            if (!isScrolling) {
                isScrolling = true;
                // Scroll by a fixed amount proportional to the deltaY
                carousel.scrollLeft += deltaY*3;

                // Reset the throttle after 100ms
                setTimeout(() => {
                    isScrolling = false;
                }, 100);
            }
        }
    })

    function isLeftSideVisible(element) {
        const rect = element.getBoundingClientRect();
        // Check if the left side of the element is within the viewport
        return rect.left >= 0 && rect.left < window.innerWidth;
    }
    function isRightSideVisible(element) {
        const rect = element.getBoundingClientRect();
        // Check if the right side of the element is within the viewport
        return rect.right >= 0 && rect.right <= window.innerWidth;
    }

})
