export default {
  methods: {
    getAllQueryParams() {
      const params = new URLSearchParams(window.location.search);

      return Array.from(params.keys()).reduce(
        (acc, val) => ({ ...acc, [val]: params.get(val) }),
        {}
      );
    },
    mobCloseMenu() {
      $('.show_from_left , .show_from_right').removeClass('open_h_menu');
      $('.menu').removeClass('open');
      $('.h_m_left ul li , .h_m_cart ul li').removeClass('active');
      $('body').removeClass('overflow_hidden');
    },
    getColorImage(colorId, item) {
      let img = item.images.find((i) => i.color_id === colorId);

      if (img) {
        return img.compressed_image;
      } else {
        return item.images[0].compressed_image;
      }
    },
    showSuccessMsg(msg) {
      this.$swal.fire({
        position: 'top-right',
        icon: 'success',
        toast: true,
        title: msg,
        showConfirmButton: false,
        timer: 1500
      })
    },
    showFailMsg(msg) {
      this.$swal.fire({
        position: 'top-right',
        icon: 'error',
        toast: true,
        title: msg,
        showConfirmButton: false,
        timer: 1500
      })
    }
  }
}
