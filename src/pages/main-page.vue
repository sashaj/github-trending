<template>
  <div class="main-page">
    <h2>Github's Trending JavaScript repositories</h2>
    <div class="repo__table">
      <RepoItem v-for="repo in repoData.items" :key="repo.id" :repo_data="repo">
      </RepoItem>
    </div>
  </div>
</template>

<script>
import RepoItem from "../components/repo-item";
export default {
  name: "payment-page",
  props: {
    msg: String,
  },
  components: {
    RepoItem,
  },
  data() {
    return {
      repoData: {},
      sortedData: {},
      contributorData: [],
      reposFromDaysAgo: 365,
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
        Authorization: `TOKEN b881920275ca313bd99f48641c37650c582e3aa0`,
      };
      fetch(url, {
        headers: headers,
      })
        .then((response) => response.json())
        .then((data) => {
          this.repoData = data;
          //create contributors array in each item
          for (let i = 0; i < this.repoData.items.length; i++) {
            this.repoData.items[i].contributors = [];
          }
          //for each item make a request for contributors
          for (let i = 0; i < this.repoData.items.length; i++) {
            this.fetchContributors(this.repoData.items[i].contributors_url, i);
          }
        })
        .then(() => {})
        .catch((error) => {
          throw new Error(error);
        });
    },
    fetchContributors(url, i) {
      const headers = {
        Authorization: `TOKEN b881920275ca313bd99f48641c37650c582e3aa0`,
      };
      fetch(url, {
        headers: headers,
      })
        .then((response) => response.json())
        .then((data) => {
          let limiter = data.slice(0, 5);
          this.repoData.items[i].contributors.push(limiter);
          console.log(this.repoData);
        })
        .catch((error) => {
          throw new Error(error);
        });
    },
  },
  mounted() {
    this.fetchRepos();
  },
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
