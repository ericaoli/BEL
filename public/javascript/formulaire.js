// masquer les messages d'erreur lors d'un click sur les inputs

// attend que le DOM soit chargé
// document.addEventListener('DOMContentLoaded', function () {
//     // récupère les elements du html
//     let errorMessage = document.querySelector('.message_error');
//     let inputToHideError = document.querySelector('.input-error');

//     // Lors qu'il y a un click sur l'input
//     inputToHideError.addEventListener('click', function () {
//       // le message d'erreur est masqué
//       errorMessage.style.display = 'none';
//     });
//   });


// Attend que le DOM soit chargé
document.addEventListener('DOMContentLoaded', function () {
  // Ajoute un gestionnaire de clic à tous les champs d'entrée
  let inputFields = document.querySelectorAll('input');

  inputFields.forEach(function (input) {
      // Trouve le message d'erreur correspondant
      let errorMessage = document.getElementById(`message${input.name}`);

      // Si un message d'erreur est trouvé, ajoute un gestionnaire de clic
      if (errorMessage) {
          input.addEventListener('click', function () {
              // Masque le message d'erreur lors du clic
              errorMessage.style.display = 'none';
          });
      }
  });
});