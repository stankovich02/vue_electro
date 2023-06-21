<template>
    <div class="form-group mb-3">
      <label :for="id" class="form-label">{{ label }}</label>
      <select :name="id" :id="id" class="form-control" v-model="inputValue">
        <option v-for="o in options" :key="o[valueProperty]" :value="o[valueProperty]" :selected="o[valueProperty] === inputValue">{{ o[textProperty] }}</option>
      </select>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </div>
  </template>

  <script>
  export default {
    name: "DropDown",
    props: {
      id: {
        type: String,
        required: true,
      },
      label: {
        type: String,
        required: true,
      },
      textProperty: {
        type: String,
        default: "text"
      },
      valueProperty: {
        type: String,
        default: "value"
      },
      options: {
        type: Array,
        required: true,
      },
      errorMessage: {
        type: String,
        default: "",
      },
      value: {
        type: [String, Number],
        default: "",
      },
    },
    data() {
      return {
        inputValue: this.value,
      };
    },
    watch: {
      inputValue: function () {
        this.$emit("input", this.inputValue);
      },
      value: function (newValue) {
        this.inputValue = newValue;
      },
    },
  };
  </script>

  <style>
  .error-message {
    color: red;
    margin-top: 5px;
  }
  </style>