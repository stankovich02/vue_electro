<template>
    <div class="mb-3">
        <label v-if="label" class="form-label">{{ label }}</label>
        <div class="form-check" v-for="item,index of items" :key="index">
            <input class="form-check-input" v-model="inputValue" type="radio" :value="index" :id="item">
            <label class="form-check-label" :for="item">
                {{ item }}
            </label>
        </div>
        <div v-if="showHint" id="emailHelp" class="form-text">{{ hint }}</div>
            <div v-if="error" class="alert p-1 mt-2 alert-danger" role="alert">
                {{ error }}
        </div>
    </div>    
    </template>
    <script>
    export default {
        name: "RadioButtons",
        data() {
            return {
                inputValue: this.value,
            }
        },
        props: {
            error: {
                type: String
            },
            value: {
                type: [String, Number]
            },
            label: {
                type: String,
                default: ""
            },
            items: {
                type: Object,
                required: true
            },
            hint: {
                type: String,
                default: ""
            },
            id: {
                type: String
            },
        },
        mounted() {
            this.inputValue = this.value
        },
        computed: {
            style: function() {
                return this.error ? "border: 1px solid red" : ""
            },
            showHint: function() {
                return !this.error && this.hint;
    
            }
        },
        watch: {
            inputValue: function () {
                this.$emit("input", this.inputValue);
            },
            value: function (newValue) {
                this.inputValue = newValue;
            },
        },
    }
    </script>