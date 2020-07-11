<template>
  <div class="repo-table__item">
    <div class="repo-table__title-wrapper">
      <svg
        height="16"
        mr="1"
        color="gray"
        viewBox="0 0 16 16"
        version="1.1"
        width="16"
        aria-hidden="true"
      >
        <path
          fill-rule="evenodd"
          d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z"
        />
      </svg>
      <a :href="repo_data.html_url" class="repo-table__owner">{{
        repo_data.owner.login
      }} </a>
      <span class="separator"> / </span>
      <a :href="repo_data.html_url" class="repo-table__name"> {{
        repo_data.name
      }}</a>
    </div>
    <p class="repo-table__description">{{ repo_data.description }}</p>
    <a :href="repo_data.html_url" class="repo-table__stars">
      <svg
        height="16"
        class="octicon octicon-star"
        aria-label="star"
        viewBox="0 0 16 16"
        version="1.1"
        width="16"
        aria-hidden="true"
      >
        <path
          fill-rule="evenodd"
          d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25zm0 2.445L6.615 5.5a.75.75 0 01-.564.41l-3.097.45 2.24 2.184a.75.75 0 01.216.664l-.528 3.084 2.769-1.456a.75.75 0 01.698 0l2.77 1.456-.53-3.084a.75.75 0 01.216-.664l2.24-2.183-3.096-.45a.75.75 0 01-.564-.41L8 2.694v.001z"
        />
      </svg>
      {{ repo_data.stargazers_count }}
    </a>
    <div v-if="contributorsLoaded">
      <div
        class="v-catalogue-item__contributors"
        v-for="(item, index) in repo_data.contributors"
        :key="index"
      >
        <span class="contributors">Contributors: </span>

        <a
          class="v-catalogue-item__image"
          v-for="element in item"
          :key="element.id"
          :href="element.html_url"
          :title="element.login"
        >
          <img :src="element.avatar_url" />
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "repo-item",
  props: {
    repo_data: {
      type: Object,
      default: function() {
        return {};
      },
    },
    contributorsLoaded: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
  methods: {
    // printImages(){
    //   for (let i = 0; i < contributors_data.length; i++){
    //      for (let j = 0; j < i.length; j++){
    //     }
    //   }
    // },
    // getTemplate(src){
    //      const template = `
    //     <img src=${src}/>
    //   `
    //   return template;
    // }
  },
  computed: {
    checkLoading() {
      return this.contributorsLoaded ? true : false;
    },
  },
  mounted() {},
};
</script>
<style scoped lang="scss">
.repo-table__items-wrapper {
  display: flex;
  flex-direction: column;
}

.repo-table__item {
  display: flex;
  flex-direction: column;
  padding: 20px;
  border-bottom: 1px solid lightgray;
}

.repo-table__title-wrapper{
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}
.repo-table__title-wrapper{
  svg{
    margin-right: 5px;
  }
}
.v-catalogue-item__contributors {
  display: flex;
}
.v-catalogue-item__image {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  cursor: pointer;
  overflow: hidden;
  margin-right: 4px;
}


.separator{
  margin-left: 5px;
  margin-right: 5px;
}
.repo-table__description{
  color: #586069;
  margin-bottom: 10px;
}

.repo-table__stars{
  margin-bottom: 10px;
  display: flex;
  align-items: center;
}
.repo-table__stars svg{
  margin-right: 5px;
}
.contributors{
  margin-right: 5px;
}
</style>
