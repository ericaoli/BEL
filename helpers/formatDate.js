// pour le formulaire d'édition de livres admin

function formatDateForInput(date) {
    const formattedDate = new Date(date).toISOString().split('T')[0];
    return formattedDate;
}
