<template>
  <b-modal ref="updateRoleUser" title="Yetki Güncelle" hide-footer>
    <div class="modal-content">
      <div class="modal-body" style="margin: 0 auto">

        <div style="float: left; ">

          <div class="form-group form-floating-label">
            <toggle-button
                v-model="rights.categories"
                :labels="{checked: 'Kategoriler', unchecked: 'Kategoriler'}"
                :width="110"
            />
          </div>

          <div class="form-group form-floating-label">
            <toggle-button
                v-model="rights.traveller"
                :labels="{checked: 'Tatiller', unchecked: 'Tatiller'}"
                :width="86"
            />
          </div>
        </div>

        <div class="form-group form-floating-label">
          <toggle-button
              v-model="rights.users"
              :labels="{checked: 'Kullanıcılar', unchecked: 'Kullanıcılar'}"
              :width="110"
          />
        </div>

      </div>

    </div>
    <div class="modal-footer no-bd" style="margin: 0 auto">
      <b-button variant="primary" @click="update">Güncelle</b-button>
      <b-button variant="danger" @click="closeModal">Kapat</b-button>
    </div>
  </b-modal>
</template>
<script>
import {mapGetters} from "vuex";
import {required} from "vuelidate/lib/validators";

export default {
  data() {
    return {
      rights: {
        categories: false,
        traveller: false,
        users: false,
      },
      id: null
    }
  },
  methods: {
    closeModal() {
      this.$refs['updateRoleUser'].hide()
    },
    update() {
      this.$store.dispatch('loading', true)
      const updateUser = {
        id: this.id,
        data: {rights: this.rights},
      }
      this.$store.dispatch("updateRoleUser", updateUser)
          .then(response => {
            if (response) {
              this.$refs['updateRoleUser'].hide()
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
    ...mapGetters(['getUserRoleModal']),
  },
  watch: {
    getUserRoleModal(payload) {


     // alert(JSON.stringify(payload[0].rights))

      let role = payload[0].rights
      if (typeof role === "string") {
        role = JSON.parse(role)
      }
      this.rights.categories = role.categories
      this.rights.traveller = role.traveller
      this.rights.users = role.users
      this.rights.settings = role.settings
      this.id = payload[0].id

      this.$refs['updateRoleUser'].show()
    }
  },
}
</script>
