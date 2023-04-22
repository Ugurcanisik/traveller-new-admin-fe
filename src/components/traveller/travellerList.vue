<template>


  <div class="card">
    <div class="card-header">
      <div class="d-flex align-items-center">
        <ProductAdd style="margin-left: 45%"></ProductAdd>
      </div>
    </div>
    <div class="card-body">
      <div v-if="allTraveller.length" style="width: 100%">

        <span>Listele  </span>
        <b-form-select
            id="per-page-select"
            v-model="perPage"
            :options="pageOptions"
            size="sm"
            style="width: 100px;"
        ></b-form-select>


        <b-form-group
            label="Arama"
            label-for="filter-input"
            label-cols-sm="3"
            label-align-sm="right"
            label-size="sm"
            class="mb-0"
            style="float:right;"
        >
          <b-input-group size="sm">
            <b-form-input
                id="filter-input"
                v-model="filter"
                type="search"
            ></b-form-input>

          </b-input-group>
        </b-form-group>

        <b-table
            :items="allTraveller"
            :fields="fields"
            :current-page="currentPage"
            :per-page="perPage"
            :filter="filter"
            @filtered="onFiltered"
            hover
            head-variant="light"
        >

          <template #cell(picture)="row">
            <img :src="row.item.picture" alt="" width="100px" height="100px">
          </template>


          <template #cell(actions)="row">
            <button
                type="button"
                data-toggle="tooltip" c
                class="btn btn-link btn-primary btn-lg"
                data-original-title="Güncelle"
                @click="update(row.item.id)"
            >
              <i class="fa fa-edit"></i>
            </button>
            <button
                type="button"
                data-toggle="tooltip"
                class="btn btn-link btn-danger"
                data-original-title="Sil"
                @click="del(row.item.id)"
            >
              <i class="fa fa-times"></i>
            </button>
          </template>


        </b-table>


        <div>

          <span style="float: left; margin-top: 15px">{{ totalRows }} kayıttan 1 - {{ perPage }} arasındaki kayıtlar gösteriliyor</span>

          <b-pagination
              style="float: right; margin-top: 15px"
              v-model="currentPage"
              :total-rows="totalRows"
              :per-page="perPage"
              pills
          ></b-pagination>
        </div>


      </div>
      <b-alert show variant="secondary" v-else>Lütfen Bir Kategori Seçiniz!</b-alert>
    </div>
  </div>

</template>
<script>
import ProductAdd from './travellerAdd'
import Sortable from 'sortablejs';
import {mapGetters} from "vuex";


export default {
  components: {
    ProductAdd
  },
  data() {
    return {
      products: [],
      selected: null,
      totalRows: 1,
      currentPage: 1,
      perPage: 100,
      pageOptions: [{value: 100, text: "All"}, 40, 50,],
      filter: null,
      fields: [
        {key: 'picture', label: 'Yerin resmi ', sortable: true, class: 'text-center'},
        {key: 'name', label: 'Yerin Adı ', sortable: true, class: 'text-center'},
        {key: 'description', label: 'Yerin Açıklama', sortable: true, class: 'text-center'},
        {key: 'category.name', label: 'Yerin kategorisi', sortable: true, class: 'text-center'},
        {key: 'actions', label: 'İşlemler', class: 'text-center'}
      ],
    }
  },
  methods: {
    update(id) {
      this.$store.dispatch('findTravel', id)
    },
    updatePicture(id) {
      this.$store.dispatch('findTravelPicture', id)
    },
    del(id) {
      swal({
        title: 'Silmek İstediğinize Emin Misiniz ?',
        text: "Bu İşlem Geri Alınamaz",
        type: 'warning',
        buttons: {
          confirm: {
            text: 'Evet, Sil!',
            className: 'btn btn-primary'
          },
          cancel: {
            visible: true,
            className: 'btn btn-danger'
          }
        }
      }).then((Delete) => {
        if (Delete) {
          this.$store.dispatch("deleteTravel", id)
              .then(response => {
                if (response) {
                  swal({
                    title: 'Silindi!',
                    icon: "success",
                    type: 'success',
                    buttons: {
                      confirm: {
                        className: 'btn btn-success'
                      }
                    }
                  });
                } else {
                  swal({
                    title: 'Hata!',
                    icon: "error",
                    buttons: {
                      confirm: {
                        className: 'btn btn-danger'
                      }
                    },
                  });
                }
              })
        } else {
          swal.close();
        }
      });
    },
    onFiltered(filteredItems) {
      this.perPage = filteredItems.length
      this.currentPage = 1
    },
    listCategory() {
      const category = this.allCategories
      let categoryArray = []

      categoryArray.push({value: null, text: 'Bir Kategori Seçiniz!', disabled: true})

      for (let i in category) {
        if (category[i].isActive == true) {
          categoryArray.push({value: category[i].id, text: category[i].name})
        }
      }
      return categoryArray
    },
  },
  computed: {
    ...mapGetters(["allTraveller"]),
    ...mapGetters(["allCategories"]),
  },
  watch: {
    allTraveller() {
      this.totalRows = this.allTraveller.length
    }
  },
}
</script>
