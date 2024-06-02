import { defineStore } from "pinia"
import { ref } from "vue"

export const groupMapStore = defineStore("groupMap", ()=> {
    const aSideGroup = ref<{[key:string]:any}>({
        room1:[]
    })

    return {aSideGroup}
})