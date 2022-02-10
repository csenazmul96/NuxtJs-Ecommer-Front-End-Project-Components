<template>
  <div>
    <small v-for="(err, index) in errors" :key="key(index)">
      <span class="text-danger">{{ err }}</span>
    </small>
  </div>
</template>

<script>
export default {
    props: ['errors'],
    methods: {
        key(index) {
            return `validation_error_${index}_${Math.random()}`
        }
    }
}
</script>
