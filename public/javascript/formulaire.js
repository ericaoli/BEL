// masquer les messages d'erreur lors d'un click sur les inputs

// attend que le DOM soit chargé
document.addEventListener('DOMContentLoaded', function () {
    // récupère les elements du html
    let errorMessage = document.querySelector('.message_error');
    let inputToHideError = document.querySelector('#hide_error');

    // Lors qu'il y a un click sur l'input
    inputToHideError.addEventListener('click', function () {
      // le message d'erreur est masqué
      errorMessage.style.display = 'none';
    });
  });