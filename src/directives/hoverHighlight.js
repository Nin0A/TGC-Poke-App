export default {
  mounted(el) {
    // Définir les fonctions de gestion des événements
    const mouseEnterHandler = () => {
      el.style.transition = 'transform 0.3s ease';
      el.style.transform = 'scale(1.1)';
    };

    const mouseLeaveHandler = () => {
      el.style.transition = 'transform 0.3s ease';
      el.style.transform = 'scale(1)';
    };

    // Ajouter les écouteurs d'événements
    el.addEventListener('mouseenter', mouseEnterHandler);
    el.addEventListener('mouseleave', mouseLeaveHandler);

    // Stocker les gestionnaires dans les propriétés de l'élément pour y accéder plus tard
    el._hoverHandlers = { mouseEnterHandler, mouseLeaveHandler };
  },
  unmounted(el) {
    // Récupérer les gestionnaires depuis les propriétés de l'élément
    const { mouseEnterHandler, mouseLeaveHandler } = el._hoverHandlers || {};

    // Retirer les écouteurs d'événements en utilisant les gestionnaires de la souris
    if (mouseEnterHandler) {
      el.removeEventListener('mouseenter', mouseEnterHandler);
    }
    if (mouseLeaveHandler) {
      el.removeEventListener('mouseleave', mouseLeaveHandler);
    }
  }
};
