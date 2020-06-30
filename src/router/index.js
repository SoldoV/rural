import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store/index.js";

Vue.use(VueRouter);

const routes = [{
    path: "/",
    name: "home",
    component: () =>
      import(
        /* webpackChunkName: "Homepage" */
        "../views/Homepage.vue"
      )
  },
  {
    path: "/households",
    name: "households",
    component: () =>
      import(
        /* webpackChunkName: "households" */
        "../views/Households.vue"
      )
  },
  {
    path: "/login",
    name: "login",
    component: () =>
      import(
        /* webpackChunkName: "login" */
        "../views/Login.vue"
      )
  },
  {
    path: "/households/:id",
    name: "Household",
    component: () =>
      import(
        /* webpackChunkName: "Household" */
        "../views/SingleHousehold.vue"
      )
  },
  {
    path: "/news",
    name: "news",
    component: () =>
      import(
        /* webpackChunkName: "news" */
        "../views/News.vue"
      )
  },
  {
    path: "/news/article/:id?",
    name: "AdminSingleArticle",
    component: () =>
      import(
        /* webpackChunkName: "SingleArticle" */
        "../views/SingleArticle.vue"
      )
  },
  {
    path: "/dashboard",
    name: "Admin Dashboard",
    meta: {
      requiresAuth: true
    },
    component: () =>
      import(
        /* webpackChunkName: "AdminDashboard" */
        "../views/Admin/AdminDashboard.vue"
      ),
    children: [{
        path: "tags",
        name: "Admin tags",
        meta: {
          requiresAuth: true
        },
        component: () =>
          import(
            /* webpackChunkName: "AdminTags" */
            "../views/Admin/Tags.vue"
          )
      },
      {
        path: "households",
        name: "Admin households",
        meta: {
          requiresAuth: true
        },
        component: () =>
          import(
            /* webpackChunkName: "AdminHouseholds" */
            "../views/Admin/Households.vue"
          )
      },
      {
        path: "articles",
        name: "Admin articles",
        meta: {
          requiresAuth: true
        },
        component: () =>
          import(
            /* webpackChunkName: "AdminArticles" */
            "../views/Admin/Articles.vue"
          )
      },
      {
        path: "cities",
        name: "Admin cities",
        meta: {
          requiresAuth: true
        },
        component: () =>
          import(
            /* webpackChunkName: "AdminCities" */
            "../views/Admin/Cities.vue"
          )
      },
      {
        path: "image",
        name: "Admin image",
        meta: {
          requiresAuth: true
        },
        component: () =>
          import(
            /* webpackChunkName: "HomepageImage" */
            "../views/Admin/HomepageImage.vue"
          )
      },
      {
        path: "household/:id?",
        name: "Admin household",
        meta: {
          requiresAuth: true
        },
        component: () =>
          import(
            /* webpackChunkName: "AdminHousehold" */
            "../views/Admin/NewHousehold.vue"
          ),
        children: [{
            path: "description",
            name: "Admin household description",
            meta: {
              requiresAuth: true
            },
            component: () =>
              import(
                /* webpackChunkName: "householdDescription" */
                "../views/Admin/NewHouseholdDescription.vue"
              )
          },
          {
            path: "properties",
            meta: {
              requiresAuth: true
            },
            name: "Admin household properties",
            component: () =>
              import(
                /* webpackChunkName: "householdProperties" */
                "../views/Admin/NewHouseholdProperties.vue"
              )
          }
        ]
      }
    ]
  },
  {
    path: "/about",
    name: "About",
    component: () =>
      import(
        /* webpackChunkName: "about" */
        "../views/About.vue"
      )
  },
  {
    path: "/contact",
    name: "Contact",
    component: () =>
      import(
        /* webpackChunkName: "contact" */
        "../views/Contact.vue"
      )
  }
];

const router = new VueRouter({
  mode: "history",
  routes
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.IS_LOGGED_IN) {
      next();
      return;
    }
    next({
      name: "Home"
    });
  } else next();
});

export default router;
