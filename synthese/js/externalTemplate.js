export default function externalTemplate(vue_obj) {
    const style_erreur = "font-size: 20px; color: red; font-weight: bold; font-family: Consolas;"
    return Vue.defineAsyncComponent(() => {
        return new Promise((resolve, reject) => {
            fetch(vue_obj.template_url).then(resp => {
                if (resp.ok) {
                    return resp.text()
                } else {
                    console.error(`Le fichier ${vue_obj.template_url} n'est pas valide`)
                    return null
                }
            }).then(text => {
                if (text === null) {
                    vue_obj.template = `<span style="${style_erreur}">⚠ Template manquant : "${vue_obj.template_url}"⚠</span>`
                } else if (text === "") {
                    vue_obj.template = `<span style="${style_erreur}">⚠ Template vide : "${vue_obj.template_url}"⚠</span>`
                } else {
                    vue_obj.template = text
                }
                resolve(vue_obj)
            })
        })
    })
}
