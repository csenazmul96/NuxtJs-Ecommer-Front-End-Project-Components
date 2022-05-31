<template>
    <div class="wcmodel modal" :class="{open_modal: showColorModal}"  data-modal="wcm">
        <div class="modal_overlay" data-modal-close="wcm"></div>
        <div class="welcome_modal_wrapper export_modal">
            <span class="close_modal" data-modal-close="wcm" @click="closeColorModal"></span>
            <div class="d_flex_btwn heading">
                <div class="title">Select Color</div>
            </div>
            <div class="modal_inner_content" style="width:400px; max-height:none">
                <table class="table">
                    <thead>
                        <tr>
                            <th>
                                <div class="custom_checkbox">
                                    <input type="checkbox" id="checkAll" v-model="isCheckAll" :value="1"  />
                                    <label for="checkAll" @click.prevent="checkAll()"></label>
                                </div>
                            </th>
                            <th>Color Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(color, index) in colors" :key="'color_'+index">
                            <td>
                                <div class="custom_checkbox">
                                    <input type="checkbox" :id="'singleCheck' + color.id" :checked="checkedColors.includes(color.id)" />
                                    <label :for="'singleCheck' + color.id" @click.prevent="updateCheckall(color)"></label>
                                </div>
                            </td>
                            <td>{{color.name}}</td>
                        </tr>
                    </tbody>
                </table>
                <div class="mt_20 mb_20">
                    <button class="btn btn_common" @click.prevent="selectColor()">Select</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    middleware: 'auth',
    name: "ColorModal",
    data(){
        return {
            isCheckAll: false,
            checkedColors: [],
        }
    },
    props:{
        showColorModal:false,
        colors:{
            type: Array,
            required: true
        }
    },
    methods:{
        checkAll(){
            this.isCheckAll = !this.isCheckAll;
            this.checkedColors = [];
            if(this.isCheckAll){
                for (var key in this.colors) {
                    this.checkedColors.push(this.colors[key].id);
                }
            }
        },
        updateCheckall(row){
            let index = window._.findIndex(this.checkedColors, (colorId)=> colorId == row.id)
            if(index > -1){
                this.checkedColors.splice(index, 1)
            }else{
                this.checkedColors.push(row.id)
            }
            if(this.checkedColors.length == this.colors.length){
                this.isCheckAll = true;
            }else{
                this.isCheckAll = false;
            }
        },
        closeColorModal(){
            this.$emit('closeColorModal')
        },
        selectColor(){
            if(this.checkedColors.length <= 0 ){
                this.showFailMsg('Please select color!')
                return;
            }
            this.$emit('closeColorModal', this.checkedColors)
            this.isCheckAll = false
            this.checkedColors = []
        }
    }
}
</script>
