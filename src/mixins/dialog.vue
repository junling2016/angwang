<script>
export default {
  props: {
    visible: Boolean
  },

  computed: {
    modalVisible: {
      get() {
        return this.visible;
      },
      set(val) {
        this.$emit("update:visible", val);
      }
    }
  },

  watch: {
    visible(val) {
      val
        ? this.handleOpen && this.handleOpen()
        : this.handleClose && this.handleClose();
    }
  },

  methods: {
    open() {
      this.modalVisible = true;
    },

    close() {
      this.modalVisible = false;
    }
  }
};
</script>

    
    
    
