<template>
  <div class="visits-page">
    <b-row>
      <b-col lg="12">
        <Widget class="bg-transparent">
        <!--   <Map /> -->
          <Maps/>
        </Widget>
      </b-col>
      <b-col lg="4" offset-lg="1">
       
      </b-col>
    </b-row>
    <b-row>
     
    </b-row>
    <b-row>
     
    </b-row>
  </div>
</template>

<script>

import Widget from '@/components/Widget/Widget';
import Maps from '@/pages/Maps/Maps';

export default {
  name: 'Visits',
  components: {
    Widget,  Maps
  },
  data() {
    return {
     
    
    };
  },
  methods: {
  },
  mounted () {
  },
};
</script>

<style src="./Visits.scss" lang="scss" />
