mapboxgl.accessToken = 'pk.eyJ1Ijoic2VtYTAwNSIsImEiOiJjazUzbHZldmgwMXVjM2puNmZndGZvODRnIn0.mHwQlDaKmvgJKCcmSZkJZg';
var map = new mapboxgl.Map({container: 'map', style: 'mapbox://styles/sema005/ck60g0cog0cum1io5m6x4bylq'});

const oppgave = document.querySelector("#oppgave");

let feil = 0;
let riktig = 0;



map.on("load", () => {

    map.addLayer({
        id: "europa",
        type: "fill",
        paint: {
            "fill-color": "rgba(180, 180, 180, 0.3)"
        },
        source: {
            type: "geojson",
            data: "heleverden.json"
        }
    })
})
let i = 0

oppgave.innerHTML = `
    <div>
        <h1>${spørsmål[i].spm_tekst}</h1>
        <img src=${spørsmål[i].bilde} alt="Oppgave bilde" >
    </div>
`

const options = {
    chart: {
        renderTo: "container",
        type: "bar"
    },
    title: {
        text: "Resultat"
    },
    xAxis: {
        categories: ["Resultat"]
    },
    yAxis: {
        min: 0,
        max: 10,
        title: {
            text: "Test"
        }
    },
    series: [{
        name: "Riktig",
        data: [riktig],
        color: "green"
    },
    {
        name: "Feil",
        data: [feil],
        color: "red"
    }
]

}

const chart = new Highcharts.Chart(options);


map.on("click", "europa", (e) => {
    const svar = e.features[0].properties.name;

    if(svar === spørsmål[i].fasit) {
        console.log("riktig")
        riktig++
    }else {
        console.log("feil")
        feil++
    }
    i++
    console.log(svar, riktig, feil);

    oppgave.innerHTML = `
        <div>
            <h1>${spørsmål[i].spm_tekst}</h1>
            <img src=${spørsmål[i].bilde} alt="Oppgave bilde" >
        </div>
    `

    chart.series[0].update({data: [riktig]})
    chart.series[1].update({data: [feil]})

});


