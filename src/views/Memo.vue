<template>
  <div class="memo_container">
    <div class="memo_form_container">
      <div class="memo_form_title">
        <h3>Create your Memo</h3>
      </div>
      <div class="memo_form">
        <div class="memo_form_input">
          <textarea v-model="memo" rows="2" cols="1"></textarea>
        </div>
        <div class="memo_form_button">
          <span class="material-icons" @click="postMemo">
            add_box
          </span>
        </div>
      </div>
      <div class="memo_option_container">
        <div class="memo_option_priority">
          <h4>prioroty</h4>
          <select v-model="priority">
            <option value="5">5</option>
            <option value="4">4</option>
            <option value="3">3</option>
            <option value="2">2</option>
            <option value="1">1</option>
          </select>
        </div>
        <div class="memo_option_date">
          <h4>DeadLine</h4>
          <vue-timepicker v-model="deadLine"></vue-timepicker>
        </div>
      </div>
    </div>
    <br /><br />
    <div class="memo_index_container">
      <h3>Memo Index</h3>
      <div v-for="(post, index) in posts" :key="index" class="memo_index">
        <div class="memo_postcontainer">
          <div class="memo_post">{{ index }}:{{ post.memo }}</div>
          <div class="memo_post_updateicon">
            <span class="material-icons">
              settings
            </span>
            <span class="material-icons" @click="doneMemo(post.id)">
              check_circle
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase';
import VueTimepicker from 'vue2-timepicker';
import 'vue2-timepicker/dist/VueTimepicker.css';

export default {
  data() {
    return {
      memo: '',
      db: firebase.firestore(),
      posts: [],
      priority: 5,
      deadLine: {
        HH: '',
        mm: '',
      },
    };
  },
  computed: {
    recentId() {
      return this.posts.length + 1;
    },
  },
  created() {
    this.fetchFireBase();
  },
  methods: {
    postMemo() {
      this.db
        .collection('memo')
        .doc(this.recentId.toString())
        .set({
          memo: this.memo,
          priority: this.priority,
          deadLine: this.deadLine.HH + ':' + this.deadLine.mm,
          id: this.recentId,
        })
        .then(() => {
          this.posts = [];
          this.fetchFireBase();
        })
        .catch((error) => console.log('error', error));
      this.memo = '';
      this.deadLine = { HH: '', mm: '' };
      this.priority = 5;
    },
    fetchFireBase() {
      this.db
        .collection('memo')
        .orderBy('priority')
        .get()
        .then((res) => {
          res.forEach((docs) => {
            this.posts.unshift(docs.data());
          });
        });
    },
    doneMemo(id) {
      this.db
        .collection('memo')
        .doc(id.toString())
        .delete()
        .then(() => {
          this.posts = this.posts.filter((item) => {
            return item.id != id;
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  components: {
    VueTimepicker,
  },
};
</script>

<style>
.memo_container {
  text-align: center;
  margin-top: 75px;
}

.memo_form_container {
  width: 100%;
}
.memo_form {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.memo_form_input textarea {
  width: 500px;
  height: auto;
  font-size: 15pt;
  letter-spacing: 0.5px;
}

.memo_form_button span {
  font-size: 40pt;
  cursor: pointer;
}

.memo_option_container {
  width: 40%;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}

.memo_index_container {
  width: 100%;
  text-align: center;
}

.memo_postcontainer {
  display: flex;
  flex-direction: row;
  border: 1px solid rgba(77, 76, 76, 0.5);
  width: 50%;
  justify-content: space-around;
  margin: 0 auto;
  padding: 15px;
}

.memo_index {
  width: 100%;
}

.memo_post {
  width: 60%;
  display: inline-block;
}

p {
  margin: 0;
  display: inline-block;
}
</style>
