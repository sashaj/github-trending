<template>
  <div class="main-page">
    <h2>Github's Trending JavaScript repositories</h2>
    <div class="repo__table">
      <div class="repo__header">
        
      </div>
      <RepoItem
        v-for="(repo) in repoData.items"
        :key="repo.id"
        :repo_data="repo"
        :contributors_data="repoData.contributors[0]"
        :contributorsLoaded="contributorLoaded"
      ></RepoItem>
    </div>
  </div>
</template>

<script>
import RepoItem from "../components/repo-item";
import token from "../../token.js";
export default {
  name: "payment-page",
  props: {
    msg: String
  },
  components: {
    RepoItem
  },
  data() {
    return {
      repoData: {},
      sortedData: {},
      contributorData: [],
      contrbutorUrls: [],
      reposFromDaysAgo: 365,
      contributorLoaded: false
    };
  },
  methods: {
    getPastDate(daysAgo) {
      const myCurrentDate = new Date();
      const myPastDate = new Date(myCurrentDate);
      myPastDate.setDate(myPastDate.getDate() - daysAgo);
      return myPastDate;
    },
    formatDate(date) {
      var d = new Date(date),
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();
      if (month.length < 2) month = "0" + month;
      if (day.length < 2) day = "0" + day;
      return [year, month, day].join("-");
    },
    async fetchRepos() {
      const url = `https://api.github.com/search/repositories?q=language:javascript+created:>=${this.formatDate(
        this.getPastDate(this.reposFromDaysAgo)
      )}&sort=stars&order=desc&`;
      const headers = {
        Authorization: `TOKEN ${token}`
      };

      fetch(url, {
        headers: headers
      })
        .then(response => response.json())
        .then(data => {
          this.repoData = data;
          for (let i = 0; i < this.repoData.items.length; i++) {
            this.contrbutorUrls.push(this.repoData.items[i].contributors_url);
            this.repoData.items[i].contributors = [];
          }
          this.repoData.contributors = [];
          this.fetchContributors();
        })
        .catch(error => {
          throw new Error(error);
        });
    },
    async fetchContributors() {
      const headers = {
        Authorization: `TOKEN ${token}`
      };
      Promise.all(
        this.contrbutorUrls.map(url => fetch(url, { headers: headers }))
      )
        .then(responses => Promise.all(responses.map(res => res.json())))
        .then(data => {
          this.repoData.contributors.push(data);          
          this.contributorLoaded = true;
          console.log(this.repoData);
          for (let i = 0; i < this.repoData.items.length; i++) {
            this.repoData.items[i].contributors.push(data[i]);
          }
        })
        .catch(error => {
          throw new Error(error);
        });
    }

    //   fetch(url, {
    //     headers: headers
    //   })
    //     .then(response => response.json())
    //     .then(data => {
    //       let limiter = data.slice(0, 5);
    //       this.contributorData.push(limiter);
    //     })
    //     .catch(error => {
    //       throw new Error(error);
    //     });
    // }
    // awaitAllPromises(count, asyncFn) {
    //   const promises = [];
    //   for (let i = 0; i < count; ++i) {
    //     promises.push(asyncFn());
    //   }
    //   return Promise.all(promises);
    // }
  },

  created() {
    this.fetchRepos();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.repo__table {
  max-width: 800px;
  margin: 0 auto;
  border: 1px solid black;
}

.repo-table__header {
  background: gray;
  padding: 20px;
}

h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
