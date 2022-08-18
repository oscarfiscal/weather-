<template>
  <div>
    <b-breadcrumb>
      <b-breadcrumb-item active>Google Maps</b-breadcrumb-item>
    </b-breadcrumb>
    <h1 class="page-title">
      Google <span class="fw-semi-bold">Maps</span>
    </h1>
    <b-row>
      <b-col xs="12" md="10">
        <Widget
                title="<h5>Vue Google Maps </h5>"
                customHeader close collapse
        >
          <div>
    <div>
      <h2>Selecione un lugar</h2>
      <GmapAutocomplete 
        @place_changed='setPlace'
      />
      <button
        @click='addMarker'
      >
        Buscar
      </button>
    </div>
    <br>
    <GmapMap
      :center='center'
      :zoom='12'
      style='width:100%;  height: 400px;'
    >
       <gmap-marker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        :clickable="true"
        :draggable="true"
        @click="toggleInfoWindow(m, index)"
        
      >
      </gmap-marker>
  
      <GmapMarker
       v-for="(markers, index) in markerss"
        :key="index"
        :position="markers.position"
      />
       <gmap-info-window
        :options="infoOptions"
        :position="infoWindowPos"
        :opened="infoWinOpen"
        :content="infoContent"
        @closeclick="infoWinOpen = true"
      >
        <div v-html="infoContent"></div>
      </gmap-info-window>
    </GmapMap>
  
  </div>
      
          
        </Widget>
      </b-col>
    </b-row>
  </div>
</template>

<script>
  import Widget from '@/components/Widget/Widget';

  export default {
    name: 'Maps',
    data() {
      return {
       center: { lat: 45.508, lng: -73.587 },
       city: '',
      currentPlace: null,
      markers: [],
      places: [],
      tem:"",
      weather:"",
      humidity:"",

        markerss: [],
      infoContent: "",
      infoWindowPos: {
        lat: 0,
        lng: 0,
      },
      infoWinOpen: false,
      currentMidx: null,
      infoOptions: {
        pixelOffset: {
          width: 0,
          height: -35,
        },
      },
      

      }
    },
    mounted() {
   
  },
    methods: {
    setPlace(place) {
      this.currentPlace = place;
    },
    addMarker() {
      if (this.currentPlace) {
        const marker = {
          lat: this.currentPlace.geometry.location.lat(),
          lng: this.currentPlace.geometry.location.lng(),
        };
        this.markers.push({ position: marker });
        this.places.push(this.currentPlace);
        this.center = marker;
        this.currentPlace = null;
        
       var url = "https://api.openweathermap.org/data/2.5/weather?q=" + this.places[0].formatted_address + "&appid=4bf0b3d51c05a1db52ee52b29014c84c";

         fetch(
          url,
        {
          method: "GET", 
      }
         )
         .then(response => response.json())
        .then(data => {
          // eslint-disable-next-line no-console
          this.city=data.name;
          this.temp = data.main.temp;
          this.weather = data.weather[0].description;
          this.humidity = data.main.humidity;

        
        })
        .catch(error => {
          // eslint-disable-next-line no-console
          console.log(error);
        });
      }
      setTimeout(() => {
         const data = new FormData();
      data.append('city', this.city);
      data.append('weather', this.weather);
      data.append('temperature', this.temp);
      data.append('humidity', this.humidity);
      data.append('start_date', new Date().toLocaleString());
      fetch("http://0.0.0.0/api/weather"
      , {
        method: "POST",
        body: data,
      })
      
      }, 1000);
     
      
      },
    geolocate: function() {
      navigator.geolocation.getCurrentPosition(position => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
      });
    },
    toggleInfoWindow: function(markers, idx) {
      // eslint-disable-next-line no-console
     
      this.infoWindowPos = markers.position;
      this.infoContent = this.getInfoWindowContent(markers);

      //check if its the same marker that was selected if yes toggle
      if (this.currentMidx == idx) {
        this.infoWinOpen = !this.infoWinOpen;
      }
      //if different marker set infowindow to open and reset current marker index
      else {
        this.infoWinOpen = true;
        this.currentMidx = idx;
      }
    },
     getInfoWindowContent: function() {
      return (
        `<div  style=" text-align: center; background:#2B2052; color:#fcbf00 "class="info-window">` +
        `<h4>Clima:</h4>` +
         `<h4>${this.weather}</h4>` +
        `<h4>Temperatura:</h4>` +
        `<h6>${this.temp} <sup>°C</sup></h6>` +
        `<h4>Humedad:</h4>` +
        `<h6>${this.humidity} <sup>%</sup></h6>` +
        `</div>` +
        `</div>`
      );
    },
    },
    created() {
     
    },
    components: { Widget }
  };
</script>

<style src="./Maps.scss" lang="scss" scoped />
