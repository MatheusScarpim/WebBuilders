document.addEventListener("DOMContentLoaded", function () {
    const hamburger = document.querySelector(".hamburguer");
    const mobileMenu = document.querySelector(".mobile-menu");
    const blurBackground = document.querySelector(".blur-background");
    // const overlaybackground = document.querySelector(".overlay");

    hamburger.addEventListener("click", function () {
        mobileMenu.classList.toggle("active");
        blurBackground.style.display = blurBackground.style.display === "block" ? "none" : "block";
    });

    document.addEventListener("click", function (event) {
        if (!mobileMenu.contains(event.target) && !hamburger.contains(event.target)) {
            mobileMenu.classList.remove("active");
            blurBackground.style.display = "none";
        }
    });
    
    function previewImage() {
        var preview = document.querySelector('#imagePreview');
        var image = document.querySelector('#image');
        var file = document.querySelector('#exampleFormControlFile1').files[0];
        var reader = new FileReader();
    
        reader.onload = function(e) {
            image.src = e.target.result;
        };
    
        if (file) {
            reader.readAsDataURL(file);
        } else {
            image.src = '';
        }
    }
    
    // Selecionar elementos do DOM
    const showModalButton = document.getElementById('showModal');
    const overlay = document.getElementById('overlay');
    const modal = document.getElementById('modal');
    const confirmButton = document.getElementById('confirm');
    const cancelButton = document.getElementById('cancel');
    
    // Função para mostrar o pop-up
    showModalButton.addEventListener('click', () => {
        overlay.style.display = 'block';
        modal.style.display = 'block';
    });
    
    // Função para esconder o pop-up
    function hideModal() {
        overlay.style.display = 'none';
        modal.style.display = 'none';
    }
    
    // Evento de clique no botão "Sim"
    confirmButton.addEventListener('click', () => {
        // Coloque aqui o código a ser executado quando o usuário clica em "Sim"
        alert('Reserva confirmada!');
        hideModal();
    });
    
    // Evento de clique no botão "Não"
    cancelButton.addEventListener('click', () => {
        // Coloque aqui o código a ser executado quando o usuário clica em "Não"
        hideModal();
    });   

    // Evento de clique no fundo escuro para fechar o modal
    blurBackground.addEventListener('click', () => {
        hideModal();
    });

    // Adicione a seguinte linha para também fechar o modal quando o overlay é clicado
    overlay.addEventListener('click', () => {
        hideModal();
    });

});

