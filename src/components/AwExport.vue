<template>
  <form v-show="false" :action="action" :type="type">
    <template v-if="params">
      <input v-for="(val,key) in params" :key="key" type="hidden" :name="key" :value="val">
    </template>
  </form>
</template>

<script>
export default {
  props: {
    action: String,
    type: {
      type: String,
      default: "get"
    },
    params: Object
  },

  methods: {
    submit() {
      this.$el && this.$el.submit();
    }
  }
};
</script>
