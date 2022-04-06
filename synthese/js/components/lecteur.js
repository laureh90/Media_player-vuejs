import externalTemplate from '../externalTemplate.js'


export default externalTemplate({

    template_url: "js/components/lecteur.html",

    //RECUPERER LE PROPS DE INDEX.HTML
    // props: ['propinfos'],//SE TRANSFORME EN DATA.

    data() {

        return {
            chansons: [],
            audio: new Audio(),
            playing: false,
            paused: false,
            temps: 0,
            image_affiche: "",
            titre_affiche: "",
            btn: false,
            volume_data: 0.5,
            progression_temps: 0,
            minutes: 0,
            seconds: 0,
            secondsTemps: 0,
            minutesTemps: 0,
            recherche: "",
            tags: "",
            tag: "",


        }
    },

    mounted() {
        fetch("chansons.json").then(resp => {
            //convertir en json
            resp.json().then(contenu_json => {
                //remplacer le contenu vide du tableau par contenu_json.
                this.chansons = contenu_json
            })
        })

        this.audio.addEventListener("play", e => {
            this.playing = true

        })

        this.audio.addEventListener("paused", e => {
            this.paused = false
        })


        /** barre de progression */
        this.audio.addEventListener("timeupdate", e => {
            this.progression_temps = this.audio.currentTime


        })

        /** clairement qu'il a une autre facon de proceder mais j'ai décidié de garder celle ci pour la conversion du temp */
        /** progression du temps */
        setInterval(() => {
            this.seconds = Math.ceil(this.progression_temps % 60)
            this.minutes = parseInt(this.progression_temps / 60, 10) % 60
        }, 1000)

        /** affichage du temps complet   */
        setInterval(() => {
            this.secondsTemps = Math.ceil(this.temps % 60)
            this.minutesTemps = parseInt(this.temps / 60, 10) % 60
        }, 1000)






    },


    methods: {

        /** play musique quand on clique sur la pastille tournante pour que la section footer montre les informations */
        playMusic(chansons) {
            this.audio.setAttribute("src", "images/" + chansons.audio)
            // this.progression_temps = chansons.audio.temps
            this.audio.play()

        },

        /** afficher image / titre /tag dans la liste */
        afficheImage(image) {
            this.image_affiche = 'images/' + image.image
        },

        afficherTags(tags) {
            this.tags = tags.tags

        },
        afficheTitre(titre) {
            this.titre_affiche = titre.titre

        },

        /** bouton play/pause en toggle quand le footer apparais */
        toggle() {

            if (this.audio.paused) {
                this.audio.play()
            }
            else {

                this.audio.pause()

            }

        },

        /** volume */
        changeVolume() {
            this.audio.volume = this.volume_data
        },

        /** possiblité d'avancer et de reculé la chanson */
        avanceRecule() {
            this.audio.currentTime = this.progression_temps

        },

        /** afficher temps de la chanson */
        definirTemps(chanson) {
            this.temps = chanson.temps
        },

        /** filtrer par nom/titre et tags */
        filtrer(info) {

            if (this.recherche == "") {
                return true

            } else if (this.recherche != "") {
                return info.artiste.toUpperCase().includes(this.recherche.toUpperCase())
                    + info.titre.toUpperCase().includes(this.recherche.toUpperCase())
                    + info.tags.includes(this.recherche)

            }

        },

        /** envoyer info du tag dans la barre de recherche */
        selectTags(select) {

            this.tag = select
            this.recherche = this.tag

        }

    }
})
