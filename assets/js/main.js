const $ = document;

$.addEventListener("DOMContentLoaded", () => {
  console.log("document chargé !");
  //Détection du click sur "envoie d'un email"
  $.querySelector("#btn-connect").addEventListener("click", () => {
    $.querySelector("#modal").classList.toggle("display");
  });
  $.querySelector(".close").addEventListener("click", () => {
    $.querySelector("#modal").classList.remove("display");
  });

  //Ecoute de la soumission du formulaire d'envoie d'emails
  $.querySelector("#formEmail").addEventListener("submit", async (event) => {
    //Anule l'effet par défaut du submit
    event.preventDefault();
    console.log("button envoyer cliqué");
    //Récupération des données du formulaire
    const data = {
      firstname: $.querySelector("#firstname").value,
      lastname: $.querySelector("#lastname").value,
      email: $.querySelector("#email").value,
      subject: $.querySelector("#subject").value,
      message: $.querySelector("#message").value,
    };
    //réponse du serveur
    const response = await axios.post(
      "https://tripadvisor-with-mailgun-amande.netlify.app/#",
      data
    );
    console.log(response);
    if (response.status === 200) {
      alert("formulaire soumis");
    } else {
      alert("Erreur");
    }
  });
});
