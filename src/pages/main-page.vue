<template>
  <div class="main-page">
    <h2>Github's Trending JavaScript repositories</h2>
    <div class="repo__table">
      <div class="repo__header">
        <div class="search__wrapper">
          <input
            type="text"
            v-model="searchValue"
            placeholder="search by stars, name or author"
          />
          <button type="button" class="vs__clear" @click="clearResults">
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10">
              <path
                d="M6.895455 5l2.842897-2.842898c.348864-.348863.348864-.914488 0-1.263636L9.106534.261648c-.348864-.348864-.914489-.348864-1.263636 0L5 3.104545 2.157102.261648c-.348863-.348864-.914488-.348864-1.263636 0L.261648.893466c-.348864.348864-.348864.914489 0 1.263636L3.104545 5 .261648 7.842898c-.348864.348863-.348864.914488 0 1.263636l.631818.631818c.348864.348864.914773.348864 1.263636 0L5 6.895455l2.842898 2.842897c.348863.348864.914772.348864 1.263636 0l.631818-.631818c.348864-.348864.348864-.914489 0-1.263636L6.895455 5z"
              />
            </svg>
          </button>
          <button type="button" class="button" @click="searchByString">
            search
          </button>
        </div>
        <div class="v-select__wrapper">
          <p>Sort by:</p>
          <vSelect
            :options="['stars', 'repo-name', 'owner']"
            v-model="selected"
            :searchable="false"
            @input="sort"
          ></vSelect>
        </div>
      </div>
      <p v-if="errorControllers.search" class="error__message"> {{errorMessages.search}}</p>
      <p v-if="errorControllers.apiRequest" class="error__message"> {{errorMessages.apiRequest}}</p>
      <RepoItem
        v-for="repo in sortedData"
        :key="repo.id"
        :repo_data="repo"
        :contributorsLoaded="contributorLoaded"
      ></RepoItem>
    </div>
  </div>
</template>

<script>
import RepoItem from "../components/repo-item";
import token from "../../token.js";
import vSelect from "vue-select";

export default {
  name: "main-page",
  props: {
    msg: String,
  },
  components: {
    RepoItem,
    vSelect,
  },
  data() {
    return {
      repoData: {},
      sortedData: [],
      contributorData: [],
      contrbutorUrls: [],
      reposFromDaysAgo: 60,
      contributorLoaded: false,
      selected: "stars",
      loaded: false,
      searchValue: "",
      errorMessages: {
        search: 'Sorry, nothing was found with your search query, try again!',
        apiRequest: 'Sorry, could not get data from github.com, please try later or refresh the page'
      },
      errorControllers: {
        search: false,
        apiRequest: false,
      }
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
        Authorization: `TOKEN ${token}`,
      };

      fetch(url, {
        headers: headers,
      })
        .then((response) => response.json())
        .then((data) => {
          this.repoData = data;
          for (let i = 0; i < this.repoData.items.length; i++) {
            this.contrbutorUrls.push(this.repoData.items[i].contributors_url);
            this.repoData.items[i].contributors = [];
          }
          this.repoData.contributors = [];
          this.fetchContributors();
        })
        .catch((error) => {
          this.$preloaders.close();
          this.errorControllers.apiRequest = true;
          throw new Error(error);
        });
    },
    async fetchContributors() {
      const headers = {
        Authorization: `TOKEN ${token}`,
      };
      Promise.all(
        this.contrbutorUrls.map((url) => fetch(url, { headers: headers }))
      )
        .then((responses) => Promise.all(responses.map((res) => res.json())))
        .then((data) => {
          this.repoData.contributors.push(data);
          this.contributorLoaded = true;
          for (let i = 0; i < this.repoData.items.length; i++) {
            this.repoData.items[i].contributors.push(data[i]);
          }
          this.sort();
        })
        .then(() => {
          this.$preloaders.close();
        })
        .catch((error) => {
          this.$preloaders.close();
          this.errorControllers.apiRequest = true;
          throw new Error(error);
        });
    },
    searchByString() {
      if (this.searchValue.length) {
        this.sortedData = JSON.parse(JSON.stringify(this.repoData.items));
        this.sortedData = this.sortedData.filter((item) => {
          return (
            item.name.toLowerCase().includes(this.searchValue.toLowerCase()) ||
            item.stargazers_count.toString().includes(this.searchValue) ||
            item.owner.login
              .toLowerCase()
              .includes(this.searchValue.toLowerCase())
          );
        });
        if (this.sortedData.length == 0) {
          this.errorControllers.search = true;
        }
      }
    },
    clearResults() {
      this.sort();
      this.searchValue = "";
    },
    sort() {
      this.loaded = true;
      this.sortedData = JSON.parse(JSON.stringify(this.repoData.items));
      this.sortedData.sort((a, b) => {
        switch (this.selected) {
          case "stars":
            return (
              parseFloat(b.stargazers_count) - parseFloat(a.stargazers_count)
            );
          case "repo-name":
            if (a.name.toLowerCase() < b.name.toLowerCase()) {
              return -1;
            }
            if (a.name.toLowerCase() > b.name.toLowerCase()) {
              return 1;
            }
            return 0;
          case "owner":
            if (a.owner.login.toLowerCase() < b.owner.login.toLowerCase()) {
              return -1;
            }
            if (a.owner.login.toLowerCase() > b.owner.login.toLowerCase()) {
              return 1;
            }
            return 0;
          default:
            return this.sortedData;
        }
      });
    },
  },
  created() {
    this.$preloaders.open({
      assetSrc: "https://i.giphy.com/media/TvLuZ00OIADoQ/giphy.webp",
      overlayStyle: {
        backgroundColor: "#1874d2",
        opacity: 1,
      },
    });
    this.fetchRepos();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "~vue-select/dist/vue-select.css";
.v-select__wrapper p {
  margin-bottom: 10px;
}

h2 {
  margin-bottom: 40px;
  text-align: center;
}
.main-page {
  position: relative;
  width: 100%;
}
.repo__header {
  padding: 20px;
  background-color: #f6f8fa;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.repo__table {
  width: 800px;
  margin: 0 auto;
  border: 1px solid black;
}

.repo-table__header {
  background: gray;
  padding: 20px;
}
.error__message{
  padding: 15px;
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

.search__wrapper {
  position: relative;
  display: flex;
}
.search__wrapper input {
  height: 34px;
  padding: 0 10px;
  padding-right: 20px;
  width: 250px;
  margin-right: 10px;
}
.search__wrapper .vs__clear {
  position: absolute;
  left: 230px;
  top: 50%;
  transform: translateY(-50%);
}
.v-select__wrapper .v-select {
  width: 200px;
}

.button {
  width: 70px;
  height: 34px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 10px;
  color: #fff;
  background-color: #2ea44f;
  border-color: rgba(27, 31, 35, 0.15);
  box-shadow: 0 1px 0 rgba(27, 31, 35, 0.1),
    inset 0 1px 0 hsla(0, 0%, 100%, 0.03);
  border-radius: 2px;
}
</style>
