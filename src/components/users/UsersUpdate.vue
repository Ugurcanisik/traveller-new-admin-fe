<template>
  <b-modal ref="updateUser" title="Kullanıcı Güncelle" hide-footer>
    <div class="modal-content">
      <div class="modal-body">

        <div class="form-group form-floating-label" :class="{'has-error': $v.updateUser.firstName.$error}">
          <input
              id="firstName"
              v-model="$v.updateUser.firstName.$model"
              type="text" class="form-control input-border-bottom" required>
          <label for="firstName" class="placeholder">firstName</label>
        </div>

        <div class="form-group form-floating-label" :class="{'has-error': $v.updateUser.lastName.$error}">
          <input
              id="lastName"
              v-model="$v.updateUser.lastName.$model"
              type="text" class="form-control input-border-bottom" required>
          <label for="lastName" class="placeholder">Soyisim</label>
        </div>

        <div class="form-group form-floating-label" :class="{'has-error': $v.updateUser.email.$error}">
          <input
              id="email"
              v-model="$v.updateUser.email.$model"
              type="text" class="form-control input-border-bottom" required>
          <label for="email" class="placeholder">email</label>
        </div>

        <div class="form-group form-floating-label" :class="{'has-error': $v.updateUser.userName.$error}">
          <input
              id="userName"
              v-model="$v.updateUser.userName.$model"
              type="text" class="form-control input-border-bottom" required>
          <label for="userName" class="placeholder">Kullanıcı Adı</label>
        </div>


      </div>
      <div class="modal-footer no-bd" style="margin: 0 auto">
        <b-button variant="primary" @click="update" :disabled="$v.updateUser.$invalid">Güncelle</b-button>
        <b-button variant="danger" @click="closeModal">Kapat</b-button>
      </div>
    </div>
  </b-modal>
</template>
<script>
import {mapGetters} from "vuex";
import {required} from "vuelidate/lib/validators";

export default {
  data() {
    return {
      updateUser: {
        firstName: null,
        lastName: null,
        userName: null,
        email: null
      },
      id: null
    }
  },
  methods: {
    closeModal() {
      this.$refs['updateUser'].hide()
    },
    update() {
      this.$store.dispatch('loading', true)
      const updateUser = {
        id: this.id,
        data: {
          firstName: this.updateUser.firstName,
          lastName: this.updateUser.lastName,
          userName: this.updateUser.userName,
          email: this.updateUser.email
        }
      }
      this.$store.dispatch("updateUser", updateUser)
          .then(response => {
            if (response) {
              this.$refs['updateUser'].hide()
              this.$store.dispatch('loading', false)
              this.$store.dispatch('alert', 'success')
            } else {
              this.$store.dispatch('loading', false)
              this.$store.dispatch('alert', 'error')
            }
          })
    }
  },
  computed: {
    ...mapGetters(['getUserModal']),
  },
  watch: {
    getUserModal(payload) {
      this.updateUser.firstName = payload[0].firstName
      this.updateUser.lastName = payload[0].lastName
      this.updateUser.userName = payload[0].userName
      this.updateUser.email = payload[0].email
      this.id = payload[0].id
      this.$refs['updateUser'].show()
    }
  },
  validations: {
    updateUser: {
      firstName: {required},
      lastName: {required},
      email: {required},
      userName: {required}
    }
  }
}
</script>
