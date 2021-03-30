const $ = document;

$.addEventListener("DOMContentLoaded", () => {
  const lastname = $.getElementById("lastname");
  const firstname = $.getElementById("firstname");
  const email = $.getElementById("email");
  const subject = $.getElementById("subject");
  const message = $.getElementById("message");
  const error = $.getElementById("error");

  // Favoris
  $.querySelector("#btnFavoris").addEventListener("click", () => {
    console.log("click");
    $.querySelector("#btnFavoris").classList.toggle("favoris");
  });

  // Modal succès
  $.querySelector(".closeSuccess").addEventListener("click", () => {
    $.querySelector("#modalSuccess").classList.remove("display");
  });

  //Détection du click sur "envoie d'un email"
  $.querySelector("#btn-connect").addEventListener("click", () => {
    $.querySelector("#modal").classList.toggle("display");
    // Erreur
    error.classList.add("hidden");
    error.classList.remove("display");
  });
  $.querySelector(".close").addEventListener("click", () => {
    $.querySelector("#modal").classList.remove("display");
  });
  $.querySelector(".navigation").addEventListener("scroll", (e) => {
    let x = $.querySelector(".navigation").scrollLeft;
    console.log(x);
    if (x > 20) {
      $.querySelector(".btnCarLeft").classList.add("displayBtnCar");
    } else {
      $.querySelector(".btnCarLeft").classList.remove("displayBtnCar");
    }
  });

  let isLoading = false;
  //Ecoute de la soumission du formulaire d'envoie d'emails
  $.querySelector("#formEmail").addEventListener("submit", async (event) => {
    //Anule l'effet par défaut du submit
    event.preventDefault();
    if (
      firstname.value &&
      lastname.value &&
      email.value &&
      subject.value &&
      message.value
    ) {
      isLoading = true;

      if (isLoading) {
        $.getElementById("btn-sumit").classList.remove("display");
        $.getElementById("btn-sumit").classList.add("hidden");
        $.querySelector(".loader").classList.add("is-active");
      }
      //Récupération des données du formulaire
      const data = {
        firstname: firstname.value,
        lastname: lastname.value,
        email: email.value,
        subject: subject.value,
        message: message.value,
      };
      //réponse du serveur
      const response = await axios.post(
        "https://formulaire-backend-tripadvisor.herokuapp.com/",
        data
      );
      console.log(response);
      // Si la requete a fonctionnée
      if (response.status === 200) {
        isLoading = false;
        $.querySelector(".loader").classList.remove("is-active");
        // Réaffichage du bouton d'envoie
        $.getElementById("btn-sumit").classList.add("display");
        $.getElementById("btn-sumit").classList.remove("hidden");
        // Fermeture de la modale
        $.querySelector("#modal").classList.toggle("display");
        // vidage des input
        lastname.value = "";
        firstname.value = "";
        email.value = "";
        subject.value = "";
        message.value = "";

        // Ouverture modal succès
        $.querySelector("#modalSuccess").classList.toggle("display");
      } else {
        alert("Erreur");
      }
    } else {
      error.classList.add("display");
      console.log("empty");
    }
  });
});
