// masquer les messages d'erreur lors d'un click sur les inputs

document.addEventListener('DOMContentLoaded', function () {
  
    // récupère les éléments HTML pertinents
  let inputsToHideError = document.querySelectorAll('.input-error');

  // Ajoute un gestionnaire d'événements à chaque champ d'entrée
  inputsToHideError.forEach(function(input) {
      input.addEventListener('click', function () {
          // Trouve le message d'erreur associé à cet input et le masque
          let errorMessage = input.parentElement.querySelector('.message_error');

          if (errorMessage) {
              errorMessage.style.display = 'none';
          }
      });
  });
});


