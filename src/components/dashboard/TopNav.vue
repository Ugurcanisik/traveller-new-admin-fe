<template>
  <div class="row page-inner mt--5">
    <div class="col-sm-6 col-md-3">
      <div class="card card-stats card-round">
        <div class="card-body ">
          <div class="row">
            <div class="col-5">
              <div class="icon-big text-center">
                <i class="flaticon-coins text-success"></i>
              </div>
            </div>
            <div class="col-7 col-stats">
              <div class="numbers">
                <p class="card-category">Toplam Kategori</p>
                <h4 class="card-title">{{ allCategories.length  }}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-sm-6 col-md-3">
      <div class="card card-stats card-round">
        <div class="card-body ">
          <div class="row">
            <div class="col-5">
              <div class="icon-big text-center">
                <i class="flaticon-graph-2 text-info"></i>
              </div>
            </div>
            <div class="col-7 col-stats">
              <div class="numbers">
                <p class="card-category">Toplam Tatil</p>
                <h4 class="card-title">{{ allTraveller.length  }}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-sm-6 col-md-3">
      <div class="card card-stats card-round">
        <div class="card-body">
          <div class="row">
            <div class="col-5">
              <div class="icon-big text-center">
                <i class="flaticon-graph text-warning"></i>
              </div>
            </div>
            <div class="col-7 col-stats">
              <div class="numbers">
                <p class="card-category">Toplam User</p>
                <h4 class="card-title">{{ allUsers.length+1  }}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {mapGetters} from "vuex";

export default {
  data() {
    return {
      ciroYesterday: null,
      ciroAverage: null,
      ciroMonth: null,
      expenseToday: null
    }
  },
  computed: {
    ...mapGetters(["allCategories"]),
    ...mapGetters(["allTraveller"]),
    ...mapGetters(["allUsers"]),
  },
  mounted() {

  },
  watch: {

  },
}
</script>
