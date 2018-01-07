<template>
  <v-app id="comments">
    <header-toolbar></header-toolbar>
    <v-content>
      <v-container grid-list-lg>
        <section>
          <v-layout row wrap id="home-timeline-list">
            <v-flex xs12 text-xs-center>
              <v-card>
                <v-card-media
                  :src="postComment.image"
                  height="300px"
                >
                </v-card-media>
              </v-card>
            </v-flex>
            <v-flex xs12>
              <v-dialog v-model="dialog" persistent max-width="500px">
              <v-btn slot="activator" icon><v-icon color="purple" dark >comment</v-icon></v-btn>
              <v-card>
                <v-card-text>
                  <v-container grid-list-md>
                    <v-layout wrap>
                      <v-flex xs12>
                        <v-card flat>
                          <v-form @submit.prevent="addComment(form)" ref="form">
                            <v-container grid-list-xl fluid>
                              <v-layout wrap>
                                <v-flex xs12>
                                  <v-text-field
                                    v-model="form.text"
                                    :rules="rules.text"
                                    required
                                    color="blue darken-2"
                                    multi-line
                                  >
                                    <div slot="label">
                                      Comment
                                    </div>
                                  </v-text-field>
                                   <v-text-field
                                    :value="postComment._id"
                                    v-model="form.postId = postComment._id"
                                    :rules="rules.text"
                                    required
                                    disabled
                                    type="hidden"
                                  ></v-text-field>
                                </v-flex>
                              </v-layout>
                            </v-container>
                            <v-card-actions>
                              <v-btn flat @click="resetForm">Cancel</v-btn>
                              <v-spacer></v-spacer>
                              <v-btn
                                flat
                                color="primary"
                                type="submit"
                                :disabled="!formIsValid"
                              >Submit</v-btn>
                            </v-card-actions>
                          </v-form>
                        </v-card>
                      </v-flex>
                    </v-layout>
                  </v-container>
                  <small>*indicates required field</small>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="red" dark @click.native="dialog = false">Close</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            </v-flex>
            <v-flex xs12 v-for="item in comment" :key="item.id">
              <v-card flat>
                <v-card-actions>
                  <v-avatar size="36px" slot="activator">
                    <img :src="item.userId.image" alt="">
                  </v-avatar>
                  <b>&nbsp;{{item.userId.username}}</b>
                </v-card-actions>
                <v-card-text>
                  <p style="white-space: pre-wrap;">{{item.text}}</p>
                  <!-- <textarea style="width:100%;" :value="item.text">
                  </textarea> -->
                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
        </section>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Header from './Header'
import HomeTimeline from './Home-Timeline'
import { mapActions, mapState } from 'vuex'

export default {
  components: {
    'header-toolbar': Header,
    'home-timeline': HomeTimeline
  },
  data () {
    const defaultForm = Object.freeze({
      text: '',
      postId: ''
    })
    return {
      form: Object.assign({}, defaultForm),
      rules: {
        text: [val => (val || '').length > 0 || 'This field is required']
      },
      dialog: false,
      defaultForm
    }
  },
  created () {
    let id = this.$route.params.id
    // console.log(id)
    this.getPostComments(id)
    this.getComments(id)
  },
  methods: {
    ...mapActions([
      'getPostComments',
      'getComments',
      'addComment'
    ]),
    resetForm () {
      this.form = Object.assign({}, this.defaultForm)
      this.$refs.form.reset()
    },
  },
  computed: {
    formIsValid () {
      return (
        this.form.text
      )
    },
    ...mapState([
      'postComment',
      'comment'
    ])
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  #keep main .container {
    height: 660px;
  }
  
  /* Visibility */
  /* Desktop and bigger */
  @media (min-width: 960px) {
    #toolbar{
      padding: 0 55px !important;
    }
  }
  /* Tablets portrait */
  @media (min-width: 768px) and (max-width: 959px) {

  }
  /* Phone landscape and smaller*/
  @media (max-width: 767px) {
  }
</style>
