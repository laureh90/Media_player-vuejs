import acceuil from './components/acceuil.js'
import lecteur from './components/lecteur.js'


const app = {

    components: {

        "acceuil": acceuil,
        "lecteur": lecteur,

    },
    data() {
        return {
            page: "acceuil",//a changer
            lecteur: "lecteur",

        }

    },
    methods: {
        changerPage(nouvelle_page, lecteur_page) {
            //page dans le v-iff de index.html
            this.page = nouvelle_page
            this.lecteur = lecteur_page

        }

    }

}


Vue.createApp(app).mount("#app")