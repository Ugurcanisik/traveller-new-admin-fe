<template>
  <div class="main-header">
    <!-- Logo Header -->
    <div class="logo-header" data-background-color="blue">

      <a href="/dashboard" class="logo">
        <img src="assets/img/logo.svg" alt="navbar brand" class="navbar-brand">
      </a>
      <button class="navbar-toggler sidenav-toggler ml-auto" type="button" data-toggle="collapse" data-target="collapse"
              aria-expanded="false" aria-label="Toggle navigation">
					<span class="navbar-toggler-icon">
						<i class="icon-menu"></i>
					</span>
      </button>
      <button class="topbar-toggler more"><i class="icon-options-vertical"></i></button>
      <div class="nav-toggle">
        <button class="btn btn-toggle toggle-sidebar">
          <i class="icon-menu"></i>
        </button>
      </div>
    </div>
    <!-- End Logo Header -->

    <!-- Navbar Header -->
    <nav class="navbar navbar-header navbar-expand-lg" data-background-color="blue2">

      <div class="container-fluid">

        <ul class="navbar-nav topbar-nav ml-md-auto align-items-center">
          <li class="nav-item dropdown hidden-caret">
            <a class="dropdown-toggle profile-pic" data-toggle="dropdown" href="#" aria-expanded="false">
              <div class="avatar-sm">
                <img src="assets/img/profile.jpg" alt="..." class="avatar-img rounded-circle">
              </div>
            </a>
            <ul class="dropdown-menu dropdown-user animated fadeIn">
              <div class="dropdown-user-scroll scrollbar-outer">
                  <li>
                      <router-link
                              to="accountSettings"
                              tag="a"
                              class="dropdown-item">
                          Account Setting
                      </router-link>

                      <div class="dropdown-divider"></div>
                      <a class="dropdown-item" @click="logout">Logout</a>
                  </li>
              </div>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
    <!-- End Navbar -->
  </div>
</template>
<script>


export default {
  methods: {
    logout() {
      this.$store.dispatch('logout')
    }
  }

}
</script>
