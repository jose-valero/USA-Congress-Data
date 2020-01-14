// Vue.component('spinner', require('./assets/ccs/spinner.vue'))

const app = new Vue({
  el: '#app',
  data: {
    message: 'Hello MindHub!',
    senate: null,
    house: null,
    estadisticas: { ...statistics },
    showReadMore: false,
    // loading: true

  },
  methods: {
    // the concatenation of fullName. If the fullName have a middle_name as null we avoid the upload of null data
    getNombreSenador: function (member) {
      let fullName = ""
      if (member.middle_name === null) {
        fullName = member.first_name + " " + member.last_name;
      } else {
        fullName = member.first_name + " " + member.middle_name + " " + member.last_name;
      }
      return fullName;
    },
    // for tables of loyalty, the real number of votes with the party
    getVotosML: function (member) {
      return (member.total_votes * member.votes_with_party_pct / 100).toFixed(0)
    },
    showReadMethod: function() {
      this.showReadMore = !this.showReadMore
    }
  },

  mounted() {
    axios.get('https://api.propublica.org/congress/v1/113/senate/members.json', { headers: { "x-api-key": "feJ7qngJR3vRpo8L9lzu8zfCPDnw4BuCC568YhVc" } })
      .then(CallBackResponse => {

        this.senate = CallBackResponse.data.results[0].members;
        senateCalSAG(this.senate, this.estadisticas);
        orderTablesSenate(this.senate, 'asc', 'missed_votes', "senate_most_engaged");
        orderTablesSenate(this.senate, 'desc', 'missed_votes', "senate_least_engaged");
        orderTablesSenate(this.senate, 'desc', 'votes_with_party_pct', "senate_most_loyal");
        orderTablesSenate(this.senate, 'asc', 'votes_with_party_pct', "senate_least_loyal")
        $(".spinner").removeClass();


      }).catch(err => {
        console.log("the server error is: ", err)
      })
    axios.get('https://api.propublica.org/congress/v1/113/house/members.json', { headers: { "x-api-key": "feJ7qngJR3vRpo8L9lzu8zfCPDnw4BuCC568YhVc" } })
      .then(CallBackResponse => {

        this.house = CallBackResponse.data.results[0].members;
        houseCalSAG(this.house, this.estadisticas);
        orderTablesHouse(this.house, 'asc', 'missed_votes', "house_most_engaged");
        orderTablesHouse(this.house, 'desc', 'missed_votes', "house_least_engaged");
        orderTablesHouse(this.house, 'desc', 'votes_with_party_pct', "house_most_loyal");
        orderTablesHouse(this.house, 'asc', 'votes_with_party_pct', "house_least_loyal");
        $(".spinner").removeClass();

      }).catch(err => {
        console.log("the server error is: ", err)
      })
  }

});
