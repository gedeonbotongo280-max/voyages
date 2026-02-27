// SLIDER AUTOMATIQUE
let slides = document.querySelectorAll('.slide');
let currentSlide = 0;
if(slides.length > 0){
    function nextSlide(){
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide+1) % slides.length;
        slides[currentSlide].classList.add('active');
    }
    setInterval(nextSlide, 5000);
}



const reservationForm = document.getElementById('reservationForm');
if(reservationForm){
    reservationForm.addEventListener('submit', function(e){
        e.preventDefault();

        const nom = this[0].value;
        const email = this[1].value;
        const destination = this[2].value;
        const personnes = this[3].value;
        const moyenPaiement = document.getElementById('moyenPaiement').value;
        const numeroPaiement = document.getElementById('numeroPaiement').value;

        // Vérification obligatoire avant paiement
        if(!moyenPaiement){
            alert("Veuillez choisir un moyen de paiement !");
            return;
        }
        if(!numeroPaiement || numeroPaiement.length < 6){
            alert("Veuillez entrer un numéro de paiement valide !");
            return;
        }

        const montant = personnes * 500;

        // Simulation paiement
        if(confirm(`Payer ${montant}$ via ${moyenPaiement} (Numéro: ${numeroPaiement}) pour ${destination} ?`)){
            // Génération facture PDF simple
            const facture = `
SkyTravel - Facture
Nom: ${nom}
Email: ${email}
Destination: ${destination}
Nombre de personnes: ${personnes}
Montant: ${montant}$
Moyen de paiement: ${moyenPaiement}
Numéro de paiement: ${numeroPaiement}

Merci pour votre réservation !`;

            const blob = new Blob([facture], {type:'text/plain'});
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = `facture_${nom}_${destination}.txt`;
            link.click();

            alert('Paiement effectué et facture générée !');
            this.reset();
        }
    });
}


