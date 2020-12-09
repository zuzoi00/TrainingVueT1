<template>
  <div class="about">
    <h1>About Page</h1>
    <!-- v-card như kiểu 1 container có thể đựng đủ loại img, video, link bên trong -->
    <v-card
    class="mx-auto"
    max-width="500"
  >
    <v-list>
      <v-list-item-group v-model="model">
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
        >
          <v-list-item-icon>
            <!-- v-list-item-icon đã chỉnh sẵn các thuộc tính như margin, flexbox để các icon đẹp hơn -->
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.text"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>
  <v-container class="my-5">
    <!-- v-container tương đương với margin 0 auto -->
    <p class="red white--text">Once installed, locate your webpack.config.js file and copy the snippet below into the rules array. If you have an existing sass rule configured, you may need to apply some or all of the changes below. If you are you looking to utilize the vuetify-loader for treeshaking, ensure that you are on version >=4 of Webpack</p>
  </v-container>

<!-- ############################################################################################## 
Chip -->
  <v-row justify="center">
    <v-col
      cols="12"
      sm="7"
      md="6"
      lg="5"
    >
      <v-sheet
        elevation="10"
        rounded="xl"
      >
        <v-sheet
          class="pa-3 primary text-right"
          dark
          rounded="t-xl"
        >
          <v-btn icon>
            <v-list-item-icon>
              <!-- <v-icon>fas fa-address-book</v-icon> -->
              <v-icon>mdi-content-save-cog-outline</v-icon>
            </v-list-item-icon>
          </v-btn>
          <v-btn
            class="ml-2"
            icon
          >
            <v-icon>mdi-check-bold</v-icon>
          </v-btn>
        </v-sheet>

        <div class="pa-4">
          <v-chip-group
            active-class="primary--text"
            column
          >
            <v-chip
              v-for="tag in tags"
              :key="tag"
            >
              {{ tag }}
            </v-chip>
          </v-chip-group>
        </div>
      </v-sheet>
    </v-col>
  </v-row>
    
  </div>
</template>

<script>
export default {
  data(){
    return {
      items: [
        {
          icon: 'mdi-inbox',
          text: 'Inbox',
        },
        {
          icon: 'mdi-star',
          text: 'Star',
        },
        {
          icon: 'mdi-send',
          text: 'Send',
        },
        {
          icon: 'mdi-email-open',
          text: 'Drafts',
        },
      ],
      model: 1,
      tags: [
        'Work',
        'Home Improvement',
        'Vacation',
        'Food',
        'Drawers',
        'Shopping',
        'Art',
        'Tech',
        'Creative Writing',
      ],
    }
  }
}
</script>

<style>

</style>