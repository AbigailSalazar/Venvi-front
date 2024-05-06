export class LocacionesService {
    #urlServicio = "https://countriesnow.space/api/v0.1/"

    async obtenerPaises() {
        const requestOptions = {
            method: "GET",
            redirect: "follow"
        };

        try {
            const response = await fetch(this.#urlServicio + "countries/positions/", requestOptions)
            const paises = await response.json();
            return paises.data;
        } catch (error) {
            console.error(error); //TODO: manejar los errores
        }
    }


    async obtenerEstados(pais) {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "country": pais
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };
        try {
            const response = await fetch(this.#urlServicio + "countries/states", requestOptions)
            const estados = await response.json();
            return estados.data.states;
        } catch (error) {
            console.error(error); //TODO: manejar los errores
        }
    }

    async obtenerCiudades(pais,estado){
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "country": pais,
            "state":estado
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow"
        };
        try {
            const response = await fetch(this.#urlServicio + "countries/state/cities", requestOptions)
            const estados = await response.json();
            return estados.data;
        } catch (error) {
            console.error(error); //TODO: manejar los errores
        }
    }
}
