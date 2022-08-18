<template>
  <div class="tables-basic">
    <b-breadcrumb>
      <b-breadcrumb-item active></b-breadcrumb-item>
    </b-breadcrumb>
    <h2 class="page-title">Historial de consultas </h2>
    <b-row>
      <b-col>
        <Widget
          title="<h5>Table <span class='fw-semi-bold'>Styles</span></h5>"
          customHeader settings close
        >
          <div class="table-resposive">
            <table class="table">
              <thead>
                <tr>
                  <th class="hidden-sm-down">#</th>
                  <th>Ciudad</th>
                  <th>Clima</th>
                  <th class="hidden-sm-down">temperatura</th>
                  <th class="hidden-sm-down">Humedad</th>
                  <th class="hidden-sm-down">Fecha de consulta</th>
                 
                </tr>
              </thead>
              <tbody>
                <tr v-for="row in tableStyles2" :key="row.id">
                           
                  <td>{{row.id}}</td>
                  <td>
                   {{row.city}}
                  </td>
                  <td>
                     {{row.weather}}
                 
                  </td>
                  <td>
                    {{row.temperature}}
                  </td>
                  <td class="text-muted">
                  
                    {{row.humidity}}%
                  </td>
                  <td class="text-muted">
                    {{row.start_date}}
                  </td>
                  <td class="width-150">
               
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        
        </Widget>
      </b-col>
    </b-row>
  
  </div>
</template>

<script>

import Widget from '@/components/Widget/Widget';


export default {
  name: 'Tables',
  components: { Widget},
  data() {
    return {
   tableStyles2:[],
    };
    
  },
  
  methods: {},
  mounted() {
      
      fetch ("http://0.0.0.0/api/weather"
      , {
        method: "GET",
      })
 
      .then(response => response.json())
      .then(data => {
        var recuperar = data;
        recuperar.forEach((element) => {
          this.tableStyles2.push(element);
        });
       
        // eslint-disable-next-line no-console
        console.log(this.tableStyles2);
      })
      // eslint-disable-next-line no-console
      .catch(error => console.log(error));
  },
};

        // eslint-disable-next-line no-console
       
     
 
</script>

<style src="./Tables.scss" lang="scss" scoped />
