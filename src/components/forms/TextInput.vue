<template>
    <div class="mb-3">
        <label v-if="label" :for="id">{{ label }}</label>
        <textarea :style="style"  v-if="multiline" :placeholder="placeholder" :rows="rowCount" class="form-control" :id="id" v-model="inputValue"></textarea>
        <input :style="style"  v-else :type="type" :placeholder="placeholder" class="form-control" :id="id" v-model="inputValue">
        <div v-if="error" class="alert p-1 mt-2 alert-danger" role="alert">
            {{ error }}
        </div>
    </div>
</template>
<script>
export default {
    name: "TextField",
    props: {
        value: {
            type: String | Number,
            default: null
        },
        rowCount: {
            type: String,
            default: "3"
        },
        multiline: {
            type: Boolean,
            default: false
        },
        type: {
            type: String,
            default: "text"
        },
        id: {
            type: String
        },
        label: {
            type: String,
            default: ""
        },
        placeholder: {
            type: String,
            default: ""
        },
        error: {
            type: String
        }
    },
    data() {
        return {
            inputValue: this.value
        }
    },
    mounted() {
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
    }
}
</script>