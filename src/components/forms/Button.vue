<template>
    <div>
       <button :type="type" :name="name" :id="id" class="btn btn-primary px-5 py-3 fs-3" @click="$emit('wasClicked')">{{ buttonText }}</button>
    </div>
</template>
<script>
export default {
    name: "TextField",
    props: {
        type: {
            type: String,
            default: "button"
        },
        id: {
            type: String,
            default: ""
        },
        name: {
            type: String,
            default: ""
        },
        buttonText: {
            required: true,
            type: String
        }
    }
}
</script>