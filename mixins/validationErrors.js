export default {
  data() {
    return {
      allErrors: null,
      loading: false
    }
  },
  methods: {
    errorFor(field) {
      return this.allErrors != null && this.allErrors[field] ? this.allErrors[field] : null;
    }
  }
}
